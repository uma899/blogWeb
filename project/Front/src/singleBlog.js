import React, { useState } from "react";
import styles from "./singleBlog.module.css";
import "./global.css";
import { API } from "./constants";
import {
  getArr,
  pushItemInArr,
  findInArr,
  popItemInArr,
} from "./handleStorage.js"; // Adjust the path as needed
import SingleBlogPage from "./singleBlogPage.js";

function SingleBlog({ e, t }) {
  const id = e.id ? e.id : 0;
  const [isLiked, setIsLiked] = useState(findInArr("liked", id));
  const [likes, setLikes] = useState(e.likes);

  //const [isOpened, setIsOpened] = useState(false);

  //console.log(e)

  return (
    <div className={styles.blog} key={e.title}>
{/*       <div style={{ display: isOpened ? "block" : "none" }}>
        <SingleBlogPage el={e} u = {t}/>
      </div> */}

      <img height="50%" className={styles.className} src={e.image} alt="Image here.."></img>
      <div style={{ paddingLeft: "5%" }}>
        <h3 style={{ fontWeight: "bold", display: "inline-block" }}>
          {e.title}
        </h3>{" "}
      </div>
      <div style={{ paddingLeft: "5%", overflow: "hidden" }}>
        By {e.creator}
      </div>
      <div>
        <button
          onClick={() => {
            t(<SingleBlogPage el={e} u = {t}/>);
          }}
          className="btn"
          style={{ position: "absolute", left: 10, bottom: 10 }}
        >
          Read More!
        </button>
        <div
          className={styles.likes}
          onClick={async () => {
            if (isLiked && id) {
              const response = await fetch(API + `dislike/${id}`);
              setIsLiked(false);
              setLikes(likes - 1);
              popItemInArr("liked", id);
            } else if (id) {
              const response = await fetch(API + `like/${id}`);
              setIsLiked(true);
              setLikes(likes + 1);
              //let IDs = getArr("ids");
              pushItemInArr("liked", id);
            } else {
              setLikes(likes + 1);
            }
          }}
        >
          <p style={{ color: "#a6a6a6" }}>{likes}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24px"
            viewBox="0 -960 960 960"
            width="24px"
            fill={!isLiked ? "#b1b1b1" : "#EA3323"}
          >
            <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Zm0-108q96-86 158-147.5t98-107q36-45.5 50-81t14-70.5q0-60-40-100t-100-40q-47 0-87 26.5T518-680h-76q-15-41-55-67.5T300-774q-60 0-100 40t-40 100q0 35 14 70.5t50 81q36 45.5 98 107T480-228Zm0-273Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SingleBlog;
