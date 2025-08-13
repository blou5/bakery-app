import {DailyCashLogInterface} from '../daily-cash-log.model';

export interface WithdrawCreateModel {
  log: DailyCashLogInterface;
  amount: number;
  reason: string;
  date: Date;
  person: string;
  notes: string;
}
