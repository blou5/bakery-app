import {DateOnly} from '../shared/utils/date-only';

export interface UnsoldProductInterface{
  unsoldId : number;
  logId: number;
  productId:number;
  productName:string;
  quantityUnsold:number;
  unitCost: number;
  logDate: DateOnly;
}

