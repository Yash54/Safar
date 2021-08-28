import React, { useState, useEffect } from "react";
import "./Display.css";
import dummyData from "../../../data";

import CardList from "../../assets/CarCard/CardList";
import SkeletonCard from "../../assets/CarCard/SkeletonCarCard";

const Main = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load this effect on mount
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setVideos(dummyData);
      setLoading(false);
    }, 2500);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Main">
      {loading && <SkeletonCard />}
      {!loading &&
        videos.map((list, index) => {
          return (
            <section key={index}>
              <h2 className="section-title">{list.section}</h2>
              <CardList list={list} />
              <hr />
            </section>
          );
        })}
    </div>
  );
};

export default Main;