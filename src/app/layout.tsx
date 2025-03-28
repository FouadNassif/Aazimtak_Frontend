import type { Metadata } from "next";
import { Inter, Source_Code_Pro } from "next/font/google";
import "./globals.css";
import "./main.css";
import AuthProvider from "@/context/AuthProvider";
import { checkAuth } from "@/actions/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the styles globally
import { ThemeContextProvider } from "@/context/theme-context"; // Import the ThemeContextProvider

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
      <body className={`${inter.variable} ${sourceCodePro.variable}`}>
        <AuthProvider isAuth={authenticated} user={user}>
          <ThemeContextProvider>
            {children}
          </ThemeContextProvider>
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
