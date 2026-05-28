import {DateOnly} from '../shared/utils/date-only';

export interface ProductionInterface{
  productionId : number;
  productName: string;
  productionDate: DateOnly;
  quantityProduced: number;
  logId : number;
  productId:number;
}
