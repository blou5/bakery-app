import { Routes } from '@angular/router';
import {ChangeReserve} from './components/reserve/change-reserve/change-reserve';
import {DailyCashLog} from './components/cash-log/daily-cash-log/daily-cash-log';
import {Expenses} from './components/expense/expenses/expenses';
import {Production} from './components/products/production/production';
import {UnsuldProducts} from './components/unsold-products/unsuld-products/unsuld-products';
import {WithdrawalsPop} from './components/withdrawals/withdrawals-pop/withdrawals-pop.component';
import {CashLog} from './components/cash-log/cash-log/cash-log';
import {WithdrawalsTable} from './components/withdrawals/withdrawals-table/withdrawals-table';

export const routes: Routes = [
  { path: '', redirectTo: 'daily-cash-log', pathMatch: 'full' },
  { path: 'change-reserve', component: ChangeReserve },
  { path: 'daily-cash-log', component: CashLog },
  { path: 'expenses', component: Expenses },
  { path: 'production', component: Production },
  { path: 'unsold-products', component: UnsuldProducts },
  { path: 'withdrawal', component: WithdrawalsTable },
  { path: '**', redirectTo: 'daily-cash-log' }
];
