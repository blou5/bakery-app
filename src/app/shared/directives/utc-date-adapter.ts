// src/app/shared/utc-date-adapter.ts
import { Injectable } from '@angular/core';
import { NativeDateAdapter } from '@angular/material/core';

@Injectable()
export class UtcDateAdapter extends NativeDateAdapter {
  override createDate(year: number, month: number, date: number): Date {
    // Always create dates at UTC midnight
    return new Date(Date.UTC(year, month, date));
  }

  override deserialize(value: unknown): Date | null {
    if (!value) return null;
    const d = typeof value === 'string' ? new Date(value) : (value as Date);
    // Normalize to UTC midnight of that calendar day
    return new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  }

  // (Optional) ensure ISO strings are UTC midnight
  override toIso8601(date: Date): string {
    const utc = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    return utc.toISOString();
  }
}
