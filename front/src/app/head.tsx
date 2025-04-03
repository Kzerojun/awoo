export const metadata = {
  title: "AwOO",
  description: "AwOO - 강아지 라이프 플랫폼",
  manifest: "/manifest.json",
};
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#ffffff",
};
export default function Head() {
  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
      <link
        href="https://hangeul.pstatic.net/hangeul_static/css/nanum-square-neo.css"
        rel="stylesheet"
      />
    </>
  );
}
