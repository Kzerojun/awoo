"use client";

import Certificate from "./components/Certificate";
import CommonTopBar from "../../../../common/ui/CommonTopBar";
import { BellIcon } from "@heroicons/react/24/outline";

export default function CertificateNumber() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CommonTopBar title="멍Pay" rightAction="bell" />

      <div className="pt-14">
        <Certificate />
      </div>
    </div>
  );
}
