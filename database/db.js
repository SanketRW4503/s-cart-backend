import mongoose from 'mongoose';



function connect_to_db(){

    mongoose.connect(process.env.MONGODB_URL).then(()=>{
        console.log('connected');
    }).catch()


}


export default connect_to_db ;
