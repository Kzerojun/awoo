"use client";

const TermsPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">이용약관</h2>
      <p className="text-gray-600 mb-4">
        본 약관은 AwoO 서비스 이용과 관련하여 필요한 사항을 규정합니다.
      </p>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md overflow-y-auto h-96">
        <h3 className="text-lg font-semibold mb-2">제1조 (목적)</h3>
        <p className="text-gray-700 mb-3">
          본 약관은 AwoO 플랫폼(이하 "서비스")를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임
          사항을 규정하는 것을 목적으로 합니다.
        </p>

        <h3 className="text-lg font-semibold mb-2">제2조 (정의)</h3>
        <p className="text-gray-700 mb-3">
          "서비스"란 AwoO가 제공하는 금융 서비스 및 관련 기능을 의미합니다.
        </p>

        <h3 className="text-lg font-semibold mb-2">제3조 (이용계약의 성립)</h3>
        <p className="text-gray-700">
          1. 이용계약은 사용자가 본 약관에 동의하고, 서비스 이용 신청을 완료한 경우 성립합니다. 2.
          회사는 필요 시 특정 서비스 이용에 대해 추가적인 동의를 요구할 수 있습니다.
        </p>
      </div>

      <p className="mt-4 text-gray-500 text-sm">
        본 약관의 세부 내용은 추후 업데이트될 수 있습니다.
      </p>
    </div>
  );
};

export default TermsPage;
