const express = require('express')
const { connectDB } = require('./config/database')
const { User } = require('./models/user')

const app = express()
const port = 5000
app.use(express.json())

app.post('/signup', async (req, res) => {
  console.log('req.body', req.body)
 try {
    console.log('request body', req.body);

    const user = new User(req.body);
    const resp = await user.save();

    res.status(201).json({
      message: "User added successfully",
      user: resp,
    });
  } catch (error) {
    console.log('error', error)
    // Check if error is duplicate key using code 11000 which is use for duplicate key
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists. Please use a different email."
      });
    }

    // For any other error
    res.status(500).json({
      message: "Something went wrong",
      error: error.message
    });
  }
})


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
console.log('req.body', req.body)
  try {
    const user = await User.findOne({ email });
      // console.log('user', user)

    if (email !== user.email) {
      return res.status(404).send({ message: "User not found" });
    }
    if (password !== user.password) {
      console.log('user', user)
      return res.status(200).send({
        message: "invalid password please check and try to login again",
      });
    }
    res.status(200).json({
      message: "User logged in successfully",
      user
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});



const startServer = async () => {
  try {
    await connectDB()
    console.log('\n Database connected successfully \n');
    app.listen(port, () => {
      console.log(`\n *************  Server running at port ${port} ************* \n`);
    })
  } catch (error) {
    console.error(`\n Can't connect to database: ${error} \n`);
  }
}

startServer()

