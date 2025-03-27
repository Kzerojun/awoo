"use client";
import React from "react";
import SavingTop from "../components/SavingTop";
import SavingBottom from "../components/SavingBottom";
import { MockSavingInfo } from "../components/MockSaving";
import { SavingAccountInfo } from "../components/MyAccountType";

interface MySavingPageProps {
  savingInfo: SavingAccountInfo;
}

const MySavingPage = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full w-full">
      {/* <SavingTop savingInfo={savingInfo} />
      <SavingBottom savingInfo={savingInfo} /> */}
    </div>
  );
};

export default MySavingPage;
