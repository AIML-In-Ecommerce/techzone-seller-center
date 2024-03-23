import type { Metadata } from "next";
import "../globals.css";
// import { Inter } from "next/font/google";

// import { AuthProvider } from "@/context/AuthContext";
// import StyledComponentsRegistry from "../../../lib/AntdRegistry";
import Navbar from "@/component/Navbar";
import Sidebar from "@/component/Sidebar";
import { NextIntlClientProvider, useMessages } from "next-intl";
import { ReactNode } from "react";
import { Content } from "antd/es/layout/layout";
import SidebarContentReactiveLayout from "@/component/SidebarContentReactiveLayout";

// import UserLayout from "@/component/UserLayout";

interface RootLayoutProps {
  children: ReactNode;
  params: { locale: string };
}

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techzone seller",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {


  const messages = useMessages();

  return (
    <html lang={"en"}>
      {/* <body className={inter.className}> */}
      <body className="w-full">
        <NextIntlClientProvider locale={locale} messages={messages}>
          {/* <AuthProvider> */}
          {/* <UserLayout children={children} locale={locale} /> */}
          {/* <UserLayout locale={locale}>{children}</UserLayout> */}
          {/* </AuthProvider> */}
          <div className=" w-full bg-cover bg-slate-50 min-h-screen overflow-hidden ">
            <div className="fixed w-full ">
              {" "}
              <Navbar />
            </div>
            <div className="flex mt-16">
              <SidebarContentReactiveLayout>
                {children}
              </SidebarContentReactiveLayout>
            </div>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
