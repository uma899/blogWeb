import React from "react";
import styles from "./singleBlogPage.module.css";
import Blogs from "./Blogs";

function SingleBlogPage({ el, u }) {
  return (
    <div className={styles.c}>
      <div className={styles.header}>
        <div
          onClick={() => {
            u(<Blogs s={u}/>);
          }}
          className={styles.icon}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill="black"
          >
            <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z" />
          </svg>
        </div>
        <h2>{el.title}</h2>
      </div>
      <div className={styles.content}>
        <div className={styles.img}>
          <img style={{objectFit: "cover"}} src={el.image} width="100%"></img>
        </div>
        <p style={{padding: "25px"}}>{el.about}</p>
      </div>
    </div>
  );
}

export default SingleBlogPage;
