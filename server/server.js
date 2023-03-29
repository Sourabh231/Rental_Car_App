const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


// env config
dotenv.config();

// routes are imported here
const userRoutes = require('./routes/userRoutes');

// mongodb connection
connectDB(); // connect to the first database

// rest objects
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
// app.use(morgan('dev'))//when url click it will show in console.{network request will show}

// routes
app.get('/', (req, res) => {
  res.status(200).send({
    message: 'welcome to backend'
  })

})

app.use('/api/v1/user', userRoutes);

// port 
const PORT = process.env.PORT || 3000;

// listen
app.listen(PORT, () => {
  console.log(`server is running on ${process.env.DEV_MODE} port no ${PORT}`);
})
