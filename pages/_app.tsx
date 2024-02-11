/* eslint-disable react/no-children-prop */
import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { getDefaultWallets, RainbowKitProvider, darkTheme, lightTheme, midnightTheme } from '@rainbow-me/rainbowkit';
import type { AppProps } from 'next/app';
import { configureChains, createClient, WagmiConfig } from 'wagmi';
import { arbitrum, goerli, mainnet, optimism, polygon } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider, webSocketProvider } = configureChains(
  [
    mainnet,
    polygon,
    optimism,
    arbitrum,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli] : []),
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'RainbowKit App',
  projectId: 'YOUR_PROJECT_ID',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        modalSize="wide"
        chains={chains}
        // theme={[
        //   midnightTheme({
        //     accentColor: '#7b3fe4',
        //     accentColorForeground: 'white',
        //     borderRadius: 'small',
        //     fontStack: 'system',
        //     overlayBlur: 'small',
        //   }),
        //   lightTheme({
        //     accentColor: '#7b3fe4',
        //     accentColorForeground: 'white',
        //     borderRadius: 'small',
        //     fontStack: 'system',
        //     overlayBlur: 'small',
        //   }),
        //   darkTheme({
        //     accentColor: '#7b3fe4',
        //     accentColorForeground: 'white',
        //     borderRadius: 'small',
        //     // borderRadius: 'medium',
        //     fontStack: 'system',
        //     overlayBlur: 'small',
        //   })
        // ]}
        theme={{ 
          lightMode: lightTheme(),
          darkMode: darkTheme(),
        }}
        showRecentTransactions={true}
      >
        <Component {...pageProps} />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;



