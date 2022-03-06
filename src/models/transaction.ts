export interface Transaction {
  id: string;
  type: string;
  status: string;
  date: string;
  notes: string;
  origin: string;
  originAmount: number;
  originCurrency: string;
  destination: string;
  destinationAmount: number;
  destinationCurrency: string;
  usdEquivalentAmount: number;
  outstandingLoanAmount: number;
}
