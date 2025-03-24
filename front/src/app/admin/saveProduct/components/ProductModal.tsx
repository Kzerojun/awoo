import React, { useState } from "react";
import Image from "next/image";
import { periodOptions } from "../data/mockData";
import awooAdmin from "../../../../../public/logos/AwOO_admin.svg";
import cancel from "../../../../../public/icons/admin/cancel.svg";

interface ProductModalProps {
  onClose: () => void;
  onSave: (product: any) => void;
}

export default function ProductModal({ onClose, onSave }: ProductModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    period: "6개월",
    minAmount: 1,
    maxAmount: 100,
    minRate: 0.1,
    maxRate: 2.0,
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
        name === "minAmount" || name === "maxAmount" || name === "minRate" || name === "maxRate"
          ? parseFloat(value)
          : value,
    });
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ ...formData, isActive: true, id: Date.now() });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-xl max-h-[90vh] overflow-y-auto">
        {/* 모달 헤더 */}
        <div className="flex justify-center items-center p-6 relative">
          <div className="mt-4">
            <div className="flex items-center justify-center">
              <Image src={awooAdmin} alt="어드민 awoo" height={220} width={220} />
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 absolute right-4 top-4"
          >
            <Image src={cancel} alt="닫기" height={35} width={35} />
          </button>
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
              placeholder="예: AW우리펫 적금상품"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          {/* 상품 설명 */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">상품 설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="상품에 대한 설명을 입력하세요"
              className="w-full p-3 border rounded-md min-h-[100px] resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* 가입 기간 */}
          <div className="mb-4">
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

          {/* 가입 가능 금액 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                최저 가입 금액 <span className="text-gray-500 text-sm">(만원)</span>
              </label>
              <input
                type="number"
                name="minAmount"
                value={formData.minAmount}
                onChange={handleChange}
                min="1"
                max="1000"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                최대 가입 금액 <span className="text-gray-500 text-sm">(만원)</span>
              </label>
              <input
                type="number"
                name="maxAmount"
                value={formData.maxAmount}
                onChange={handleChange}
                min="1"
                max="1000"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* 이자율 */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                최저 이자율 <span className="text-gray-500 text-sm">(%)</span>
              </label>
              <input
                type="number"
                name="minRate"
                value={formData.minRate}
                onChange={handleChange}
                min="0.1"
                max="10"
                step="0.1"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                최고 이자율 <span className="text-gray-500 text-sm">(%)</span>
              </label>
              <input
                type="number"
                name="maxRate"
                value={formData.maxRate}
                onChange={handleChange}
                min="0.1"
                max="10"
                step="0.1"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>
          </div>

          {/* 이자율 설명 */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">이자율 설명</label>
            <textarea
              name="rateDescription"
              value={formData.rateDescription}
              onChange={handleChange}
              placeholder="이자율 적용 조건 및 방식을 설명해주세요"
              className="w-full p-3 border rounded-md min-h-[80px] resize-none focus:outline-none focus:ring-2 focus:ring-teal-500"
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
