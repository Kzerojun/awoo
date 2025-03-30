interface Props {
  currentTab: string;
  setCurrentTab: (tab: "전체" | "판매" | "구매" | "안 읽은 채팅방") => void;
}

export default function ChatFilterTabs({ currentTab, setCurrentTab }: Props) {
  const tabs = ["전체", "판매", "구매", "안 읽은 채팅방"] as const;

  return (
    <div className="flex space-x-2 overflow-x-auto">
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`px-3 py-1 rounded-full border text-sm ${
            currentTab === tab ? "bg-aqua text-white" : "bg-white border-gray-300"
          }`}
          onClick={() => setCurrentTab(tab)}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}
