var Sequelize = require('sequelize');
var db = new Sequelize('postgres://localhost:5432/wikistack', {logging: false});

var Page = db.define('page', {
  title: {
    type: Sequelize.STRING,
    allowNull: false
  },
  urlTitle: {
    type: Sequelize.STRING,
    allowNull: false
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  status: {
    type: Sequelize.ENUM('open', 'closed')
  },
  date: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW
  }
}, {
  hooks: {
    beforeValidate: function generateUrlTitle(title) {
      if (title) {
        title.setDataValue('urlTitle', title.title.replace(/\s+/g, '_').replace(/\W/g, ''));
      } else {
        title.setDataValue('urlTitle', Math.random().toString(36).substring(2, 7));
      }
    }
  },
  getterMethods : {
    route: function() {return '/wiki/' + this.urlTitle + ''}
  }
});

var User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};
