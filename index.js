const axios = require("axios")
const express = require("express");
const {config} = require("dotenv")

const jwt = require("jsonwebtoken");
const{log,middleware,mongo, validateToken} = require("./shared");


const authRoutes = require("./routes/auth.routes");
const adminRoutes = require("./routes/admin.routes");

// const userRoutes = require("./routes/user.routes");


const app = express();
config();


// const PORT = 3001;


(async() => {
    try {
        await mongo.connect();

        // PARSE REQUEST BODY AS JSON
        app.use(express.json());
        


        //LOGGING MIDDLEWARE

            app.use(middleware.logging);

        // MAINTENANCE MIDDLEWARE

            app.use(middleware.Maintenance);


        //Auth Route
        app.use("/auth",authRoutes);

        // Token Middleware
        app.use(middleware.validateToken);

        //  Routes
        app.use("/posts",adminRoutes );
        // app.use("/users",userRoutes);


//Initialising the port 

app.listen( process.env.PORT, () => log(`server listening at port ${process.env.PORT}`));
    
    } catch (err) {
        console.error(err)
    }

})();