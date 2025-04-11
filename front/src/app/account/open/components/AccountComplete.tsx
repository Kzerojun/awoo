import Image from "next/image";
import { useRouter } from "next/navigation";
import Button from "../../../../common/ui/Button";
import { resetAccountProgress } from "@/lib/slices/accountProgressSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

interface AccountCompleteProps {
  title: string;
  description: string;
  info: {
    label: string;
    value: string;
  }[];
}

export default function AccountComplete({ title, description, info }: AccountCompleteProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  // 페이지 진입 시 accountProgress 초기화
  useEffect(() => {
    dispatch(resetAccountProgress());
  }, [dispatch]);
  const handleGoToMyAccounts = () => {
    router.push("/home"); // home 으로 복귀
  };
  return (
    <div className="flex flex-col items-center justify-start pt-20 px-6 text-center gap-1">
      <Image
        src="/icons/account/present.svg"
        alt="완료 아이콘"
        width={230}
        height={230}
        className="mb-0"
      />
      <h2 className="text-2xl font-bold">{title}</h2>
      <p className="mt-2 text-sm text-gray-500 whitespace-pre-line">{description}</p>

      <div className="mt-20 text-sm text-gray-800 space-y-2">
        {info.map(({ label, value }) => (
          <div key={label} className="flex justify-between w-64">
            <span className="text-gray-500">{label}</span>
            <span>{value}</span>
          </div>
        ))}
      </div>
      {/* 확인 버튼 */}
      <div className="mt-12 w-full max-w-xs">
        <Button className="w-full" text="확인" onClick={handleGoToMyAccounts}></Button>
      </div>
    </div>
  );
}
