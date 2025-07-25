import { Routes } from '@angular/router';
import {ChangeReserve} from './components/change-reserve/change-reserve';
import {DailyCashLog} from './components/daily-cash-log/daily-cash-log';
import {Expenses} from './components/expense/expenses/expenses';
import {Production} from './components/products/production/production';
import {UnsuldProducts} from './components/unsold-products/unsuld-products/unsuld-products';
import {Withdrawals} from './components/withdrawals/withdrawals';

export const routes: Routes = [
  { path: '', redirectTo: 'daily-cash-log', pathMatch: 'full' },
  { path: 'change-reserve', component: ChangeReserve },
  { path: 'daily-cash-log', component: DailyCashLog },
  { path: 'expenses', component: Expenses },
  { path: 'production', component: Production },
  { path: 'unsold-products', component: UnsuldProducts },
  { path: 'withdrawals', component: Withdrawals },
  { path: '**', redirectTo: 'daily-cash-log' }
];
