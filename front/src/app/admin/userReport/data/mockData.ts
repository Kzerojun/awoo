// 신고 데이터 타입 정의
export interface ReportData {
  id: number;
  username: string;
  userId: string;
  reportDate: string;
  processDate: string;
  reason: string;
  status: string;
  reportCount: number;
  resolution: string;
  content?: string;
}

// 신고 목록 데이터
export const reportListData: ReportData[] = [
  {
    id: 1,
    username: "이다은",
    userId: "dlek**",
    reportDate: "2025-01-02",
    processDate: "2025-03-13",
    reason: "욕설/비하",
    status: "대기",
    reportCount: 1,
    resolution: "대기",
  },
  {
    id: 2,
    username: "이다은",
    userId: "dlek**",
    reportDate: "2025-01-02",
    processDate: "2025-03-12",
    reason: "사기",
    status: "대기",
    reportCount: 1,
    resolution: "대기",
  },
  {
    id: 3,
    username: "이다은",
    userId: "dlek**",
    reportDate: "2025-01-02",
    processDate: "2025-03-11",
    reason: "욕설/비하",
    status: "대기",
    reportCount: 0,
    resolution: "경고",
  },
  {
    id: 4,
    username: "강은수",
    userId: "rkdd**",
    reportDate: "2025-02-02",
    processDate: "2025-03-10",
    reason: "욕설/비하",
    status: "대기",
    reportCount: 2,
    resolution: "영구 제재",
  },
  {
    id: 5,
    username: "강은수",
    userId: "rkdd**",
    reportDate: "2025-02-02",
    processDate: "2025-03-09",
    reason: "욕설/비하",
    status: "대기",
    reportCount: 1,
    resolution: "경고",
  },
  {
    id: 6,
    username: "김홍범",
    userId: "rlah**",
    reportDate: "2025-03-02",
    processDate: "2025-03-08",
    reason: "스팸/광고",
    status: "대기",
    reportCount: 0,
    resolution: "경고",
  },
  {
    id: 7,
    username: "김지한",
    userId: "rlaw**",
    reportDate: "2025-02-25",
    processDate: "2025-03-07",
    reason: "허위 정보",
    status: "대기",
    reportCount: 1,
    resolution: "정상",
  },
  {
    id: 8,
    username: "김덕진",
    userId: "rlae**",
    reportDate: "2025-01-26",
    processDate: "2025-03-06",
    reason: "기타",
    status: "대기",
    reportCount: 0,
    resolution: "경고",
  },
  {
    id: 9,
    username: "김영준",
    userId: "rlad**",
    reportDate: "2025-03-11",
    processDate: "2025-03-05",
    reason: "혐오 발언",
    status: "대기",
    reportCount: 2,
    resolution: "정상",
  },
  {
    id: 10,
    username: "윤희준",
    userId: "dbsg**",
    reportDate: "2025-01-14",
    processDate: "2025-03-04",
    reason: "성적 콘텐츠",
    status: "대기",
    reportCount: 2,
    resolution: "영구 제재",
  },
];

// 신고 상세 내용 데이터
export const reportDetailData: Record<number, string> = {
  1: "진짜 거래하다가 욕을 엄청 하네요. 부모님 안부는 왜 묻는지 정말.. 빨리 제재좀 해주세요...",
  2: "물건을 팔았는데 돈을 보내지 않고 계속 핑계를 대요. 사기를 당한 것 같습니다.",
  3: "말투가 너무 공격적이고 비하 발언을 계속합니다. 대화를 할 수 없는 수준입니다.",
  4: "채팅방에서 모두에게 욕설을 하고 다닙니다. 정말 불쾌합니다.",
  5: "댓글마다 비하 발언과 욕설을 남기고 있어요. 커뮤니티 분위기를 망치고 있습니다.",
  6: "계속해서 같은 광고 내용으로 도배를 합니다. 스팸 메시지가 너무 많습니다.",
  7: "사실이 아닌 정보를 의도적으로 퍼뜨리고 있습니다. 확인된 거짓 정보입니다.",
  8: "규정을 위반하는 행동을 반복적으로 하고 있어요. 여러 번 경고했지만 계속합니다.",
  9: "특정 집단에 대한 혐오 발언을 반복적으로 합니다. 정말 심각한 수준입니다.",
  10: "미성년자도 볼 수 있는 커뮤니티에 부적절한 성적 콘텐츠를 올립니다. 조치가 필요합니다.",
};

// 신고자 목록 데이터
export const reporterData: Record<number, string> = {
  1: "김홍범",
  2: "박서영",
  3: "이민호",
  4: "정수진",
  5: "한지민",
  6: "오재석",
  7: "최유나",
  8: "송태민",
  9: "유하린",
  10: "노진우",
};

// 신고 사유 옵션
export const reportReasonOptions = [
  "욕설/비하",
  "사기",
  "허위 정보",
  "스팸/광고",
  "혐오 발언",
  "성적 콘텐츠",
  "기타",
];

// 신고 처리 옵션
export const resolutionOptions = ["대기", "정상", "경고", "영구 제재"];
