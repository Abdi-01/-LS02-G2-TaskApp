const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(cors());

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

app.get('/', (req, res) => {
  res.status(200).send('<h1>TODO LIST</h1>')
})

const { authRouter } = require('./routers')
app.use('/auth', authRouter)

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

// DB Check Connection
const{dbConf}= require('./config/db')
dbConf.getConnection((err,connection)=>{
    if(err){
        console.log('Error MYSQL', err.sqlMessage);
    }
    console.log(`connect: ${connection.threadId}`);
})

// Config Routers
const{authRouter}=require('./routers');
app.use('/auth', authRouter)  
