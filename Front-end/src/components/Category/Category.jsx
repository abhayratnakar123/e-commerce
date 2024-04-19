import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Headphones",
    image: "../../assets/Image/Headphones.avif" 
   },
  {
    name: "Earbuds",
    image: "../../assets/Image/Earbuds.avif" 
  },
  {
    name: "Speakers",
    image: "../../assets/Image/Speakers.avif"},
  {
    name: "Watches",
    image: "../../assets/Image/Watches.avif"   },
];

const Category = () => {
  return (
    <div
      id="category"
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6"
    >
      {categories.map((category, index) => {
        return (
          <Link
            className="relative hover:scale-105 transition  duration-150 ease-linear"
            to={`/products?category=${category.name}`}
            key={category.image}
          >
            <div
              style={{
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
              }}
              className="absolute text-xl sm:text-xl xl:text-lg font-medium text-white  top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-20"
            >
              {category.name}
            </div>
            <img
              src={category.image}
              className=" object-contain"
              alt="Not found"
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Category;
