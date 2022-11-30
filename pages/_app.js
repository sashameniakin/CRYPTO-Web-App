import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";

import {useRouter} from "next/router";

function MyApp({Component, pageProps}) {
  const router = useRouter();
  const {asPath} = router;
  console.log(asPath);

  if (asPath === "/login" || asPath === "/") {
    return (
      <>
        <GlobalStyles />

        <Component {...pageProps} />
      </>
    );
  } else {
    return (
      <>
        <GlobalStyles />

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    );
  }
}
export default MyApp;
