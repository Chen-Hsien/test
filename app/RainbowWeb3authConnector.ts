import { CHAIN_NAMESPACES, UX_MODE, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthConnector } from "@web3auth/web3auth-wagmi-connector";
import { Wallet, WalletDetailsParams } from "@rainbow-me/rainbowkit";
import { createConnector as createWagmiConnector } from "wagmi";
import { Web3Auth } from "@web3auth/modal";
const clientId = process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || ""; // get from https://dashboard.web3auth.io

const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.EIP155,
  chainId: "0x13881", // hex of 80001, polygon testnet
  rpcTarget: "https://rpc.ankr.com/polygon_mumbai",
  displayName: "Polygon MATIC Testnet",
  blockExplorerUrl: "https://mumbai.polygonscan.com/",
  ticker: "MATIC",
  tickerName: "MATIC",
  logo: "https://cryptologos.cc/logos/polygon-matic-logo.png",
};

const privateKeyProvider = new EthereumPrivateKeyProvider({
  config: { chainConfig },
});

const web3AuthInstance = new Web3Auth({
  clientId,
  web3AuthNetwork: WEB3AUTH_NETWORK.TESTNET,
  privateKeyProvider,
  uiConfig: {
    mode: "dark",
    useLogoLoader: true,
    logoLight: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    logoDark: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
    defaultLanguage: "en",
    theme: {
      primary: "#768729",
    },
    uxMode: UX_MODE.REDIRECT,
  },
});

export const rainbowWeb3AuthConnector = (): Wallet => ({
  id: "web3auth",
  name: "web3auth",
  rdns: "web3auth",
  iconUrl: "https://web3auth.io/images/web3authlog.png",
  iconBackground: "#fff",
  installed: true,
  downloadUrls: {},
  createConnector: (walletDetails: WalletDetailsParams) =>
    createWagmiConnector((config) => ({
      ...Web3AuthConnector({
        web3AuthInstance,
      })(config),
      ...walletDetails,
    })),
});
