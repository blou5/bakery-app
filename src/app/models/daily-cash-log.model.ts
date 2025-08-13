export interface DailyCashLogInterface {
  logId: number;
  openingCash: number;
  notes: string ;
  holidayType: string | null;
  logDate: Date;
  closingCash: number;
  weather: string ;
  holiday: boolean;
  cashWithdrawn: number;
  expectedCash: number | null;
  status: string;
}
