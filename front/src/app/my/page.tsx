"use client";

import CustomerSupport from "./components/CustomerSupport";
import MyPayment from "./components/MyPayment";
import MyPet from "./components/MyPet";
import MyProfile from "./components/MyProfile";
import MyTrade from "./components/MyTrade";
import TopBarLogo from "@/common/ui/TopBarLogo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 mt-4">
      <TopBarLogo />
      <div className="flex flex-col items-center w-full h-full max-w-md mx-auto px-8 py-6 bg-[#FCFCFC] pt-14">
        <div className="w-full mb-4">
          <MyProfile />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl px-3 py-1">
          <MyPayment />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <MyPet />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <MyTrade />
        </div>
        <div className="w-full mb-4 bg-white border border-gray-200 rounded-xl p-3">
          <CustomerSupport />
        </div>
      </div>
    </div>
  );
}
