import Header from "../components/Header/Header";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <main className="main">
      <Header />
      <Outlet />
    </main>
  );
};

export default MainLayout;
