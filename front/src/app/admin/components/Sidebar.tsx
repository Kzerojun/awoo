"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import awooAdmin from "../../../../public/logos/AwOO_admin.svg";
// 활성화 아이콘 가져오기
import accountActive from "../../../../public/icons/admin/active/account_active.svg";
import questionActive from "../../../../public/icons/admin/active/question_active.svg";
import reportActive from "../../../../public/icons/admin/active/report_active.svg";
import saveActive from "../../../../public/icons/admin/active/save_active.svg";
// 비활성화 아이콘 가져오기
import accountDeactive from "../../../../public/icons/admin/deactive/account_deactive.svg";
import questionDeactive from "../../../../public/icons/admin/deactive/question_deactive.svg";
import reportDeactive from "../../../../public/icons/admin/deactive/report_deactive.svg";
import saveDeactive from "../../../../public/icons/admin/deactive/save_deactive.svg";

interface SidebarLinkProps {
  href: string;
  activeIcon: any;
  inactiveIcon: any;
  text: string;
  isActive: boolean;
}

const SidebarLink = ({ href, activeIcon, inactiveIcon, text, isActive }: SidebarLinkProps) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 py-6 hover:bg-teal-50 transition-colors ${
        isActive ? "bg-teal-50" : ""
      }`}
    >
      <div className="w-6 h-6 ml-7">
        <Image
          src={isActive ? activeIcon : inactiveIcon}
          alt={`${text} 아이콘`}
          width={24}
          height={24}
        />
      </div>
      <span className={`font-medium ${isActive ? "text-teal-500" : "text-gray-600"}`}>{text}</span>
    </Link>
  );
};

export default function Sidebar() {
  const pathname = usePathname();

  // "/admin/" 경로에서는 사이드바를 숨김
  if (pathname === "/admin" || pathname === "/admin/") {
    return null;
  }

  // 메뉴 아이템 정의
  const menuItems = [
    {
      href: "/admin/userReport",
      activeIcon: reportActive,
      inactiveIcon: reportDeactive,
      text: "유저 신고 관리",
    },
    {
      href: "/admin/userAccount",
      activeIcon: accountActive,
      inactiveIcon: accountDeactive,
      text: "유저 계좌 관리",
    },
    {
      href: "/admin/saveProduct",
      activeIcon: saveActive,
      inactiveIcon: saveDeactive,
      text: "적금 상품 관리",
    },
    {
      href: "/admin/questions",
      activeIcon: questionActive,
      inactiveIcon: questionDeactive,
      text: "문의 사항",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-50 bg-white shadow-md flex flex-col">
      {/* 로고 영역 */}
      <div className="p-3 mt-4">
        <Image src={awooAdmin} alt="AwOO 어드민 로고" width={230} height={150} className="h-auto" />
      </div>

      {/* 메뉴 영역 */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <SidebarLink
            key={item.href}
            href={item.href}
            activeIcon={item.activeIcon}
            inactiveIcon={item.inactiveIcon}
            text={item.text}
            isActive={pathname.startsWith(item.href)}
          />
        ))}
      </nav>

      {/* 하단 영역 */}
      <div className="p-4 text-xs text-gray-400 mb-6 text-center">
        <div>Terms of Service Privacy</div>
        <div>About AwOO Leave service</div>
        <div className="mt-2">LobUp Inc. 25.03.0-beta. 1.5927</div>
      </div>
    </aside>
  );
}
