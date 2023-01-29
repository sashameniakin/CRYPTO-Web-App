import Layout from "../components/Layout";
import GlobalStyles from "../styles/GlobalStyles";
import {
  CMProvider,
  FundsProvider,
  ArchiveProvider,
  ActivitiesProvider,
  StatesProvider,
  BookmarkedProvider,
  UserProvider,
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

  //TODO: add popupDouble to global styles

  return (
    <SessionProvider session={session}>
      <UserProvider>
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
        {asPath === "/login" || asPath === "/" || asPath === "/register" ? (
          <StatesProvider>
            <Component {...pageProps} />
          </StatesProvider>
        ) : (
          <StatesProvider>
            <Layout>
              <CMProvider>
                <BookmarkedProvider>
                  <ActivitiesProvider>
                    <FundsProvider>
                      <ArchiveProvider>
                        <PopupMM trigger={openPopup} />
                        <Component {...pageProps} />
                      </ArchiveProvider>
                    </FundsProvider>
                  </ActivitiesProvider>
                </BookmarkedProvider>
              </CMProvider>
            </Layout>
          </StatesProvider>
        )}
      </UserProvider>
    </SessionProvider>
  );
}
export default MyApp;
