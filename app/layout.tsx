// app/layout.tsx
import { ReactNode } from 'react';
import "./globals.css";
import { rubik } from '@/ui/fonts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Metadata } from 'next';

interface LayoutProps {
  children: ReactNode;
}

export const metadata: Metadata = {
  title: "Office tools",
  description: "Kit with office tools to make the job easier",
};

const RootLayout = ({ children }: Readonly<LayoutProps>) => {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
