import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Food Lore',
  description: 'A cozy recipe discovery experience for everyday cooks.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
