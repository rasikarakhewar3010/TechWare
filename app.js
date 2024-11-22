const express = require('express');
const app = express();
const mongoose = require('mongoose');

const MONGO_URL = "mongodb://127.0.0.1:27017/techWare";


main().then(()=>{
    console.log("connected to db");
})

.catch( err=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(MONGO_URL);
}


app.listen(3000,()=>{
    console.log("listening on port 3000");
});