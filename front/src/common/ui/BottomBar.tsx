"use client";

import Link from "next/link";

interface BottombarProps {
  currentPath: string; // ✅ props로 `currentPath`를 받음
}

const Bottombar: React.FC<BottombarProps> = ({ currentPath }) => {
  const navItems = [
    {
      name: "홈",
      path: "/home",
      activeIcon: "/icons/bottombar/active/home_aqua.svg",
      inactiveIcon: "/icons/bottombar/deactive/home.svg",
    },
    {
      name: "중고거래",
      path: "/market",
      activeIcon: "/icons/bottombar/active/market_aqua.svg",
      inactiveIcon: "/icons/bottombar/deactive/market.svg",
    },
    {
      name: "산책",
      path: "/walk/pre",
      activeIcon: "/icons/bottombar/active/walk_aqua.svg",
      inactiveIcon: "/icons/bottombar/deactive/walk.svg",
    },
    {
      name: "마이",
      path: "/my",
      activeIcon: "/icons/bottombar/active/my_aqua.svg",
      inactiveIcon: "/icons/bottombar/deactive/my.svg",
    },
  ];

  // 특정 페이지에서 하단바 숨김 (필요할 경우 추가 가능)
  const hideOnPages = [
    "/",
    "/#",
    "/login",
    "/my/profile/withdraw",
    "/signup",
    "/signup/policy",
    "/signup/profile",
    "/my/paymentRegister/signupDone",
    "/my/paymentRegister/paymentPassword",
    "/my/paymentRegister/accountCertificate",
    "/my/paymentRegister/registerDone",
    "/my/paymentSend/completeSend",
    "/my/paymentCharge/chargeDone",
    "/walk/pre",
    "/walk/start/guide",
    "/walk/start/walking", // 산책하는 페이지
    "/walk/take-photo", // 산책 후 사진 찍는 페이지
    "/walk/photo-check", // 사진 찍고 확인하는 페이지
    "/walk/end/check", // 산책 종료 페이지
    "/main", // 메인 웹페이지
    "/market/safePayment/safePayDone",
    "/market/safePayment/safePay",
    "/market/commonPayment/commonPay", // 일반송금 내부 페이지
    "/market/commonPayment/commonPayDone",
    "/account/my/deposit/transfer", // 계좌이체 페이지
    "/account/my/check-password", // 계좌 조회 비밀번호 입력 페이지
    "/account/open/deposit", // 입출금 계좌 상품 설명 페이지
    "/account/verify/success/deposit", // 통장 개설 완료 페이지
  ];
  const isMarketDetail = /^\/market\/[^\/]+$/.test(currentPath);

  if (hideOnPages.includes(currentPath) || currentPath.includes("/admin") || isMarketDetail)
    return null; // 특정 페이지에서는 하단바 숨김

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-custom-white shadow-[0_-1px_4px_rgba(0,0,0,0.05)] h-13.5 z-50">
      <div className="flex justify-around py-2">
        {navItems.map((item) => {
          const isActive = currentPath.startsWith(item.path); // ✅ `usePathname()` 대신 `currentPath` 사용

          return (
            <Link
              href={item.path}
              key={item.path}
              prefetch={false}
              scroll={false}
              replace
              className="flex flex-col items-center gap-1"
            >
              <img
                className="h-5 w-5"
                src={isActive ? item.activeIcon : item.inactiveIcon}
                alt={item.name}
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
