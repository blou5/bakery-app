
export interface ExpenseHeaderUpdate {
  expenseId:number;
  totalPrice:number;
  expenseType:string | undefined;
  notes:string | undefined;
  expenseDate: string | undefined;
}
