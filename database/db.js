const mongoose = require('mongoose')



function connect_to_db(){

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('connected');
    }).catch()


}


module.exports = connect_to_db