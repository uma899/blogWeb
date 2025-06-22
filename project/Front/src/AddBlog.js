import React, { useState } from "react";
import styles from "./addBlog.module.css";
import { API } from "./constants";
import SingleBlog from "./singleBlog";
import { getValue } from "./handleStorage";
import CustomAlert from "./customAlert";

function AddBlog() {
  const [isVerified, setIsVerified] = useState(false);
  //const [isLoggedIn, setIsLoggedIn] = useState(getValue("usr") === "" ? false : true)
  const [usrInput, setUsrInput] = useState({
    title: "Title Here",
    about: "About Here",
    likes: 0,
  });

  const [isOp, setIsOp] = useState(0);

  return (
    <div className={styles.addBlog}>
      {/* <div className="center"> */}
      {getValue("usr") !== "" ? null : "Please Login to create!"}
      <p>Title:</p>
      <input id="title" type="text"></input>
      <p>About:</p>
      <textarea
        id="about"
        style={{ height: "30vh", alignItems: "start" }}
        type="text"
      />
      <p>Image Url:</p>
      <input id="image" type="text"></input>
      {/* </div> */}

      <CustomAlert isOpen={isOp} setIsOpen = {setIsOp} title="Failed" matter="Don't leave anything blank!"/>

      <button
        className="btn"
        style={{ marginTop: "20px" }}
        disabled = {((getValue("usr") === "")) ? true : false}
        onClick={async () => {
          let data = {
            title: document.getElementById("title").value,
            about: document.getElementById("about").value,
            image: document.getElementById("image").value,
            likes: 0,
            creator: getValue("usr"),
          };

          setUsrInput(data);
          setIsVerified(true);

          if (isVerified && getValue("usr") !== "" && data.title && data.about) {
            const response = await fetch(API + "blogs/", {
              method: "POST", // *GET, POST, PUT, DELETE, etc.
              headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
                // You might need to include other headers like 'Authorization' if required by your API
                // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
              },
              body: JSON.stringify(data),
            });
            if (!response.ok) {
              alert("API failed! Try Again after sometime..");
            } else {
              alert("Added!");
              window.location.reload();
            }
          }
          else{
            //alert("Don't leave Empty!")
            setIsOp(1)
          }
        }}
      >
        {isVerified ? "Submit" : "View"}
      </button>
      {/* <div style = {{marginTop: 20}}> */}
      <SingleBlog e={usrInput} />
      {/* </div> */}
    </div>
  );
}

export default AddBlog;
