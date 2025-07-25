import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import {DailyCashLog} from '../../../components/daily-cash-log/daily-cash-log';
import {Withdrawals} from '../../../components/withdrawals/withdrawals';
import {ChangeReserve} from '../../../components/change-reserve/change-reserve';
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
    Withdrawals,
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
