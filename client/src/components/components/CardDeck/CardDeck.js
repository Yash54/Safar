import React, { useState, useEffect } from "react";
import "./CardDeck.css";
import CardList from "../../assets/CarCard/CardList";
import SkeletonCard from "../../assets/CarCard/SkeletonCarCard";

const Main = ({data,city,toDate,fromDate}) => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load this effect on mount
  useEffect(() => {
    setLoading(true);
    if (data)
    {
      setCars(data);
    }
    if (cars)
      setLoading(false);
  });

  return (
    <div className="Main">
      {
        loading
          ?
          <SkeletonCard />
          :
          (
            <section key="0">
              <hr className="hr-text2" data-content={"Cars in " + city + " for Rent"} />
                <CardList
                  list={cars}
                  toDate={toDate}
                  fromDate={fromDate}
                />
              <hr />
            </section>
          )
      }
      
    </div>
  );
};

export default Main;