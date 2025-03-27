export interface SavingAccountInfo {
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

export interface PaymentInfoInterface {
  depositInstallment: string;
  paymentBalance: string;
  paymentDate: string;
  paymentTime: string;
  status: string;
  failureReason: string;
}

export interface SavingDetail {
  bankCode: string;
  bankName: string;
  accountNo: string;
  accountName: string;
  interestRate: string;
  depositBalance: string;
  totalBalance: string;
  accountCreateDate: string;
  accountExpiryDate: string;
  paymentInfo: PaymentInfoInterface[];
}
