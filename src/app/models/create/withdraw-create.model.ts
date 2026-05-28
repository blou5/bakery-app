import {DateOnly} from '../../shared/utils/date-only';

export interface WithdrawCreateModel {
  log: number;
  amount: number;
  reason: string;
  date: DateOnly;
  person: string;
  notes: string;
}
