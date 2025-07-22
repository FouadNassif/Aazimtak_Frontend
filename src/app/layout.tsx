export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";

import "./globals.css";
import "./main.css";
import AuthProvider from "@/context/AuthProvider";
import { checkAuth } from "@/actions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
});

export const metadata: Metadata = {
  title: "Aazimtak",
  description: "Wedding Management System",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { authenticated, user } = await checkAuth();

  return (
    <html lang="en">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap"
          rel="stylesheet"
        />
      </Head>

      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <AuthProvider isAuth={authenticated} user={user}>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss={false}
            draggable
            pauseOnHover={false}
            theme="dark"
          />
        </AuthProvider>
      </body>
    </html>
  );
}
