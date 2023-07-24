//! Raw Crud Operation

const express = require("express");
const bodyParser = require("body-parser");
const { PassThrough } = require("stream");
const dotenv = require("dotenv").config();
const app = express();
app.use(bodyParser.json());

//Routes
//! Check connection API
app.get("/", (req, res) => {
  res.json({ message: "Welcome to App !!!" });
});
//! create a customer API
let customersArray = [];
let customerId = 0;
app.post("/customers", (req, res) => {
  const customer = req.body;
  customer.id = ++customerId;
  customersArray.push(customer);
  res.status(201).json(customer);
});

//! Get all customer API
app.get("/customers", (req, res) => {
  res.json(customersArray);
});

//! Get a customer by id
app.get("/customers/:id", (req, res) => {
  const id = req.params.id;
  const customer = customersArray.find((u) => u.id == id);
  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
  } else {
    res.json(customer);
  }
});

//! Update a customer by id
app.put("/customers/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  const customer = customersArray.find((u) => u.id == id);
  if (!customer) {
    res.status(404).json({ message: "Customer not found" });
  } else {
    customer.name = body.name;
    customer.email = body.email;
    customer.password = body.password;
    res.json(customer);
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`app is running on port ${port}`);
});
