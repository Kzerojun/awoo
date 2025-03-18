import { redirect } from "next/navigation";

export default function Home() {
  redirect("/home"); // 앱을 실행하면 자동으로 /home으로 이동
}
