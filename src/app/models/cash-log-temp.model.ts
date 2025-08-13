export interface CashLog {
  id: number;
  date: string;           // e.g. '2025-07-28'
  expectedCash: number;   // e.g. 1500
  withdrawn: number | null;      // e.g. 1500
}
