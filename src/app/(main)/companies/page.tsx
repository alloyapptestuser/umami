import type { Metadata } from 'next';
import { CompaniesPage } from './CompaniesPage';

export default function () {
  return <CompaniesPage />;
}

export const metadata: Metadata = {
  title: 'Companies',
};
