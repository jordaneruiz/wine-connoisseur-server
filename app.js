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


const { MongoClient } = require('mongodb');

let MONGODB_URL =  process.env.MONGODB_URL || `mongodb+srv://jordaneruiz:${encodedPassword}@wine-db.opy3phj.mongodb.net/`

console.log(`MONGODB_URL: "${MONGODB_URL}"`)

async function listDatabases(client){
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

const client = new MongoClient(MONGODB_URL);
console.log(`client: "${client}"`)

client.connect();
listDatabases(client);



mongoose.connect(MONGODB_URL, {
  bufferCommands: false, // Disable command buffering
  // bufferMaxEntries: 0, // Disable command buffering
  serverSelectionTimeoutMS: 30000, // Set the server selection timeout
  socketTimeoutMS: 45000, // Set the socket timeout
});


// mongoose
//   .connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
//   .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//   });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();


//Cors for err
const cors = require('cors')
app.use(cors({
  credentials: true, 
  origin: [`mongodb+srv://jordaneruiz:${encodedPassword}@wine-db.opy3phj.mongodb.net/`, "http://localhost:3000"]
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

const wineRoutes = require('./routes/wine.route.js');
app.use('/api', wineRoutes);

const authRoutes = require('./routes/auth.routes.js')
app.use('/api', authRoutes);

const profileRoutes = require('./routes/profile.route.js')
app.use('/api', profileRoutes);

const fileUploads = require('./routes/file-upload.routes.js')
app.use('/api', fileUploads);

const stripeRoutes = require('./routes/stripe.routes.js')
app.use('/api', stripeRoutes);



process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled rejection at:', promise, 'reason:', reason);
});
module.exports = app;
