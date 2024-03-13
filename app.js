const fs = require("fs");
const express = require("express");
const app = express();
const PORT = 3000;

// Middleware untuk membaca json dari request body kita
app.use(express.json());

const customers = JSON.parse(fs.readFileSync(`${__dirname}/data/dummy.json`));
// Localhost
app.get("/", (req, res, next) => {
  res.send("<h1>Hallo FSW 1 <h1>");
});

app.get("/api/v1/customers", (req, res, next) => {
  res.status(200).json({
    status: "Success",
    totalData: customers.length,
    data: {
      customers,
    },
  });
});

app.post("/api/v1/customers", (req, res) => {
  console.log(req.body);
  const newCustomers = req.body;
  customers.push(newCustomers);
  fs.writeFile(
    `${__dirname}/data/customers`,
    JSON.stringify(customers),
    (err) => {
      res.status(201).json({
        status: "Success",
        data: { customers: newCustomers },
      });
    }
  );
  res.send("Udah Cuy");
});

app.listen(PORT, () => {
  console.log(`App Running on port : ${PORT}`);
});
