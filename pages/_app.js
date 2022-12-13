import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";
import {useRouter} from "next/router";
import {publicProvider} from "wagmi/providers/public";
import {SessionProvider} from "next-auth/react";
import {createClient, configureChains, defaultChains, WagmiConfig} from "wagmi";
import Popup from "../components/Popup_mmbalance";
import {useGlobalState} from "../state";
import {ActivityProvider} from "../context/context";
/* import {getDefaultProvider} from "ethers"; */

const {provider, webSocketProvider} = configureChains(defaultChains, [
  publicProvider(),
]);

const client = createClient({
  provider,
  webSocketProvider,
  autoConnect: true,
});

function MyApp({Component, pageProps}) {
  const {asPath} = useRouter();
  const [buttonPopup] = useGlobalState("openMMPopup");

  return (
    <>
      <GlobalStyles />
      {asPath === "/login" || asPath === "/" ? (
        <WagmiConfig client={client}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <Component {...pageProps} />
          </SessionProvider>
        </WagmiConfig>
      ) : (
        <Layout>
          <ActivityProvider>
            <CMProvider>
              <WagmiConfig client={client}>
                <SessionProvider
                  session={pageProps.session}
                  refetchInterval={0}
                >
                  <Popup trigger={buttonPopup}></Popup>
                  <Component {...pageProps} />
                </SessionProvider>
              </WagmiConfig>
            </CMProvider>
          </ActivityProvider>
        </Layout>
      )}
    </>
  );
}
export default MyApp;
