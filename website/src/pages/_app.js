import '@/styles/globals.css'
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { mainnet, goerli } from 'wagmi/chains'

const chains = [mainnet, goerli]
const projectId = 'e701565bb8066da9dc03e29a0d3d9274'

const { provider } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiClient = createClient({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  provider
})
const ethereumClient = new EthereumClient(wagmiClient, chains)

export default function App({ Component, pageProps }) {
  return(
    <>
      <WagmiConfig client={wagmiClient}>
        <Component {...pageProps} />
      </WagmiConfig>

      <Web3Modal 
        projectId={projectId} 
        ethereumClient={ethereumClient} 
        themeVariables={{
          '--w3m-font-family': 'pressStart, cursive',
          '--w3m-accent-color': '#F5841F'
        }}
        />
    </>
     
  ) 
}
