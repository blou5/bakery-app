import {DateOnly} from '../../shared/utils/date-only';

export interface ProductionCreateInterface{
  logId:number;
  productId:number;
  quantityProduced:number;
  productionDate:DateOnly;
}
