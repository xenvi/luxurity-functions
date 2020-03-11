const functions = require("firebase-functions");
const express = require("express");
const app = express();

// item handlers
const { getAllItems, getItem, createItem } = require("./handlers/items");

// user handlers
const { signup, login } = require("./handlers/users");

app.get("/items", getAllItems);
app.get("/items/:itemId", getItem);
app.post("/newItem", createItem);
app.post("/signup", signup);
app.post("/login", login);

exports.api = functions.https.onRequest(app);
