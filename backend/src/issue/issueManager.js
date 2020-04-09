const collectionName = "issues";

module.exports = class {
  #dbConnection;
  #userAccountManager;

  constructor(userAccountManager, dbConnection) {
    this.#userAccountManager = userAccountManager;
    this.#dbConnection = dbConnection;
  }

  async addAppearanceToIssue(issueWithAppearance, characterData) {
    let issue = await this.#dbConnection.getByIdAsync(collectionName, issueWithAppearance.id);
    if (!issue) {
      issue = this.#createIssue(issueWithAppearance);
    }
    this.#createAppearanceInIssue(issue, issueWithAppearance, characterData);
    return await this.#dbConnection.saveAsync(collectionName, issue._id, issue);
  }

  async changeIssueStatusAsync(issueId, newStatus, userIdToken, characterId) {
    const user = await this.#userAccountManager.findUserByIdTokenAsync(userIdToken);
    if (!user) {
      throw new Error("Not allowed to call this method");
    }
    let issueStatus = user.issuesStatuses.find(iStatus => iStatus.issueId === issueId);
    if (!issueStatus) {
      issueStatus = {
        issueId,
        characters: []
      };
      user.issuesStatuses.push(issueStatus);
    }
    if (characterId) {
      this.#resolveCharacterId(issueStatus, newStatus, characterId);
    }
    if (newStatus !== "clear") {
      issueStatus.status = newStatus;
    }
    if (!issueStatus.characters.length && newStatus !== "read") {
      user.issuesStatuses = user.issuesStatuses.filter(iStatus => iStatus.issueId !== issueId);
    } else if (newStatus === "clear") {
      issueStatus.status = "character";
    }
    await this.#dbConnection.saveAsync("users", user._id, user);
    issueStatus.status = newStatus;
    return issueStatus;
  }

  async getAllIssuesAndPackThemByVolumes() {
    const allIssuesIterator = await this.#dbConnection.findAsync("issues", {}, { name: 1, issueNo: 1, volume: 1, publishDateTimestamp: 1 });
    const allIssues = await allIssuesIterator.toArray();
    const packedIssued = {};
    allIssues.forEach(issue => {
      const nameWithoutAnnualAtEnd = issue.name.replace(/ Annual$/, "");
      let volumePack = packedIssued[nameWithoutAnnualAtEnd];
      if (!volumePack) {
        volumePack = {};
        packedIssued[nameWithoutAnnualAtEnd] = volumePack;
      }
      let volume = volumePack[issue.volume];
      if (!volume) {
        volume = [];
        volumePack[issue.volume] = volume;
      }
      volume.push(issue);
    });
    const orderedPack = {};
    Object.keys(packedIssued).sort().forEach(key => {
      orderedPack[key] = packedIssued[key];
      Object.values(orderedPack[key]).forEach(volume => {
        volume.sort((issue1, issue2) => {
          if (issue1.publishDateTimestamp > issue2.publishDateTimestamp) {
            return 1;
          }
          return -1;
        });
      });
    });
    return orderedPack;
  }

  async getIssueAsync(issueId) {
    return this.#dbConnection.findOneAsync("issues", { _id: issueId });
  }

  async getIssueStatusForUserAsync(issueId, idToken) {
    return this.#dbConnection.findAsync(
      "users",
      { "sessionData.idToken": idToken, "issuesStatuses.issueId": issueId },
      { "issuesStatuses.$": 1 });
  }

  async getAllIssuesByVolume(issueName, issueVolume) {
    const iteratorOfVolumes = await this.#dbConnection.findAsync(
      "issues",
      { "name": issueName, "volume": issueVolume && parseInt(issueVolume) },
      { "issueNo": 1, "name": 1, "publishDateTimestamp": 1, "volume": 1, "appearances.characterAppearance.subtitle": 1 }
    );
    const volumes = await iteratorOfVolumes.toArray();
    volumes.sort((a, b) => this.#compareIssues(a, b));
    this.#reduceAndSortSubtitles(volumes);
    return volumes;
  }

  #createIssue = function (issue) {
    return {
      _id: issue.id,
      name: issue.name,
      url: issue.url,
      volume: issue.volume,
      issueNo: issue.issueNo,
      image: issue.image,
      publishDateTimestamp: issue.publishDateTimestamp,
      appearances: []
    };
  };

  #createAppearanceInIssue = function (issue, issueWithAppearance, characterData) {
    const characterId = characterData.CharacterId;
    this.#removeAppearanceOfCharacter(issue, characterId);
    issue.appearances.push({
      characterId,
      characterDisplayName: characterData.DisplayName,
      characterUniverse: characterData.Universe,
      characterAppearance: issueWithAppearance.appearances
    });
  };

  #removeAppearanceOfCharacter = function (issue, characterId) {
    const previousAppearanceIndex = issue.appearances.find(appearance => appearance.characterId === characterId);
    if (previousAppearanceIndex) {
      issue.appearances.splice(previousAppearanceIndex, 1);
    }
  };

  #resolveCharacterId = function (issueStatus, newStatus, characterId) {
    const existingCharacterId = issueStatus.characters.find(char => char === characterId);
    if (!existingCharacterId && ["character"] && newStatus !== "clear") {
      issueStatus.characters.push(characterId);
    } else if (newStatus === "clear") {
      issueStatus.characters = issueStatus.characters.filter(char => char !== characterId);
    }
  };

  #compareIssues = function (a, b) {
    if (a.publishDateTimestamp !== b.publishDateTimestamp) {
      return a.publishDateTimestamp > b.publishDateTimestamp ? 1 : -1
    } else if (a.issueNo !== b.issueNo) {
      return a.issueNo > b.issueNo ? 1 : -1;
    }
    return 0;
  };

  #reduceAndSortSubtitles = function (volumes) {
    volumes.forEach(issue => {
      issue.subtitles = [];
      if (issue.appearances) {
        issue.appearances.forEach(appearance => {
          appearance.characterAppearance.forEach(characterAppearance => {
            if (issue.subtitles.indexOf(characterAppearance.subtitle) < 0) {
              issue.subtitles.push(characterAppearance.subtitle);
            }
          });
        });
        issue.appearances = null;
      }
      issue.subtitles.sort();
    });
  };
};