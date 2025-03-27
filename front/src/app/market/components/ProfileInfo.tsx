import Image from "next/image";

interface ProfileInfoProps {
  nickname: string;
  profileImage: string;
  time: string;
}

export default function ProfileInfo({ nickname, profileImage, time }: ProfileInfoProps) {
  return (
    <div className="flex items-center justify-between py-4 px-4">
      {/* 프로필 사진 + 닉네임 + 시간 */}
      <div className="flex items-center gap-3">
        <div className="w-11 h-11 relative rounded-full overflow-hidden bg-gray-200">
          <Image src={profileImage} alt="프로필" fill className="object-cover" />
        </div>
        <div className="flex flex-col">
          <span className="text-m font-semibold text-gray-900">{nickname}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
      </div>
    </div>
  );
}
