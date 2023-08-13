import express from 'express'
import cors from 'cors'
import "dotenv/config";

import HelloController from "./controllers/hello-controller.js"
import UserController from "./users/users-controller.js"
import TuitsController from "./controllers/tuits/tuits-controller.js";
import session from "express-session";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

const app = express();

mongoose.connect("mongodb+srv://subhashaleti:testing123@cluster0.inrmawz.mongodb.net/?retryWrites=true&w=majority"

);

app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL
    })
);
const sessionOptions = {
    secret: "any string",
    resave: false,
    saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
    sessionOptions.proxy = true;
    sessionOptions.cookie = {
        sameSite: "none",
        secure: true,
    };
}
app.use(session(sessionOptions));


app.use(express.json());
const port = process.env.PORT || 4000;

TuitsController(app);

AuthController(app);
HelloController(app)
UserController(app)
app.listen(process.env.PORT || 4000);

