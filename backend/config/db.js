
const mongoose =  require('mongoose');

const connectDB = async () => {
   const conn = await mongoose.connect(process.env.DB_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true,
   })
   
   console.log(`MongoDB Connect: ${conn.connection.host}`);

//  OR YOU USE THIS....................................

//    mongoose.connect(process.env.DB_URI, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }).then(() => console.log("Connected to DB"))   
//     .catch (console.error);

}

module.exports = connectDB