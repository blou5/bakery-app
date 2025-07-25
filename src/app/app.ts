import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {BakeryNavBar} from './shared/components/bakery-nav-bar/bakery-nav-bar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, BakeryNavBar],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css'
})

export class App {
  protected title = 'bakery-app';
}
