const {MongoClient} = require("mongodb");


// const MONGO_URL = "mongodb://localhost:27017";
// const MONGO_NAME = "guvi";

// const MONGO_URL = "mongodb+srv://sugumar:Sukhs%409532@cluster0.ogkji.mongodb.net/?retryWrites=true&w=majority"
// const MONGO_NAME = "guvi";

const log = require("./log");


const mongo = {
    db:null,  //DB connection string
    posts: null,  //students connection
    users:null,      // users connection

    async connect() {
        try {
            //Connecting to Mongo( server)
           const client = new MongoClient(process.env.MONGO_URL);
            // using await in order to wait utill it get response
           await client.connect();
           log("Mongo Connected Successfully");

           log(process.env.MONGO_URL);
       
           // Selecting the DB
            this.db = await client.db(process.env.MONGO_NAME);
           log(` Mongo database selected - ${process.env.MONGO_NAME}`);
       
           
            this.posts = await this.db.collection("posts");
            
           
           this.users = await this.db.collection("users");

           log("Mongo collections Initialized");
        //    return {students,users}
       
        } catch (err) {

           console.log("Error creating server", err.message);
        //    process.exit();
            // throw new Error(err);

        }
    }
}

module.exports = mongo;


