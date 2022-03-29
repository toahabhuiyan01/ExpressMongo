const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const asyncHandler = require("express-async-handler");
const { auth, requiresAuth } = require('express-openid-connect');

const connectDB = require("./config/db");

const port = process.env.PORT || 8000;

const app = express();

const config = {
    authRequired: false,
    auth0Logout: true,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    secret: process.env.SECRET,
    clientSecret: process.env.CLIENT_SECRET,
    idpLogout: true,
    authorizationParams: {
        response_type: 'code id_token',
    }
};
  
app.use(
    auth(config)
);

connectDB();  

const {errorHandler} = require("./middleware/errorMiddleware");

app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use("/signin", requiresAuth(), require("./routes/auth0Route"));
app.use("/api/goals", require("./routes/goalRouts"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/", asyncHandler(async function(req, res) {
    let data = await req.oidc.fetchUserInfo();
    console.log(data);
    res.send(`<p>${JSON.stringify(req.oidc.user, null, 4)}</p>`);
}))
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
})