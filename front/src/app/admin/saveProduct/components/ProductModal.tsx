import React, { useState } from "react";
import Image from "next/image";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

// 가입 기간 옵션
const periodOptions = ["90일", "120일", "150일"];

interface ProductModalProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

export default function ProductModal({ onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    period: "90일",
    minAmount: 1,
    maxAmount: 100,
    maxRate: 3.0,
    rateDescription: "",
  });

  // 입력 변경 핸들러
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "minAmount" || name === "maxAmount" || name === "maxRate"
          ? parseFloat(value)
          : value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    console.log(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg relative">
        {/* 모달 헤더 및 로고 */}
        <div className="bg-white rounded-t-lg">
          <div className="flex justify-center items-center p-3 relative">
            <div className="text-teal-500 text-3xl font-bold">
              <div className="flex items-center justify-center">
                <Image src={awooAdmin} alt="어드민 awoo" height={180} width={180} />
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
            >
              <Image src={cancel} alt="닫기" height={35} width={35} />
            </button>
          </div>
        </div>

        {/* 모달 내용 */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* 상품명 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">상품명</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="예: 풍족하개"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* 상품 설명 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">상품 설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="예: 산책 적금 3단계 상품"
              className="w-full p-3 border rounded-md h-20 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* 가입 기간 */}
          <div className="mb-2">
            <label className="block text-gray-700 font-medium mb-2">가입 기간</label>
            <select
              name="period"
              value={formData.period}
              onChange={handleChange}
              className="w-full p-3 border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              {periodOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mb-2">
            {/* 가입 가능 금액 */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">가입 가능 금액 (만원)</label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  name="minAmount"
                  value={formData.minAmount}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="최소 금액"
                  required
                />
                <span className="text-gray-500">~</span>
                <input
                  type="number"
                  name="maxAmount"
                  value={formData.maxAmount}
                  onChange={handleChange}
                  min="1"
                  max="1000"
                  className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="최대 금액"
                  required
                />
              </div>
            </div>

            {/* 이자율 - 최대 이율만 입력받도록 수정 */}
            <div className="w-1/2">
              <label className="block text-gray-700 font-medium mb-2">이자율 (%)</label>
              <input
                type="number"
                name="maxRate"
                value={formData.maxRate}
                onChange={handleChange}
                min="0.1"
                max="10"
                step="0.1"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="이자율"
                required
              />
            </div>
          </div>

          {/* 이자율 설명 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">이자율 설명</label>
            <textarea
              name="rateDescription"
              value={formData.rateDescription}
              onChange={handleChange}
              placeholder="예: 3.3% 이자를 지급합니다"
              className="w-full p-3 border rounded-md h-20 resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* 등록 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="px-8 py-3 bg-teal-500 text-white font-medium rounded-md hover:bg-teal-600 transition duration-200 shadow-sm"
            >
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
