
const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  // _id: {type: ObjectId},
  name: { type: String, required: true },
  img: { data: Buffer, contentType: String }
}, { timestamps: true });

// module.exports = mongoose.model("Profile-Image", imageSchema);
module.exports = mongoose.model("Image", imageSchema);
