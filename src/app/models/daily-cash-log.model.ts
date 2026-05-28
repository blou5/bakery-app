import {DateOnly} from '../shared/utils/date-only';

export interface DailyCashLogInterface {
  logId: number;
  openingCash: number | null;
  notes: string | null;
  holidayType: string | null;
  logDate: DateOnly;
  closingCash: number | null;
  weather: string | null;
  holiday: boolean | null;
  cashWithdrawn: number | null;
  expectedCash: number | null;
  status: string | null;
}
