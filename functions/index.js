const functions = require("firebase-functions");
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

// item handlers
const { getAllItems, getItem, createItem } = require("./handlers/items");

// user handlers
const { signup, login, getAuthenticatedUser } = require("./handlers/users");

const fbAuth = require("./util/fbAuth");

app.get("/items", getAllItems);
app.get("/items/:itemId", getItem);
app.post("/newItem", createItem);

app.post("/signup", signup);
app.post("/login", login);
app.get("/user", fbAuth, getAuthenticatedUser);

exports.api = functions.https.onRequest(app);
