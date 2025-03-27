import Image from "next/image";
interface AccountCompleteProps {
  title: string;
  description: string;
  info: {
    label: string;
    value: string;
  }[];
}

export default function AccountComplete({ title, description, info }: AccountCompleteProps) {
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
    </div>
  );
}
