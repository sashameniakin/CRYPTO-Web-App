import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";
import {useRouter} from "next/router";
import {publicProvider} from "wagmi/providers/public";
import {SessionProvider} from "next-auth/react";
import {createClient, configureChains, defaultChains, WagmiConfig} from "wagmi";

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
          <CMProvider>
            <WagmiConfig client={client}>
              <SessionProvider session={pageProps.session} refetchInterval={0}>
                <Component {...pageProps} />
              </SessionProvider>
            </WagmiConfig>
          </CMProvider>
        </Layout>
      )}
    </>
  );
}
export default MyApp;
