const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");
const path = require("path");
const db = require("./db");
const router = require("./routes");
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;

//database connection
db.connect();

//middle-ware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));

//cors
app.use((req, res, next) => {
  req.header("Access-Control-Allow-Origin", "*");
  req.header("Access-Control-Allow-Headers", "*");
  next();
});

//routes
app.use("/api", router);

//app.use("/uploads", express.static(path.join(__dirname, "/../uploads")));

// app.use(express.static(path.join(__dirname, "/../coura_frontend/build")));
// app.get("*", (req, res) => {
//   try {
//     res.sendFile(path.join(__dirname, "/../coura_frontend/build/index.html"));
//   } catch (e) {
//     res.send("Oops! unexpected error!");
//   }
// });


// app.use(express.static(path.resolve(__dirname, 'coura_frontend', 'build')));
//     app.get("*", (req, res) => {
//         res.sendFile(path.resolve(__dirname, 'coura_frontend', 'build', 'index.html'),function (err) {
//             if(err) {
//                 res.status(500).send(err)
//             }
//         });
//     });

    
    app.use(express.static(path.join(__dirname, "../coura_frontend/build")));
    app.get("*", (req, res) => {
      try {
        res.sendFile(path.join(__dirname,"../coura_frontend/build/index.html"));
      } catch (e) {
        res.send("Oops! unexpected error!");
      }
    });
    

app.use(cors());
app.listen(PORT, () => {
  console.log(`Listening on port no ${PORT}`);
});
