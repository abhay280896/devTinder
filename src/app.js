const express = require('express')
const { connectDB } = require('./config/database');
const { User } = require('./models/user');
const app = express()
const port = 3000


app.use(express.json());

app.post('/signup', async (req, res) => {
  try {
    console.log('request body', req.body);

    const user = new User(req.body);
    const resp = await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: resp,
    });
  } catch (error) {
    console.error("Error while saving user:", error.message);
    res.status(500).json({
      error: "Failed to save user",
      details: error.message,
    });
  }
});

app.get('/users', async (req, res) => {
  try {
    // const users = await User.find(); // fetch all users
    // res.status(200).json({...users,id:users._id.toString()});

    const users = await User.find().select('-password'); // keep _id for now
    const transformed = users.map(user => ({
    id: user._id.toString(), ...user
    // add other fields you want to show
    }));

res.status(200).json(transformed);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});


app.get('/users', async (req, res) => {
  try {
    // const users = await User.find(); // fetch all users
    // res.status(200).json({...users,id:users._id.toString()});

    const users = await User.find().select('-password'); // keep _id for now
    const transformed = users.map(user => ({
    id: user._id.toString(), ...user
    // add other fields you want to show
    }));

res.status(200).json(transformed);

  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users", details: error.message });
  }
});



connectDB().then(() => {
    console.log('Database connected successfully')
    app.listen(port, () => console.log(`*************  server runing at port ${port} ************`))


}).catch((error) => console.error(`can't connect to database ${error}`))




