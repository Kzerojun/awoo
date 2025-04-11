interface DepositContent {
  bankCode: string;
  bankName: string;
  userName: string;
  accountNo: string;
  accountName: string;
  accountTypeCode: string;
  accountTypeName: string;
  accountCreatedDate: string;
  accountExpiryDate: string;
  dailyTransferLimit: string;
  oneTimeTransferLimit: string;
  accountBalance: string;
  lastTransactionDate: string;
  currency: string;
}

export const DepositContent: DepositContent[] = [
  {
    bankCode: "999",
    bankName: "싸피은행",
    userName: "string",
    accountNo: "9994364453832581",
    accountName: "Awoo 수시입출금 테스트 상품",
    accountTypeCode: "1",
    accountTypeName: "수시입출금",
    accountCreatedDate: "20250325",
    accountExpiryDate: "20300325",
    dailyTransferLimit: "500000000",
    oneTimeTransferLimit: "100000000",
    accountBalance: "0",
    lastTransactionDate: "",
    currency: "KRW",
  },
];

interface DepositDetail {
  transactionUniqueNo: string;
  transactionDate: string;
  transactionTime: string;
  transactionType: string;
  transactionTypeName: string;
  transactionAccountNo: string;
  transactionBalance: string;
  transactionAfterBalance: string;
  transactionSummary: string;
  transactionMemo: string;
}

export const DepositDetail: DepositDetail[] = [
  {
    transactionUniqueNo: "1",
    transactionDate: "20250327",
    transactionTime: "131633",
    transactionType: "1", // 입금
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "25000",
    transactionAfterBalance: "237000",
    transactionSummary: "강은수",
    transactionMemo: "저축한다",
  },
  {
    transactionUniqueNo: "2",
    transactionDate: "20250326",
    transactionTime: "200306",
    transactionType: "2",
    transactionTypeName: "출금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "100000",
    transactionAfterBalance: "212000",
    transactionSummary: "김덕진",
    transactionMemo: "용돈",
  },
  {
    transactionUniqueNo: "3",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
  {
    transactionUniqueNo: "4",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
  {
    transactionUniqueNo: "5",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
  {
    transactionUniqueNo: "6",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
  {
    transactionUniqueNo: "7",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
  {
    transactionUniqueNo: "8",
    transactionDate: "20250325",
    transactionTime: "180655",
    transactionType: "1",
    transactionTypeName: "입금",
    transactionAccountNo: "1111111111111111",
    transactionBalance: "5000",
    transactionAfterBalance: "307000",
    transactionSummary: "김덕진",
    transactionMemo: "은수 용돈",
  },
];
