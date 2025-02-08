import localFont from "next/font/local";
import "./globals.css";
import {
  TmuxLine
} from "@/features/tmux";

const HackNerdFontMono = localFont({
  src: "./fonts/HackNerdFontMono-Regular.woff",
  variable: "--font-hack",
  weight: "100 900",
})
const HackNerdFontMonoBold = localFont({
  src: "./fonts/HackNerdFont-Bold.woff",
  variable: "--font-hack-bold",
  weight: "100 900",
})

export const metadata = {
  title: "Karl Løvendahl",
  description: "Portfolio of Web Developer Karl Løvendahl",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`
          ${HackNerdFontMono.variable} 
          ${HackNerdFontMonoBold.variable} 
          font-hack antialiased h-screen flex flex-col
          `} >
        <TmuxLine />
        <div className="flex flex-grow overflow-hidden">
          {children}
        </div>
      </body>
    </html>
  );
}
