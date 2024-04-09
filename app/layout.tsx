"use client";
import "@rainbow-me/rainbowkit/styles.css";

import BlockchainProvider from "./BlockchainProvider";
// import WalletHandler from "@app/context/WalletHandler";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html >
      <head>
        <title>ICHICHAIN</title>
      </head>
      <body className="m-0 flex h-full flex-col">
        <BlockchainProvider>
          {/* <WalletHandler> */}
            <main className="w-full bg-slate-950 text-slate-100">
              {children}
            </main>
          {/* </WalletHandler> */}
        </BlockchainProvider>
      </body>
    </html>
  );
}
