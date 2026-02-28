import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";


const roboto = Roboto({
  subsets: ['latin'], 
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Our Next App Page",
  description: "Welcome to our app page!",
      openGraph: {
        title: `Note Hub`,
        description: "There are some notes for your attention",
        url: `https://notehub.com/`,
        siteName: 'NoteHub',
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/og-meta.jpg',
            width: 1200,
            height: 630,
            alt: "Note Hub",
          },
        ],
        type: 'article',
      },
};


export default function RootLayout({
  children,
  modal,
}: Readonly<{ 
  children: React.ReactNode;
  modal: React.ReactNode;
 }>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <Header />
          <main>
            {children}
            {modal}
          </main>
          <Footer/>
        </TanStackProvider>
      </body>
    </html>
  );
}