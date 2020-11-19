const path = require("path");
const express = require("express");
const hbs = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

// Define Paths for Express Config
const pathname = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup Handlebars Engine and View Location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to server
app.use(express.static(pathname));

app.get("", (req, res) => {
  res.render("index", {
    title: "Soladoye is Here",
    name: "Emi na ni",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Page",
    name: "Soladoye Daniel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Soladoye Daniel",
    message: "Help me bro!",
  });
});

app.get("/weather", (req, res) => {
  const locationAddress = req.query.address;

  if (!locationAddress) {
    return res.send({
      error: "Address was not provided!",
    });
  }

  geocode(locationAddress, (error, { longitude, latitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }

    forecast(longitude, latitude, (err, forecast) => {
      if (err) {
        return res.send({ err });
      }

      res.send({
        location,
        forecast,
        address: locationAddress,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "Search Term was not Provided",
    });
  }
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    errorMessage: "Article Not Found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    errorMessage: "Page Not Found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
