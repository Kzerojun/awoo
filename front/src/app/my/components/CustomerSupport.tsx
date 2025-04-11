"use client";
import faq from "../../../../public/icons/mypage/faq.svg";
import question from "../../../../public/icons/mypage/question.svg";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import Link from "next/link";

export default function CustomerSupport() {
  return (
    <div className="w-full">
      <div className="text-xs text-[#828282] mb-2 mt-1 ml-1">고객 지원</div>

      <div>
        <Link href="my/faq" className="w-full block">
          {/* FAQ */}
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center ml-2">
              <div className="mr-2">
                <Image src={faq} alt="FAQ 아이콘" width={18} height={18} />
              </div>
              <div className="text-[15px]">자주 묻는 질문</div>
            </div>
            <div className="text-gray-400">
              <Image src={vector} width={7} height={7} alt="화살표" />
            </div>
          </div>
        </Link>

        {/* 구분선 */}
        <div className="border-t border-gray-200 w-full"></div>

        <Link href="my/question" className="w-full block">
          {/* 1:1 문의하기 */}
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center ml-2">
              <div className="mr-2.5">
                <Image src={question} alt="문의하기 아이콘" width={16} height={16} />
              </div>
              <div className="text-[15px]">1:1 문의하기</div>
            </div>
            <div className="text-gray-400">
              <Image src={vector} width={7} height={7} alt="화살표" />
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
