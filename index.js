const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

//Database
require('./dbconfig/config');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.use('/auth', require('./routes/auth'));

app.use('/movies', require('./routes/movies'));
app.use('/characters', require('./routes/characters'));
app.use('/genres', require('./routes/genres'));

app.listen(process.env.PORT, ()=>{  
    console.log("LISTENING ON PORT", process.env.PORT)
});

//for testing
module.exports = app;   