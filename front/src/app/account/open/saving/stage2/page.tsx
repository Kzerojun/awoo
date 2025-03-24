"use client";

import React from "react";
import ProductSummary from "../components/ProductSummary";

const Page = () => {
  return (
    <div className="container mx-auto max-w-lg py-6">
      <ProductSummary productName="적절하개" description="산책 적금 2단계 상품" interest="2.8%" />
    </div>
  );
};

export default Page;
