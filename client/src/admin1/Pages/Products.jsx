import React from "react";
import ProductForm from "../ProductForm";

const Products = () => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full my-6 md:ml-24 px-10 py-5 rounded-lg">
        <ProductForm />
      </div>
    </div>
  );
};

export default Products;
