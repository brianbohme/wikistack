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

var Route = db.define('route', {
  url: Sequelize.STRING
}, {
  getterMethods : {
    urlTitle : function(){return Page.urlTitle}
  },

  setterMethods : {
    urlTitle : function(value){
      this.setDataValue('url', '/wiki/' + value)
    },
  }
});

module.exports = {
  db: db,
  Page: Page,
  User: User
};
