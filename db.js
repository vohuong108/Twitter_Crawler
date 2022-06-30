const mongoose = require('mongoose');
const {EXCEPTION_LENGTH} = require('./constant');

// const uri = "mongodb://localhost:27017/twitter_db"
const uri = "mongodb+srv://nlpUser:nlpuser12345@cluster0.zccf9.mongodb.net/twitter_db?retryWrites=true&w=majority"


const connectDB = async () => {
    for(let i = 0; i < EXCEPTION_LENGTH; i += 1) {
        try {
            await mongoose.connect(uri, { 
                useUnifiedTopology: true, 
                useNewUrlParser: true 
            });
            console.log("db connectted...!");
            return "CONNECTED TO DATABASE";
            
        } catch (err) {
            console.log("Occured error while connect to DB");
            console.error("Error: ", err);

            console.log("===>>>Replay ", i, " times");
            if(i === EXCEPTION_LENGTH-1) return "FAILED IN CONNECT TO DATABASE";
        }
        await new Promise((resolve, _) => setTimeout(resolve, 800));
    }
}


module.exports = connectDB;

