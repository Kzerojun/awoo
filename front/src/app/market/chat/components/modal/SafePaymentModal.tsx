"use client";

import { useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (trackingNumber: string, courier: string) => void;
}

const courierList = [
  "CJ대한통운",
  "한진택배",
  "롯데택배",
  "우체국택배",
  "쿠팡로지스틱스",
  "경동택배",
];

export default function SafePaymentModal({ isOpen, onClose, onSubmit }: Props) {
  const [tracking, setTracking] = useState("");
  const [selectedCourier, setSelectedCourier] = useState(""); // ❗ 초기값 없음으로 설정

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[300px] shadow-lg space-y-4">
        <h2 className="text-lg font-bold text-center">운송장 정보 입력</h2>
        <p className="text-sm text-gray-600 text-center">
          입력한 정보는 거래 추적용으로만 사용됩니다.
        </p>

        {/* 택배사 드롭다운 */}
        <Listbox value={selectedCourier} onChange={setSelectedCourier}>
          <div className="relative mt-1">
            <Listbox.Button className="relative w-full cursor-default rounded border border-gray-300 py-2 pl-3 pr-10 text-left text-sm bg-white shadow-sm focus:outline-none">
              <span className={clsx("block truncate", !selectedCourier && "text-gray-400")}>
                {selectedCourier || "택배사를 선택하세요"}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </span>
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-sm shadow-md ring-1 ring-black/5 focus:outline-none">
                {courierList.map((courier, index) => (
                  <Listbox.Option
                    key={index}
                    value={courier}
                    className={({ active }) =>
                      clsx(
                        "cursor-pointer select-none px-4 py-2",
                        active ? "bg-gray-100 text-black" : "text-gray-800"
                      )
                    }
                  >
                    {({ selected }) => (
                      <div className="flex justify-between items-center">
                        <span>{courier}</span>
                        {selected && <CheckIcon className="w-4 h-4 text-aqua" />}
                      </div>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        {/* 운송장 입력 */}
        <input
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="예: 123456789101"
          value={tracking}
          onChange={(e) => setTracking(e.target.value)}
        />

        {/* 버튼 */}
        <div className="flex justify-center space-x-4 pt-2">
          <button
            disabled={!tracking || !selectedCourier}
            onClick={() => {
              alert("배송지 정보가 입력되었습니다");
              onSubmit(tracking, selectedCourier);
              onClose();
            }}
            className={clsx(
              "text-sm px-4 py-1 rounded-md",
              tracking && selectedCourier
                ? "bg-aqua text-white"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            )}
          >
            확인
          </button>
          <button
            onClick={onClose}
            className="text-gray-500 text-sm border border-gray-300 px-4 py-1 rounded-md"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
