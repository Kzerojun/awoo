"use client";

import Certificate from "./components/Certificate";
import TopBar from "../../../../common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";

export default function CertificateNumber() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <TopBar title="멍Pay" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />

      <div className="pt-14">
        <Certificate />
      </div>
    </div>
  );
}
