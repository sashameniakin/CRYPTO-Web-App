import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";

import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {
  const {asPath} = useRouter();

  return (
    <>
      <GlobalStyles />
      {asPath === "/login" || asPath === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </>
  );
}

export default MyApp;
