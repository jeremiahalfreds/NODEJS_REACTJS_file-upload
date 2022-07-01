# file upload with NodeJS, ReactJS
#
# You might encounter an error when you upload a file with a very larger size
#
# So take into consideration your file size when displaying on the frontend


import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3007/")
      .then((res) => {
        // res.data.forEach((d) => console.log(d.img.data.data));
        // console.log(res.data);
        setData(res.data);
      })
      .catch((err) => console.log(err, "it has an error"));
  });
  return (
    <div className="App">
      <h1>Image uploading react</h1>
      {data.map((singleData) => {
        const base64String = btoa(
          String.fromCharCode(...new Uint8Array(singleData.img.data.data))
        );
        return (
          <div>
            <p key={singleData._id}>{singleData.name}</p>
            <img
              src={`data:image/png;base64,${base64String}`}
              width="300"
              alt=""
            />
          </div>
        );
      })}
    </div>
  );
}

export default App;
