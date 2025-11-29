
import { LucideIcon } from 'lucide-react';

export enum ModuleType {
  DASHBOARD = 'dashboard',
  COMMON = 'common',      // Common Functions Group
  EVENTS = 'events',      // Accounting Events
  VOUCHER = 'voucher',    // Voucher Audit/Entry
  LEDGER = 'ledger',      // General Ledger & Trial Balance
  REPORTS = 'reports',    // Financial Reports
  ASSETS = 'assets',
  TREASURY = 'treasury'
}

export interface SubItem {
  label: string;
  targetModule?: ModuleType; // Optional target for navigation
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  module: ModuleType;
  subItems?: SubItem[];
}

export interface VoucherEntry {
  id: string;
  date: string;
  description: string;
  accountCode: string;
  accountName: string;
  debit: number;
  credit: number;
  status: 'Posted' | 'Draft' | 'Review';
}

export interface MetricCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
  colorClass: string;
}
