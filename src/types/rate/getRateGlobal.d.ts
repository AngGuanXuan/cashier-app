export type RateGlobalValues = {
  id: number;
  mode: string;
  Rate: {
    id: number;
    name: string;
    ratebefore5: string;
    rateafter5: string;
  }
  totalTableSales: string;
  totalFnBSales: string;
  TotalDiscount: string;
  totalDaySales: string;
  createdAt: Date;
  updatedAt: Date;
}