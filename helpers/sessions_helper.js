const User = require("../models/user");

const sessionsHelper = {
  isLoggedIn(session) {
    if (session.userId) {
      return true;
    } else {
      return false;
    }
  },

  getCurrentUser(session) {
    if (this.isLoggedIn(session)) {
      return User.findById(session.userId).then((user) => {
        return user;
      });
    } else {
      return Promise.resolve(null);
    }
  },
};

module.exports = sessionsHelper;
