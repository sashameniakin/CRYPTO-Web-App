import Navbar from "./Navbar";
import Header from "./Header";

export default function Layout({children}) {
  return (
    <>
      <Header />
      <main>{children}</main>

      <Navbar />
    </>
  );
}
