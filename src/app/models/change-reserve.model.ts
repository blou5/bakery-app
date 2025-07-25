import {DailyCashLogInterface} from './daily-cash-log.model';

export interface ChangeReserveLogInterface {
  // reserveLogId:number;
  log: DailyCashLogInterface | undefined;
  amount:number;
  changeDate: Date | undefined;
  reserveType: string | undefined
}
