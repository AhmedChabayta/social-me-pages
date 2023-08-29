import { Navbar, Sidebar } from "@src/components";
import { Montserrat } from "next/font/google";
import { Provider } from "@src/components";
import { ProfileQuickView } from "@src/components/ProfileQuickView";

const font = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`h-screen overflow-hidden`}>
      <Navbar />
      <div className="flex h-full">
        <div className="absolute z-50 lg:relative">
          <Sidebar />
        </div>
        <div className="h-screen flex-1 overflow-y-scroll pb-20 scrollbar-hide">
          {children}
        </div>
        <div className="h-full p-3">
          <ProfileQuickView />
        </div>
      </div>
    </div>
  );
};
export default Layout;
