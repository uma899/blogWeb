import React, { useState } from "react";

import styles from "./account.module.css";
import { getArr, pushItemInArr, getValue, setValue } from "./handleStorage";
import { API } from "./constants";

function Account() {
  const [usr, setUsr] = useState(getValue("usr"));
  const [isSubmitting, setIsSubmitting] = useState(0);
  const [found, setFound] = useState(false);

  const [formData, setFormData] = useState({
    usr: "",
    password: "",
    // likes: 0, // Likes would typically be updated by user interaction (e.g., a like button), not directly from a form input
  });

  //let canSubmit = !isSubmitting && !found && formData.name && formData.password;

  if (usr == "") {
    const handleSubmit = async () => {
      const response = await fetch(API + "creators", {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
          // You might need to include other headers like 'Authorization' if required by your API
          // 'Authorization': 'Bearer YOUR_TOKEN_HERE'
        },
        body: JSON.stringify({ creator: formData.usr, pin: formData.password }),
      });

      setIsSubmitting(1);

      if (response.ok) {
        setValue("usr", formData.usr);
        setUsr(formData.usr);
        //window.location.reload();
      } else {
        alert("Try Again..");
        window.location.reload();
      }

      console.log(formData);
    };

    const handleChange = async (e) => {
      const { name, value } = e.target; // Destructure 'name' and 'value' from the event target
      setFormData((prevData) => ({
        ...prevData, // Keep all existing formData properties
        [name]: value, // Update only the property that matches the input's 'name' attribute
      }));

      if (name === "usr") {
        const response = await fetch(API + `creators/${value}`);
        const d = await response.json();
        setFound(d.isThere ? true : false);
        console.log(d);
      }
    };
    return (
      <>
        <div className={styles.usrForm}>
          <h2>Creator name:</h2>
          <input type="text" name="usr" onChange={handleChange}></input>
          <p style={{ marginBottom: "10vh" }}>
            {found ? <>Already exist</> : <>Available</>}
          </p>
          <h2>PIN:</h2>
          <input
            style={{ marginBottom: "10vh" }}
            type="test"
            name="password"
            onChange={handleChange}
          ></input>
          <button
            className="btn"
            /* style={{ opacity: { canSubmit } ? 1 : 0.4 }} */
            //disabled={!(!isSubmitting && !found && formData.name && formData.password)}
            onClick={handleSubmit}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </>
    );
  }

  return (
    <div style={{display: 'grid', placeContent: 'center', height: '100vh'}}>
      <h1>Hello {usr}!</h1>
      <button
        className="btn"
        onClick={() => {
          localStorage.removeItem("usr");
          setUsr("");
        }}
      >
        Log Out
      </button>
    </div>
  );
}

export default Account;
