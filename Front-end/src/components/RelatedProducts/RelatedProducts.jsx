import React, { Fragment } from "react";
import ProductCard from "../ProductCard/ProductCard";

const RelatedProducts = ({ relatedProducts,setQuantity }) => {
  return (
    <div className="w-full py-8">
      <h1 className="text-2xl sm:text-3xl relative font-semibold">
        Related products
        <span className="absolute -bottom-2 left-0 w-20 h-1 bg-red-500"></span>
      </h1>
      <div className=" my-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {relatedProducts !== null
          ? relatedProducts.map((relatedProduct, index) => {
              return (
                <div style={{zIndex:0}} key={index + 101}>
                  <div onClick={()=>setQuantity(0)}>
                  <ProductCard product={relatedProduct} />
                  </div>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default RelatedProducts;
