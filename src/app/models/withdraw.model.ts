import {DateOnly} from '../shared/utils/date-only';

export interface WithdrawModel {
  withdrawalId:number;
  logId: number;
  amount: number;
  reason: string;
  date: DateOnly;
  person: string;
  notes: string;
}
