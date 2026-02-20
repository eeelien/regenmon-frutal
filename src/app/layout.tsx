import type { Metadata } from 'next';
import { Press_Start_2P } from 'next/font/google';
import AuthProvider from '@/components/auth/AuthProvider';
import './globals.css';

const pressStart = Press_Start_2P({ weight: '400', subsets: ['latin'], display: 'swap' });

export const metadata: Metadata = {
  title: 'Regenmon 🦕 - Tu mascota virtual',
  description: 'Crea y cuida tu Regenmon, una mascota virtual retro',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link href="https://unpkg.com/nes.css@2.3.0/css/nes.min.css" rel="stylesheet" />
      </head>
      <body className={pressStart.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
