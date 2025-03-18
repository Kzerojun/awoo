"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  {
    name: "홈",
    path: "/home",
    activeIcon: "/icons/bottombar/active/home_aqua.png",
    inactiveIcon: "/icons/bottombar/deactive/home_gray.png",
  },
  {
    name: "중고거래",
    path: "/market",
    activeIcon: "/icons/bottombar/active/Handshake_aqua.png",
    inactiveIcon: "/icons/bottombar/deactive/handshake_gray.png",
  },
  {
    name: "산책",
    path: "/walk",
    activeIcon: "/icons/bottombar/active/walk_aqua.png",
    inactiveIcon: "/icons/bottombar/deactive/walk_gray.png",
  },
  {
    name: "마이",
    path: "/my",
    activeIcon: "/icons/bottombar/active/Account circle_aqua.png",
    inactiveIcon: "/icons/bottombar/deactive/my_gray.png",
  },
];

// 특정 페이지에서 하단바 숨김 (필요할 경우 이곳에 추가)
const hideOnPages = ["/#"];

const Bottombar = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (hideOnPages.includes(pathname)) return null;
  return (
    <nav className="fixed bottom-1.5 left-0 w-full bg-custom-white  shadow-[0_-1px_4px_rgba(0,0,0,0.05)] h-12">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link href={item.path} key={item.path} className="flex flex-col items-center gap-1">
              <Image
                className="h-5 w-5 object-contain aspect-square"
                src={isActive ? item.activeIcon : item.inactiveIcon}
                alt={item.name}
                width={20}
                height={20}
              />
              <span className={`text-[11.5px] ${isActive ? "text-aqua" : "text-custom-gray"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
export default Bottombar;
