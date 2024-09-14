const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const fileUpload = require('express-fileupload');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const flash = require('connect-flash');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const host = process.env.HOST || '0.0.0.0'; // Specify the IP address

// Middleware configurations
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(expressLayouts);

app.use(cookieParser('CookingBlogSecure'));
app.use(session({
  secret: 'CookingBlogSecretSession',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
app.use(fileUpload());

// EJS layout setup
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

// Routes
const routes = require('./server/routes/recipeRoutes.js');
app.use('/', routes);

// Start the server
app.listen(port, host, () => console.log(`Listening on http://${host}:${port}`));
