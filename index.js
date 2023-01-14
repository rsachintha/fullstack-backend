const express = require('express')
const colors = require('colors')
const bp = require('body-parser')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

connectDB()

const app = express();
const port = process.env.PORT || 5000;

app.use(bp.json());
app.use(cors());

app.use("/api/items", require('./routes/items'));
app.use("/api/users", require('./routes/users'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server is listening to port: ${port}`));