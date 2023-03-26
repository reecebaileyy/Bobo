import '@/styles/globals.css'
import '@aws-amplify/ui-react'
import { AmplifyProvider } from '@aws-amplify/ui-react'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'

export default function App({ Component, pageProps }) {

  const chains = [goerli]
  const projectId = 'e701565bb8066da9dc03e29a0d3d9274'

  const { provider } = configureChains(chains, [w3mProvider({ projectId })])
  const wagmiClient = createClient({
    autoConnect: true,
    connectors: w3mConnectors({
      appName: "Bobo",
      projectId,
      version: 1,
      chains
    }),
    provider
  })
  const ethereumClient = new EthereumClient(wagmiClient, chains);

  return (
    <>
      <WagmiConfig client={wagmiClient}>
        <AmplifyProvider>
          <Component {...pageProps} />
        </AmplifyProvider>

      </WagmiConfig>

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-font-family': 'pressStart, cursive',
          '--w3m-accent-color': '#8c8c8c',
          '--w3m-accent-fill-color': '#000000',
          '--w3m-background-color': '#000000',
          '--w3m-logo-image-url': 'https://bobovision.vercel.app/assets/spinhead.gif',
          '--w3m-text-big-bold-size': '15px',
          '--w3m-text-small-regular-size': '.6rem',
          '--w3m-text-xsmall-bold-size': '.4rem',
          '--w3m-text-xsmall-regular-size': '.5rem',
          '--w3m-font-weight': '400',
        }}
      />
    </>

  )
}
