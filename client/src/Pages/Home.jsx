import React from "react";
import Hero from "../Components/Landing/Hero";
import ExploreProducts from "../Components/Landing/ExploreProducts";
import Discount from "../Components/Landing/Discount";
import Service from "../Components/Landing/Service";
import BestSellery from "../Components/Landing/BestSellery";
import Category from "../Components/Landing/Category";
import Cookies from "js-cookie";
import { useState } from "react";
import axios from "axios";

const Home = () => {
  const [count, setCount] = useState(1);
  const token = Cookies.get("token");
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  return (
    <div>
      <Hero />
      <Service />
      <Discount />
      <BestSellery />
      <Category />
      <ExploreProducts />
    </div>
  );
};

export default Home;
