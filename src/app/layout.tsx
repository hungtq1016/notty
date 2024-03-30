import type { Metadata } from "next";
import "./globals.css";
import 'react-toastify/dist/ReactToastify.css';

export const metadata: Metadata = {
  title: "Notty | Ứng dụng ghi chú cá nhân",
  description: "Notty là ứng dụng ghi chú cá nhân giúp bạn ghi chú mọi lúc mọi nơi",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {


  return (
    <html lang="en" className="h-full bg-white">
      {children}
    </html>
  );
}
