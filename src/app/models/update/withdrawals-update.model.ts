export interface WithdrawalsUpdateModel{
  withdrawalId:number;
  logId:number;
  amount:number;
  reason:string;
  date:Date;
  person:string;
  notes:string;
}
