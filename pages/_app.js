import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";

function MyApp({Component, pageProps}) {
  return (
    <>
      <GlobalStyles />
      <Layout>
        <CMProvider>
          <Component {...pageProps} />
        </CMProvider>
      </Layout>
    </>
  );
}

export default MyApp;
