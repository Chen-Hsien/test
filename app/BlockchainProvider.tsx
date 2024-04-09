"use client";

import { rainbowWallet, metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";
import { rainbowWeb3AuthConnector } from "./RainbowWeb3authConnector";
import {
  getDefaultConfig,
  RainbowKitProvider,
  ConnectButton,
} from "@rainbow-me/rainbowkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { polygon, polygonMumbai } from "viem/chains";
import { http, WagmiProvider } from "wagmi";

const config = getDefaultConfig({
  appName: "ICHICHAIN",
  projectId: "04309ed1007e77d1f119b85205bb779d",
  chains: [polygon, polygonMumbai],
  transports: {
    [polygon.id]: http(),
    [polygonMumbai.id]: http(),
  },
  wallets: [
    {
      groupName: "Recommended",
      wallets: [rainbowWallet, rainbowWeb3AuthConnector, metaMaskWallet],
    },
  ],
});

const queryClient = new QueryClient();

function BlockchainProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <ConnectButton />
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default BlockchainProvider;
