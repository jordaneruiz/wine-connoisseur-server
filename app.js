require('dotenv').config();

const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo') (session);
//require('./config/database.config') // when I will have cloudinary


let MONGODB_URL =  "mongodb://localhost/wine-connoisseur-server"


mongoose
  .connect(MONGODB_URL, {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


//Cors for err
const cors = require('cors')
app.use(cors({
  credentials: true, 
  origin: ['http://localhost:3000']
}))

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express View engine setup






app.use(express.static(path.join(__dirname, 'public')));






//Cookies Seeting
app.use(
  session({
    secret: 'secret-secret',
    saveUninitialized: true,
    resave: true,
    cookie: {
      maxAge: 60 * 60 * 24 * 1000, //60 sec * 60 min * 24hrs = 1 day (in milliseconds)
    },
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
      //time to live (in seconds)
      ttl: 60 * 60 * 24,
      autoRemove: 'disabled',
    }),
  })
);








//Register routes

// const index = require('./routes/index');
// app.use('/', index);

const wineRoutes = require('./routes/wine.route');
app.use('/api', wineRoutes);

const authRoutes = require('./routes/auth.routes')
app.use('/api', authRoutes);

const profileRoutes = require('./routes/profile.route')
app.use('/api', profileRoutes);

const fileUploads = require('./routes/file-upload.routes')
app.use('/api', fileUploads);

const stripeRoutes = require('./routes/stripe.routes')
app.use('/api', stripeRoutes);

module.exports = app;
