import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";
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
          <CMProvider>
            <Component {...pageProps} />
          </CMProvider>
        </Layout>
      )}
    </>
  );
}

export default MyApp;
