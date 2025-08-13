export interface ChangeReserveLogInterface {
  reserveLogId: number;
  denomination: number;
  quantity: number ;
  amount: number;
  reserveType:string;
  status:string;
  createdAt:Date;
  statusChangedAt:Date | null;
}
