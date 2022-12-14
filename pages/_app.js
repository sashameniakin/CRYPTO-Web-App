import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";
import {useRouter} from "next/router";
import PopupMM from "../components/Popup_mm";
import {useGlobalState} from "../state";

function MyApp({Component, pageProps}) {
  const {asPath} = useRouter();
  const [openPopup] = useGlobalState("openMMPopup");

  return (
    <>
      <GlobalStyles />
      {asPath === "/login" || asPath === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <CMProvider>
            <PopupMM trigger={openPopup}></PopupMM>
            <Component {...pageProps} />
          </CMProvider>
        </Layout>
      )}
    </>
  );
}
export default MyApp;
