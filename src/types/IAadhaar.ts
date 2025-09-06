export interface IAadhaarData {
  aadhaarNumber: string;
  dateOfBirth: string;
  gender: string;
  name: string;
  address: string;
}

export interface IApiResponse {
  success: boolean;
  message: string;
  data: {
    processedData: IAadhaarData,
  }
}