require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const otpRoutes = require('./otpRoutes');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Use OTP routes
app.use('/api', otpRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
