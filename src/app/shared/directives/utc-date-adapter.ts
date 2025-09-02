import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class UtcDateAdapter extends NativeDateAdapter {
  override createDate(year: number, month: number, date: number): Date {
    // Always construct at UTC midnight
    const result = new Date(Date.UTC(year, month, date));
    // Validate
    if (result.getUTCFullYear() !== year || result.getUTCMonth() !== month || result.getUTCDate() !== date) {
      return new Date(NaN);
    }
    return result;
  }

  override today(): Date {
    const now = new Date();
    return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  }

  // Optional: ensure parsing ignores local timezone if you allow text input
  override parse(value: any): Date | null {
    if (typeof value === 'string') {
      const m = value.match(/^(\d{4})-(\d{2})-(\d{2})$/); // "YYYY-MM-DD"
      if (m) {
        const y = +m[1], mm = +m[2] - 1, d = +m[3];
        return new Date(Date.UTC(y, mm, d));
      }
    }
    return value ? new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate())) : null;
  }

  // Render as local-looking date but underlying Date is UTC midnight
  override format(date: Date, displayFormat: Object): string {
    // Use the parent for locale formatting but feed a “fake local” copy
    const localish = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
    return super.format(localish, displayFormat);
  }
}
