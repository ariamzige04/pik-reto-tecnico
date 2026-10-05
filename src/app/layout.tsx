import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'PIK | Reto técnico',
  description: 'Flujos de alta de negocio y reservación de citas.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}