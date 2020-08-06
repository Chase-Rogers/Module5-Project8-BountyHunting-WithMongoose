const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')

// Middleware
app.use(express.json());
app.use(morgan('dev'))

//Connect to DB
mongoose.connect('mongodb://localhost:27017/bountiesdb', 
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    },
    () => console.log('Connected to the DB')
)

app.use("/bounties", require("./routes/bountiesRouter"));

app.use((err, req, res, next) => {
    console.log(err)
    return res.send({Error: err.message})
})

// 1: port   2: callback function
app.listen(8000, () => {
    console.log("The server is running on port 8000");
});
