export interface DailyCashLogCreateInterface{
  openingCash: number;
  notes: string | undefined;
  holidayType: string | null;
  logDate: Date;
  closingCash: number;
  weather: string | undefined;
  holiday: boolean
}
