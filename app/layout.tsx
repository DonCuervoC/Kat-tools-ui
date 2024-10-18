// app/layout.tsx
import "./globals.css";
import { rubik } from '@/ui/fonts';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Office tools(cat)",
  description: "Kit with office tools to make the job easier",
};

export default function RootLayout({ children,}: Readonly<{children: React.ReactNode;}>) {
  return (
    <html lang="en">
      <body className={`${rubik.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}


// export default function RootLayout({
//   children,
//   types,
//   // analytics,
// }: {
//   children: React.ReactNode
//   // analytics: React.ReactNode
//   types: React.ReactNode
// }) {
//   return (
//     <>
//       <html lang="en">
//         <body className={`${rubik.className} antialiased`}>
//           {children}
//           {types}
//           {/* {analytics} */}
//         </body>
//       </html>
//     </>
//   )
// }