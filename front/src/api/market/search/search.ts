import axiosInstance from "@/api/axiosInstance";

// 중고 물품 검색 API
export const searchUsedProducts = async (keyword: string) => {
  try {
    const response = await axiosInstance.get("/used-products/search", {
      params: { keyword },
    });
    return response.data;
  } catch (error) {
    console.error("중고 물품 검색 중 오류 발생:", error);
    throw error;
  }
};
