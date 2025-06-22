import React, { useEffect, useState } from "react";
import { API } from "./constants";

import styles from "./Blog.module.css";
import SingleBlog from "./singleBlog";

function Blogs({s}) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const limit = 5;

  const [start, setStart] = useState(-1);
  const fetchData = async () => {
    const response = await fetch(`${API}blogs/?start=${start}&limit=${limit}`);
    const temp = await response.json();
    setData(data.concat(temp));
    if (data) {
      setIsLoading(false);
    }
    //return temp;
  };

  useEffect(() => {
    fetchData();

    console.log(data);
  }, [start]);

  if (isLoading && navigator.onLine) {
    return <>Loading... It may take time!</>;
  }

  if (!navigator.onLine) {
    return (
      <div style={{ display: "grid", placeItems: "center" }}>
        <p>You're Offline... Turn on data..!</p>
      </div>
    );
  }

  return (
    <div className={styles.blog_container}>
      <h1>All Blogs</h1>
      {data.map((el) => (
        <SingleBlog e={el} t = {s} />
      ))}
      <button
        className="btn"
        onClick={() => {
          setStart(start + limit);
        }}
      >
        More
      </button>
    </div>
  );
}

export default Blogs;
