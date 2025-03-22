"use client";

const PrivacyPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">개인정보 처리방침</h2>
      <p className="text-gray-600 mb-4">
        본 개인정보 처리방침은 AwoO 서비스 이용 시 개인정보 보호와 관련된 사항을 규정합니다.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto h-96">
        <h3 className="text-lg font-semibold mb-2">1. 개인정보 수집 항목 및 목적</h3>
        <p className="text-gray-700 mb-3">서비스 이용을 위해 다음과 같은 개인정보를 수집합니다:</p>
        <ul className="list-disc ml-4 text-gray-700 space-y-1">
          <li>이름, 연락처, 이메일 주소</li>
          <li>서비스 이용 기록 및 결제 정보</li>
          <li>기타 서비스 운영을 위해 필요한 정보</li>
        </ul>

        <h3 className="text-lg font-semibold mt-4 mb-2">2. 개인정보 보관 및 보호</h3>
        <p className="text-gray-700 mb-3">
          수집된 개인정보는 서비스 제공 목적에 맞게 일정 기간 보관되며, 보관 기간 종료 후 안전하게
          파기됩니다.
        </p>

        <h3 className="text-lg font-semibold mt-4 mb-2">3. 개인정보 제공 및 공유</h3>
        <p className="text-gray-700">
          사용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법적 요청이 있는 경우
          예외적으로 제공될 수 있습니다.
        </p>
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        본 개인정보 처리방침은 법령 개정 등에 따라 변경될 수 있습니다.
      </p>
    </div>
  );
};

export default PrivacyPage;
