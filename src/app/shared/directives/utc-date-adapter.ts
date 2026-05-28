import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class UtcDateAdapter extends NativeDateAdapter {
  override createDate(year: number, month: number, date: number): Date {
    const result = new Date(year, month, date);
    if (result.getFullYear() !== year || result.getMonth() !== month || result.getDate() !== date) {
      return new Date(NaN);
    }
    return result;
  }

  override today(): Date {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const match = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
      if (match) {
        const year = Number(match[1]);
        const month = Number(match[2]) - 1;
        const date = Number(match[3]);
        return this.createDate(year, month, date);
      }
    }

    return value ? this.createDate(value.getFullYear(), value.getMonth(), value.getDate()) : null;
  }
}
