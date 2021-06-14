const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const pinRoute = require('./src/routes/pins');
const userRoute = require('./src/routes/users');

const app = express();
dotenv.config();
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Mongodb connected');
  })
  .catch((error) => console.log('Error : ', error));

app.use('/api/pins', pinRoute);
app.use('/api/users', userRoute);

app.listen(8800, () => {
  console.log('Backend server is running...');
});
