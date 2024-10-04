// // app/layout.tsx
// import type { Metadata } from "next";
// import localFont from "next/font/local";
// import "./globals.css";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });

// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// // Mantener metadata aquí
// export const metadata: Metadata = {
//   title: "tools for office work",
//   description: "This is a simple app for helping people with simple jobs, all in one platform",
// };

// // Layout component to wrap the children
// interface LayoutProps {
//   children: React.ReactNode;
//   types?: string; // 'types' es opcional
// }

// export default function RootLayout({ children, types }: LayoutProps) {
//   return (
//     <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//         data-types={types} // se puede usar 'types' aquí
//       >
//         {children}
//       </body>
//     </html>
//   );
// }


// app/layout.tsx
// import "./globals.css";
// import { rubik} from '@/ui/fonts';

// interface LayoutProps {
//   children: React.ReactNode;
// }

// export default function RootLayout({ children }: LayoutProps) {
//   return (
//     <html lang="es">
//       <body  className={`${rubik.className}`}>
//         {children}
//       </body>
//     </html>
//   );
// }

// app/layout.tsx
// export const metadata = {
//   title: "tools for office work",
//   description: "This is a simple app for helping people with simple jobs, all in one platform",
// };

// app/layout.tsx
import { ReactNode } from 'react';
import "./globals.css";
import { rubik } from '@/ui/fonts';
import { NextUIProvider } from '@nextui-org/react';

interface LayoutProps {
  children: ReactNode;

}

const RootLayout = ({ children }: LayoutProps) => {
  return (
    <html lang="es">
      {/* <NextUIProvider> */}
      <body className={`${rubik.className}`}>
      <NextUIProvider> 
        {children}
        </NextUIProvider> 
      </body>
      {/* </NextUIProvider> */}
    </html>
  );
};

export default RootLayout;

