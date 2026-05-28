import {DateOnly} from '../../shared/utils/date-only';

export interface DailyCashLogCreateInterface{
  openingCash: number;
  notes: string | undefined;
  holidayType: string | null;
  logDate: DateOnly;
  closingCash: number;
  weather: string | undefined;
  holiday: boolean
}
