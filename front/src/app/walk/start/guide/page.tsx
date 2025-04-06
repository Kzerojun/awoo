"use client";

import React from "react";
import CommonTopBar from "@/common/ui/CommonTopBar";

import WalkingGuide from "@/app/walk/components/WalkingGuide";
const WalkingGuidePage = () => {
  return (
    <div>
      <CommonTopBar title="산책" />
      <main className="mt-14">
        <WalkingGuide />
      </main>
    </div>
  );
};

export default WalkingGuidePage;
