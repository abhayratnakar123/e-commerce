import React, {  useEffect, useState } from "react";
import useApiData from "../../hooks/useApiData";
import ProductCard from "../ProductCard/ProductCard";
import Loader from "../Loader/Loader";

const AllProducts = () => {
  const { data, loading } = useApiData("http://localhost:3000/api/product");
  const [products, setProducts] = useState(null);
  useEffect(() => {
    if (data !== null) { 
      setProducts(data.products);
    }
  }, [data]);

  return (
    !loading?<div className="">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {products?.map((product, index) => {
          return (
            <div style={{zIndex:0}} key={product._id + index + 201}>
              <ProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>:(
      <div><Loader/></div>
    )
  );
};

export default AllProducts;
