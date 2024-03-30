import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SessionComponent from "@/components/oauth2/session-component";
import LayoutComponent from "@/components/layout/folder-layout";
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/utils/common/oauth2-option'
import { redirect } from "next/navigation";
import { ToastContainer } from "react-toastify";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Notty | Ứng dụng ghi chú cá nhân",
  description: "Notty là ứng dụng ghi chú cá nhân giúp bạn ghi chú mọi lúc mọi nơi",
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {

  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect('/api/auth/signin');
  }
  return (
    <SessionComponent session={session}>
        <body className={inter.className + ' h-full'}>
          <LayoutComponent>
            {children}
          </LayoutComponent>   
          <ToastContainer />
      
        </body>
      </SessionComponent>
  );
}
