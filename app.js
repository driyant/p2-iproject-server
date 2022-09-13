if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const router = require("./routes");

// Middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

// Router
app.use("/", router);

app.listen(port, () => {
  console.log('App is running on port:', port);
})