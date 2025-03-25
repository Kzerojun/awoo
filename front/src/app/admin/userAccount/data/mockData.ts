// 유저 데이터 타입 정의
export interface UserData {
  id: string;
  name: string;
  nickname: string;
  joinDate: string;
  accounts: {
    type: string;
    number: string;
    balance: number;
  }[];
  pet: string;
}

// 계좌 거래내역 타입 정의
export interface Transaction {
  date: string;
  description: string;
  amount: number;
  balance: number;
}

// 유저 목 데이터
export const userData: UserData[] = [
  {
    id: "dlek**",
    name: "이다은",
    nickname: "다은타운베이비",
    joinDate: "2025-03-13",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 230000,
      },
    ],
    pet: "아롱이",
  },
  {
    id: "rkdd**",
    name: "강은수",
    nickname: "강은수수깡",
    joinDate: "2025-03-12",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 450000,
      },
    ],
    pet: "다롱이",
  },
  {
    id: "rlah**",
    name: "김홍범",
    nickname: "김슭삵",
    joinDate: "2025-03-11",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 75000,
      },
      {
        type: "멍멍",
        number: "301-4587-9201-44",
        balance: 230000,
      },
    ],
    pet: "망고",
  },
  {
    id: "rlaw**",
    name: "김지한",
    nickname: "S2지한S2",
    joinDate: "2025-03-10",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 320000,
      },
      {
        type: "외부",
        number: "110-352-6789-01",
        balance: 450000,
      },
    ],
    pet: "노리",
  },
  {
    id: "rlae**",
    name: "김덕진",
    nickname: "오리진",
    joinDate: "2025-03-09",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 125000,
      },
    ],
    pet: "까망이",
  },
  {
    id: "rlad**",
    name: "김영준",
    nickname: "제로쭌",
    joinDate: "2025-03-08",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 275000,
      },
    ],
    pet: "치즈",
  },
  {
    id: "dbsg**",
    name: "윤희준",
    nickname: "윤종원",
    joinDate: "2025-03-07",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 430000,
      },
      {
        type: "멍멍",
        number: "926-7531-0284-55",
        balance: 560000,
      },
    ],
    pet: "김덕배",
  },
  {
    id: "rkdg**",
    name: "강현호",
    nickname: "혀노핑핑이",
    joinDate: "2025-03-06",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 190000,
      },
    ],
    pet: "시고르자브",
  },
  {
    id: "rlat**",
    name: "김성현",
    nickname: "퉁퉁이",
    joinDate: "2025-03-05",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 620000,
      },
    ],
    pet: "춘봉이",
  },
  {
    id: "rlax**",
    name: "김시원",
    nickname: "시원스껄",
    joinDate: "2025-03-04",
    accounts: [
      {
        type: "기업",
        number: "123-5555-****",
        balance: 340000,
      },
    ],
    pet: "장군이",
  },
];

// 계좌 거래내역 목 데이터
export const accountTransactions: Record<string, Transaction[]> = {
  "301-4587-9201-44": [
    {
      date: "03.12",
      description: "아롱이 - 산책 자유 적금",
      amount: -27000,
      balance: 230000,
    },
    {
      date: "03.11",
      description: "김덕진",
      amount: 10000,
      balance: 257000,
    },
    {
      date: "03.10",
      description: "아롱이 - 산책 정기 적금",
      amount: -10000,
      balance: 247000,
    },
    {
      date: "03.08",
      description: "멍페이 충전",
      amount: -50000,
      balance: 257000,
    },
  ],
  "926-7531-0284-55": [
    {
      date: "03.14",
      description: "펫보험 자동이체",
      amount: -15000,
      balance: 560000,
    },
    {
      date: "03.10",
      description: "애견카페 결제",
      amount: -22000,
      balance: 575000,
    },
    {
      date: "03.07",
      description: "급여입금",
      amount: 450000,
      balance: 597000,
    },
    {
      date: "03.05",
      description: "사료 구매",
      amount: -35000,
      balance: 147000,
    },
  ],
  "110-352-6789-01": [
    {
      date: "03.15",
      description: "동물병원 진료비",
      amount: -45000,
      balance: 450000,
    },
    {
      date: "03.12",
      description: "장난감 구매",
      amount: -13000,
      balance: 495000,
    },
    {
      date: "03.09",
      description: "미용비",
      amount: -30000,
      balance: 508000,
    },
    {
      date: "03.05",
      description: "적금 이체",
      amount: -50000,
      balance: 538000,
    },
  ],
};
