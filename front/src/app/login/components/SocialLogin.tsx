import Button from "@/common/ui/Button";
import kakao from "../../../../public/icons/socialLogin/Kakaotalk.svg";
import naver from "../../../../public/icons/socialLogin/Naver.svg";

const SocialLogin = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Button
        text="카카오 로그인"
        textSize="verySmall"
        fontBold="bold"
        img={kakao}
        backgroundColor="kakao"
        fontColor="kakao-font"
        onClick={() => alert("카카오로그인 연동")}
      />

      <Button
        text="네이버 로그인"
        textSize="verySmall"
        fontBold="bold"
        img={naver}
        backgroundColor="naver"
        fontColor="custom-white"
        onClick={() => alert("네이버로그인 연동")}
      />
    </div>
  );
};

export default SocialLogin;
