import {DailyCashLogInterface} from './daily-cash-log.model';

export interface WithdrawModel {
  withdrawalId:number;
  log: DailyCashLogInterface;
  amount: number;
  reason: string;
  date: Date;
  person: string;
  notes: string;
}
