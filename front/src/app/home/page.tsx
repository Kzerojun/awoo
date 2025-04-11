import Header from "./components/Header";
import HomeContent from "../home/components/HomeContent";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {" "}
      <Header />
      <div className="p-4 pt-15 space-y-4">
        <HomeContent />
      </div>
    </div>
  );
}
