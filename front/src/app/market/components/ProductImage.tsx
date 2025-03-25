import Image from "next/image";

const ProductImage = ({ src }: { src: string }) => {
  return (
    <div className="w-full h-[300px] relative overflow-hidden  bg-gray-100">
      <Image src={src} alt="상품 이미지" fill className="object-cover object-top" priority />
    </div>
  );
};
export default ProductImage;
