const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

/* configure so that we can have environment variables in a .env file */
require('dotenv').config();

/* create an express server */
const app = express();
const port = process.env.PORT || 5000;

/* setting up middleware */
app.use(cors());
app.use(express.json());

/* connect to the MongoDB Atlas database */
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established succesfully.");
});

/* start the server */
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
