interface DayDividerProps {
  date: string;
}

const DayDivider = ({ date }: DayDividerProps) => {
  return (
    <div className="flex justify-center items-center my-4">
      <div className="px-4 py-1 bg-gray-200 text-xs rounded-full text-gray-600">{date}</div>
    </div>
  );
};

export default DayDivider;
