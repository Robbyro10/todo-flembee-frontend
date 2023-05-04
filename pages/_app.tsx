import { AuthProvider } from "@/context";
import "@/styles/globals.css";
import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";

const customFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class">
      <AuthProvider>
        <main className={customFont.className}>
          <Component {...pageProps} />
        </main>
      </AuthProvider>
    </ThemeProvider>
  );
}
