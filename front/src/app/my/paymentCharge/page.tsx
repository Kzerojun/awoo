"use client";

import TopBar from "../../../common/ui/TopBar";
import { BellIcon } from "@heroicons/react/24/outline";

export default function PaymentCharge() {
  return (
    <div>
      <TopBar title="충전" rightAction={<BellIcon className="h-6 w-6 text-gray-500 mt-1" />} />
      <div>PaymentCharge</div>
    </div>
  );
}
