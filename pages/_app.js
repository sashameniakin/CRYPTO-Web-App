import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {
  CMProvider,
  FundsProvider,
  ArchiveProvider,
  ActivitiesProvider,
  StatesProvider,
} from "../context/context";
import Router, {useRouter} from "next/router";
import PopupMM from "../components/Popup_mm";
import {useGlobalState} from "../state";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import {SessionProvider} from "next-auth/react";

function MyApp({Component, pageProps: {session, ...pageProps}}) {
  const {asPath} = useRouter();
  const [openPopup] = useGlobalState("openMMPopup");
  const [openForm] = useGlobalState("openForm");
  const [openWellDone] = useGlobalState("openPopupWellDone");
  const [openArchive] = useGlobalState("openPopupMongo");
  const [openBookmark] = useGlobalState("openPopup");
  const [openPopupSended] = useGlobalState("openPopupSended");

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <SessionProvider session={session}>
      <GlobalStyles
        active={
          openForm ||
          openArchive ||
          openWellDone ||
          openBookmark ||
          openPopup ||
          openPopupSended
        }
      />
      {asPath === "/login" || asPath === "/" ? (
        <Component {...pageProps} />
      ) : (
        <StatesProvider>
          <Layout>
            <CMProvider>
              <ActivitiesProvider>
                <FundsProvider>
                  <ArchiveProvider>
                    <PopupMM trigger={openPopup} />
                    <Component {...pageProps} />
                  </ArchiveProvider>
                </FundsProvider>
              </ActivitiesProvider>
            </CMProvider>
          </Layout>
        </StatesProvider>
      )}
    </SessionProvider>
  );
}
export default MyApp;
