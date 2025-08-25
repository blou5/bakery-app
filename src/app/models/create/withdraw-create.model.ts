import {DailyCashLogInterface} from '../daily-cash-log.model';

export interface WithdrawCreateModel {
  log: number;
  amount: number;
  reason: string;
  date: Date;
  person: string;
  notes: string;
}
