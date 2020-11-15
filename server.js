require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan')
const mongoose = require('mongoose')
const path = require("path")
const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, "client", "build")))

//Connect to DB
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true });
mongoose.connect(`${process.env.DB_SERVER}`, 
// mongoose.connect(`mongodb://localhost:27017/bountiesdb`, 
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

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// 1: port   2: callback function
app.listen(port, () => {
    console.log(`The server is running on port ${port}`);
});
