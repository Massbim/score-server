const express = require("express");
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
require("dotenv").config();

const corsOptions = {
  origin: "*",
};

// Create an Express app
const app = express();
app.use(cors(corsOptions));
app.use(express.json({ limit: "50mb" }));

// Create an HTTP server using the Express app
const server = http.createServer(app);

// Connect to the database
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(`${process.env.DATABASE_URL}express`, mongooseConfig)
  .then(() => console.log("Database connected"))
  .catch((err) => {
    console.error(`Failed to connect to the database: ${err.message}`);
    process.exit(1); // Use a non-zero exit code to indicate an error
  });

// Include existing routes
require("./app/routes/coach.route")(app);
require("./app/routes/homeTeam.route")(app);
require("./app/routes/awayTeam.route")(app);
require("./app/routes/team.route")(app);
require("./app/routes/teamList.route")(app);
require("./app/routes/score.route")(app);
require("./app/routes/playerHome.route")(app);
require("./app/routes/playerAway.route")(app);
require("./app/routes/formation.route")(app);

const pictureRoutes = require("./app/routes/picture.route");
app.use("/pictures", pictureRoutes);

app.get("/", (req, res) => {
  res.send("Scoreboard API");
});

// const IP_ADDRESS = process.env.IP || "localhost";
const PORT = process.env.PORT;
server
  .listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
  })
  .on("error", (err) => {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1); // Use a non-zero exit code to indicate an error
  });
