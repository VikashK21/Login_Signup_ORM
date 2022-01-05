const express = require('express');
const app = express();
const morgan = require('morgan');
const userRoute = require('./routes/user');

app.use(morgan('dev'));
app.use(express.json());
app.use('/', userRoute);


const PORT = process.env.PORT || 2022;

// landing API
app.get('/', (req, res) =>{
    res.send({"success": "Welcone on home page"});
})

app.listen(PORT, () => {
    console.log(`Server started on PORT ${PORT}`);
})