const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const RegisterModel = require('./models/Register')

const app = express()
const allowedOrigins = ['https://deploy-mern-fe.vercel.app'];

app.use(cors({
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // Allow cookies
}));

app.use(express.json())

mongoose.connect('mongodb+srv://louischristopher784:louis35007@cluster0.2qcrkdo.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');


app.get("/", (req, res) => {
    res.json("Hello");
})
app.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await RegisterModel.findOne({ email: email });
    if (user) {
      return res.json("Already have an account");
    } else {
      const newUser = await RegisterModel.create({ name, email, password });
      return res.json(newUser);
    }
  } catch (error) {
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.listen(3001, () => {
    console.log("Server is Running")
})
