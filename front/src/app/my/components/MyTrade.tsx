"use client";
import favorite from "../../../../public/icons/mypage/favorite.svg";
import sell from "../../../../public/icons/mypage/sell.svg";
import buy from "../../../../public/icons/mypage/buy.svg";
import vector from "../../../../public/icons/mypage/vector.svg";
import Image from "next/image";
import Link from "next/link";

export default function MyTrade() {
  return (
    <div className="w-full">
      <div className="text-xs text-[#828282] mb-2 mt-1 ml-1">나의 거래</div>

      <div>
        <Link href="my/favorite" className="w-full block">
          {/* 관심 상품 */}
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center ml-2">
              <div className="mr-2">
                <Image src={favorite} alt="관심 상품 아이콘" width={18} height={18} />
              </div>
              <div className="text-[15px]">관심 상품</div>
            </div>
            <div className="text-gray-400">
              <Image src={vector} width={7} height={7} alt="화살표" />
            </div>
          </div>
        </Link>

        {/* 구분선 */}
        <div className="border-t border-gray-200 w-full"></div>

        <Link href="my/sellHistory" className="w-full block">
          {/* 판매 내역 */}
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center ml-2">
              <div className="mr-2.5">
                <Image src={sell} alt="판매 내역 아이콘" width={16} height={16} />
              </div>
              <div className="text-[15px]">판매 내역</div>
            </div>
            <div className="text-gray-400">
              <Image src={vector} width={7} height={7} alt="화살표" />
            </div>
          </div>
        </Link>

        {/* 구분선 */}
        <div className="border-t border-gray-200 w-full"></div>

        <Link href="my/buyHistory" className="w-full block">
          {/* 구매 내역 */}
          <div className="flex items-center justify-between w-full py-2">
            <div className="flex items-center ml-2">
              <div className="mr-2">
                <Image src={buy} alt="구매 내역 아이콘" width={18} height={18} />
              </div>
              <div className="text-[15px]">구매 내역</div>
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
