const axios = require("axios");

module.exports = class {
  #axios;
  #axiosSecureToken;

  constructor() {
    this.#axios = axios.create({
      baseURL: "https://identitytoolkit.googleapis.com/v1/"
    });
    this.#axiosSecureToken = axios.create({
      baseURL: "https://securetoken.googleapis.com/v1/"
    });
  }

  async singUpInFirebaseAsync(userSingUpData) {
    return await this.#axios
      .post(`accounts:signUp?key=${process.env.FIREBASE_API_KEY}`, {
        email: userSingUpData.email,
        password: userSingUpData.password,
        returnSecureToken: true
      });
  }

  async logInFirebaseAsync(userSingUpData) {
    return await this.#axios
      .post(`accounts:signInWithPassword?key=${process.env.FIREBASE_API_KEY}`, {
        email: userSingUpData.email,
        password: userSingUpData.password,
        returnSecureToken: true
      });
  }

  async setupDisplayName(userSingUpData, displayName) {
    return await this.#axios
      .post(`accounts:update?key=${process.env.FIREBASE_API_KEY}`, {
        idToken: userSingUpData.idToken,
        displayName,
        returnSecureToken: false
      });
  }

  async refreshIdToken(refreshToken) {
    return await this.#axiosSecureToken
      .post(`token?key=${process.env.FIREBASE_API_KEY}`, {
        grant_type: "refresh_token",
        refresh_token: refreshToken
      });
  }
};