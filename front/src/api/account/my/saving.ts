import axiosInstance from "@/api/axiosInstance";

// API 응답 형태
interface ApiResponse<T> {
  success: boolean;
  response: T;
  error: any;
}
// 적금 응답
interface SavingResponse {
  bankCode: string;
  bankName: string;
  userName: string;
  accountNo: string;
  accountName: string;
  accountDescription: string;
  withdrawalBankCode: string;
  withdrawalBankName: string;
  withdrawalAccountNo: string;
  subscriptionPeriod: string;
  depositBalance: string;
  interestRate: string;
  installmentNumber: string;
  totalBalance: string;
  accountCreateDate: string;
  accountExpiryDate: string;
}
