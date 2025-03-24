"use client";

const PrivacyPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">개인정보 처리방침</h2>
      <p className="text-gray-600 mb-4">
        본 방침은 산책 리워드 적금 서비스 이용 시 수집되는 개인정보의 처리에 관한 사항을 설명합니다.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto h-[500px]">
        <h3 className="text-lg font-semibold mb-2">1. 수집 항목 및 목적</h3>
        <ul className="list-disc ml-4 text-gray-700 space-y-1 mb-3">
          <li>이름, 이메일, 강아지 이름 등 서비스 가입 및 운영 목적</li>
          <li>산책 기록 정보: 보상 제공 및 적금 조건 확인용</li>
        </ul>

        <h3 className="text-lg font-semibold mb-2">2. 보관 및 파기</h3>
        <p className="text-gray-700 mb-3">
          수집된 정보는 서비스 제공 기간 동안 보관되며, 목적 달성 후에는 안전하게 파기됩니다.
        </p>

        <h3 className="text-lg font-semibold mb-2">3. 제3자 제공</h3>
        <p className="text-gray-700">
          사용자의 사전 동의 없이 개인정보를 외부에 제공하지 않습니다. 단, 법적 근거가 있는 경우
          예외적으로 제공될 수 있습니다.
        </p>
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        본 개인정보 처리방침은 관련 법령 변경 시 업데이트됩니다.
      </p>
    </div>
  );
};

export default PrivacyPage;
