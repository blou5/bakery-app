import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {DailyCashLog} from '../../../components/cash-log/daily-cash-log/daily-cash-log';
import {WithdrawalsPop} from '../../../components/withdrawals/withdrawals-pop/withdrawals-pop.component';
import {ChangeReserve} from '../../../components/reserve/change-reserve/change-reserve';
import {Expenses} from '../../../components/expense/expenses/expenses';
import {Production} from '../../../components/products/production/production';
import {UnsuldProducts} from '../../../components/unsold-products/unsuld-products/unsuld-products';

@Component({
  selector: 'app-bakery-nav-bar',

  templateUrl: './bakery-nav-bar.html',
  standalone: true,
  imports: [
    RouterLink,
    DailyCashLog,
    WithdrawalsPop,
    ChangeReserve,
    Expenses,
    Production,
    UnsuldProducts
  ],
  styleUrl: './bakery-nav-bar.css'
})
export class BakeryNavBar {
  menuOpen = false;

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
