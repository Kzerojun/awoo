"use client";

const TermsPage = () => {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-xl font-semibold mb-4">이용약관</h2>
      <p className="text-gray-600 mb-4 text-sm">
        본 약관은 산책 리워드 적금 서비스 이용과 관련한 권리, 의무 및 책임사항을 규정합니다.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto h-[350px]">
        <h3 className="text-sm font-semibold mb-2 ">제1조 (목적)</h3>
        <p className="text-gray-700 mb-3 text-sm">
          이 약관은 AwoO가 제공하는 산책 리워드 적금 서비스의 이용 조건 및 절차에 관한 사항을
          규정함을 목적으로 합니다.
        </p>

        <h3 className="font-semibold mb-2 text-sm">제2조 (서비스의 이용)</h3>
        <ul className="list-disc ml-4 text-gray-700 space-y-1 mb-3 text-sm">
          <li>사용자는 1인당 1마리 강아지 기준으로 1개 적금에 가입할 수 있습니다.</li>
          <li>산책 조건(회수 및 거리)을 만족해야 단계 상승 혜택이 제공됩니다.</li>
        </ul>

        <h3 className="font-semibold mb-2 text-sm">제3조 (책임 제한)</h3>
        <p className="text-gray-700 text-sm">
          AwoO는 천재지변, 기술적 장애 등의 불가항력적 사유로 인한 서비스 이용 중단에 대해 책임을
          지지 않습니다.
        </p>
      </div>

      <p className="mt-4 text-gray-500 text-xs">
        본 약관은 변경될 수 있으며, 변경 시 사전고지 예정
      </p>
    </div>
  );
};

export default TermsPage;
