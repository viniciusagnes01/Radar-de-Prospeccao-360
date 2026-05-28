import './globals.css';
import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Radar de Prospecção 360 | V4',
  description: 'Busca empresas por cidade e nicho, diagnostica presença digital e prioriza oportunidades comerciais.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
