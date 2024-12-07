const express = require("express");
const app = express();
const cors = require("cors");
const port = 3002;
const path = require("path");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

// Routes
const admin = require("./routes/admin");

app.use(express.json()); // Middleware para parsear el body
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "upload")));

require("dotenv").config();

//ALl Routes
app.use("/api", admin);

var options = {
  customCss: ".swagger-ui .topbar { display: none }",
};

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, options)
);


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
