interface Props {
  onClose: () => void;
}

export default function SelectActionSheet({ onClose }: Props) {
  return (
    <div className="absolute bottom-16 left-0 w-full bg-white py-4 px-8 rounded-t-2xl shadow-md">
      <div className="flex justify-around">
        {[
          { label: "앨범", icon: "🖼️" },
          { label: "카메라", icon: "📷" },
          { label: "멍페이", icon: "💸" },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center space-y-1 cursor-pointer">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
              {item.icon}
            </div>
            <span className="text-xs">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
