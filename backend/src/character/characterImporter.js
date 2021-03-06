const CharacterPageModel = require('./characterPageModel');
const CharacterAppearanceWalker = require('./characterAppearanceWalker');
const CharacterManager = require('./characterManager');
const IssuePageModel = require('../issue/issuePageModel');
const IssueModel = require('../issue/issueModel');
const PageDownloader = require('../pageDownloader');
const Async = require("async");

module.exports = class {
  #pageDownloader = new PageDownloader();
  #characterAppearanceWalker = new CharacterAppearanceWalker();
  #characterManager;
  #issueManager;

  constructor(issueManager, dbConnection) {
    this.#characterManager = new CharacterManager(dbConnection);
    this.#issueManager = issueManager;
  }

  async provideCharacterBaseInfoFromPageAsync(url) {
    const wikiWindow = await this.#pageDownloader.downloadWindowFromUrlAsync(url);
    return new CharacterPageModel(wikiWindow.location.origin, wikiWindow);
  };

  async downloadAndStoreConfirmedCharacterAsync(baseCharacterInfo) {
    console.log("downloadAndStoreConfirmedCharacterAsync started");
    const mergedAppearanceLinks = await this.#findAllIssueLinks(baseCharacterInfo);
    let no = 0;
    let characterAndIssues = baseCharacterInfo;
    characterAndIssues.issues = [];
    console.log(`Downloading of ${mergedAppearanceLinks.length} issues starting!`);

    let error;
    const that = this;
    function downloadWindowFromUrl(link, callback) {
      if (error) {
        callback();
        return;
      }
      that.#pageDownloader.downloadWindowFromUrlAsync(`https://marvel.fandom.com${link}?action=edit`).then(
        issuePage => {
          console.log(`${++no} page downloaded! ${link}`);
          const issuePageModel = new IssuePageModel(issuePage, link);
          if (issuePageModel.isIssue) {
            characterAndIssues.issues.push(that.#parseIssuePageModelToIssueModel(issuePageModel, baseCharacterInfo.CharacterId));
          }
          callback();
        }
      ).catch(reason => {
        console.error(`Problem downloading ${link}.`);
        console.error(reason);
        callback(reason);
      });
    }

    const downloadingQueue = Async.queue(downloadWindowFromUrl, parseInt(process.env.MCAM_MAX_DOWNLOAD_JOBS));
    downloadingQueue.push(mergedAppearanceLinks);
    downloadingQueue.error((err) => {
      error = err;
    });
    downloadingQueue.drain(() => {
      if (!error) {
        this.#saveCharacterToDb(characterAndIssues)
      }
    });
  };

  #findAllIssueLinks = async function(baseCharacterInfo) {
    let minorAppearanceLinks = [];
    if (baseCharacterInfo.MinorAppearanceUrl) {
      minorAppearanceLinks = this.#downloadLinks(baseCharacterInfo.MinorAppearanceUrl);
    }
    const appearanceLinks = this.#downloadLinks(baseCharacterInfo.AppearanceUrl);
    return await this.#mergeListsAndSortAsync(minorAppearanceLinks, appearanceLinks);
  }

  #downloadLinks = async function (appearancesUrl) {
    const minorAppearanceWindow = this.#pageDownloader.downloadWindowFromUrlAsync(appearancesUrl);
    return this.#characterAppearanceWalker.findAllLinksToIssuesAsync(await minorAppearanceWindow);
  }

  #saveCharacterToDb = function (characterAndIssues) {
    const saveCharacterPromise = this.#characterManager.saveCharacterAsync(characterAndIssues);
    const issueUpdatesPromises = [];
    characterAndIssues.issues.forEach(issue => {
      issueUpdatesPromises.push(this.#issueManager.addAppearanceToIssue(issue, characterAndIssues));
    });
    Promise.all([saveCharacterPromise, ...issueUpdatesPromises])
      .then(() => {
        console.log(`All files are uploaded and saved for ${characterAndIssues.CharacterId}`);
      })
      .catch(err => {
        console.error("Something went wrong with storing character. Investigate and retry!", err);
      });
  };

  #mergeListsAndSortAsync = async function (minorAppearanceLinks, appearanceLinks) {
    const allAppearanceLinks = (await minorAppearanceLinks).concat(await appearanceLinks);
    allAppearanceLinks.sort();
    let appearanceCount = allAppearanceLinks.length;
    for (let i = 0; i < allAppearanceLinks.length - 1; i++) {
      if (allAppearanceLinks[i] === allAppearanceLinks[i + 1]) {
        allAppearanceLinks.splice(i, 1);
        appearanceCount--;
      }
    }
    return allAppearanceLinks;
  };

  #parseIssuePageModelToIssueModel = function (issuePageModel, characterId) {
    const appearancesInIssue = [];
    issuePageModel.getAppearances(characterId).forEach(appearance => {
      appearancesInIssue.push({
        ordinal: appearance.storyOrdinal,
        subtitle: appearance.title,
        focusType: appearance.focusType,
        appearanceTypes: appearance.typesOfAppearance
      });
    });
    return new IssueModel(issuePageModel.id, issuePageModel.url, issuePageModel.getName(), issuePageModel.getVolume(), issuePageModel.getIssueNo(),
      issuePageModel.getPublishedDate(), issuePageModel.getImage(), appearancesInIssue);
  }
};