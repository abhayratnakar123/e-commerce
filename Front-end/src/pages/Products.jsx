import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inititalizeCategoriesProducts } from "../redux/actions/CategoriesAction";
import ProductCard from "../components/ProductCard/ProductCard";
import useApiData from "../hooks/useApiData";
import Loader from "../components/Loader/Loader";
import NoProductsFound from "../assets/Icon/NoProductsFound"; 
import FilterButton from "../components/FilterButton/FilterButton";

const Categories = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");
  const search = queryParams.get("search");
  const products = useSelector((state) => state.CategoriesReducer.products);
  const apiUrl = `${
    category
      ? `https://luxe-lane-backend.vercel.app/api/product?category=${category}`
      : search
      ? `https://luxe-lane-backend.vercel.app/api/product?search=${search}`
      : "http://localhost:3000/api/product"
  }`;
  const { data } = useApiData(apiUrl);
  const [loader, setloader] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const applyFilter = (category) => {
    setIsFilterModalOpen(!isFilterModalOpen);
    navigate(`/products?category=${category}`);
  };

  useEffect(() => {
    setloader(true);
    if (data !== null) {
      dispatch(inititalizeCategoriesProducts(data.products));
      console.log("Data in Prodects" , data);
      setloader(false);
    }
  }, [data]);

  useEffect(() => {
    setloader(true);
    window.scrollTo(0, 0);
  }, [category, search]);

  return !loader ? (
    <div className="flex min-h-[80vh] justify-center w-full">
      <div className="w-[94%] sm:w-[90%] md:w-[80%] py-14">
        {products && products.length > 0 && (
          <h1 className="text-[1.65rem] sm:text-3xl flex justify-between font-semibold">
            {category ? category : search ? "Search results" : "Products"}
            {!search && (
            <FilterButton applyFilter={applyFilter} isFilterModalOpen={isFilterModalOpen} setIsFilterModalOpen={setIsFilterModalOpen}/>
            )}
          </h1>
        )}
        <div className="  my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
          {products && products.length > 0 ? (
            products.map((product, index) => {
              return (
                <div style={{zIndex:0}} key={product._id}>
                  <ProductCard product={product} />
                  
                </div>
              );
            })
          ) : (
            <div className="absolute top-[50%] left-0 w-full flex text-2xl sm:text-4xl  justify-center items-center">
              <div className="flex justify-center items-center gap-2 sm:gap-4">   No products found
              <span className="hidden sm:block"><NoProductsFound height={50} width={50} /></span>
              <span className="block sm:hidden"><NoProductsFound height={30} width={30} /></span>
              
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div>
      <Loader />
    </div>
  );
};

export default Categories;
