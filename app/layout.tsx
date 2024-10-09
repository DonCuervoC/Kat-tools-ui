// app/layout.tsx
import { ReactNode } from 'react';
import "./globals.css";
import { rubik } from '@/ui/fonts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Metadata } from 'next';

interface LayoutProps {
  children: ReactNode;
  types?: any;
}

export const metadata: Metadata = {
  title: "Office tools",
  description: "Kit with office tools to make the job easier",
};


// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
export default function RootLayout({ children, types }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
