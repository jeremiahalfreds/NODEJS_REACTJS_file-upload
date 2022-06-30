// dotenv config
require("dotenv").config();
// OR 
// require("dotenv/config");

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const connectDB = require("./config/db");
const multer = require("multer");
const cors = require("cors");
const User = require("./models/userModels");
const fs = require("fs");
const path = require("path");

// When you wanna use the file-upload uncomment this
// const upload = require("express-fileupload")

// Calling the Express(), BodyParser, & a Static("public"), EJS Template to get extra styling and resources
const app = express();

// Work only with File-upload not multer
// app.use(upload({
//   limits: { fileSize:  1024 * 1024 }
// }));

app.use(cors());
app.use(express.static("public"));
// ============ Parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

/*=== MongoDB Connection Function===*/
connectDB();

// Port assigned to the server
const PORT = process.env.PORT || 3007;

// Dev Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Dev MIddleware
/*app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});*/

// Specify the location
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "assets");
  },
  filename: (req, file, callback) => {
    console.log(file);
    callback(null, file.originalname + "-" + Date.now() + path.extname(file.originalname))
  },
});

// Use the Storage
const upload = multer({ storage: storage });

/*======================= Routes Below ==========================*/

// Post the data to the doc with MULTER
app.post("/", upload.single("image"), (req, res) => {
  console.log(req.body);
  console.log(req.file);

  const saveImage = User({
    name: req.body.name,
    img: {
      data: fs.readFileSync("assets/" + req.file.filename),
      contentType: "image/png",
    },
  })

  saveImage.save().then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
  res.send("image is saved............");
})

// Post the data to the doc with file-upload
// app.post("/", async (req, res) => {
//   const { name } = req.body;

//   const addNew = new User({
//     name
//   });

//   if (req.files) {
//     console.log(req.files);
//     const file = req.files.file
//     const filename = file.name
//     console.log(filename);
//     const limit = file.size;
//     console.log(limit)

//     file.mv("./assets/" + filename, (err) => {
//         if(err) {
//             res.send(err)
//         } else {

//           const { data, mimetype } = req.files.file;
//           addNew.img.data = data
//           addNew.img.contentType = mimetype
//           addNew.save().then((res) => console.log("save"))
//           res.send("File Uploaded")
//         }
//     })

//   }

// })


// Read the data from the database
app.get("/", async (req, res) => {
  const allData = await User.find({});
  // console.log(allData);
  res.json(allData);
})

// App Server is listening on a specific port created...
app.listen(PORT, function () {
  console.log(
    `Server is running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`
  );
});
