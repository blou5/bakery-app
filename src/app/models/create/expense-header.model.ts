import {DailyCashLogInterface} from '../daily-cash-log.model';
import {ExpenseItemInterface} from './expense-item.model';

export interface ExpenseHeaderInterface{
  expenseId:number;
  logId:number | undefined;
  totalPrice:number;
  expenseType:string | undefined;
  notes:string | undefined;
  expenseDate: string | undefined;
  expenseHeaders:ExpenseItemInterface[];
}
