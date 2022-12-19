import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {CMProvider} from "../context/context";
import Router, {useRouter} from "next/router";
import PopupMM from "../components/Popup_mm";
import {useGlobalState} from "../state";
import {ActivitiesProvider} from "../context/context";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

function MyApp({Component, pageProps}) {
  const {asPath} = useRouter();
  const [openPopup] = useGlobalState("openMMPopup");

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <>
      <GlobalStyles />
      {asPath === "/login" || asPath === "/" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <CMProvider>
            <ActivitiesProvider>
              <PopupMM trigger={openPopup}></PopupMM>
              <Component {...pageProps} />
            </ActivitiesProvider>
          </CMProvider>
        </Layout>
      )}
    </>
  );
}
export default MyApp;
