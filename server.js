// Imported libraries
const path = require('path');
const {v4 : uuidv4} = require('uuid');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// Configure express
const app = express();
const PORT = process.env.PORT || 3001;

// Add helpers to handlebars
const hbs = exphbs.create({ helpers });

// Define the session vars
const sess = {

  secret: uuidv4(),
  cookie: {
    // 30 Minutes
    maxAge: 1800000,
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// express uses handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// More configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Define routes code dir
app.use(routes);

// Start the server and sync to db
sequelize.sync({ force: false }).then(() => {

  app.listen(PORT, () => console.log('Now listening'));
});