const express = require('express');
const User = require('./model/userData');
const connectDB = require('./config/db')();
const app = express();

app.use(express.json());

const port = 5000;
app.listen(port,()=>{
    console.log('back-end is running ==>' ,port);
})



// Insert a user Data
app.post('/user', (req, res) => {
    const { name, city } = req.body;
  
    const newUser = new User({
      name,
      city
    });
  
    newUser.save()
      .then((user) => {
        res.status({data:"success"});
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  });
  