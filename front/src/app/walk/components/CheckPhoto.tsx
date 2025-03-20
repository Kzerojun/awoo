import { useRouter } from "next/navigation";

import Button from "@/common/ui/Button";
import paw from "../../../../public/icons/white_paw.svg";

const CheckPhoto = () => {
  const route = useRouter();
  const goToWalk = () => {
    route.push("/walk/start/walking");
  };
  return (
    <>
      <div>사진 확인 페이지</div>
      <Button text="산책 시작" onClick={goToWalk} img={paw} />
    </>
  );
};

export default CheckPhoto;
