import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";

export default function Header() {
  return (
    <header className="sticky top-0 bg-purple-500 p-4 shadow-md z-50">
      <div className="relative flex items-center justify-center max-w-7xl mx-auto min-h-[64px]">
        <div className="absolute left-0 text-3xl font-extrabold text-white drop-shadow-md">
          Braintastic
        </div>
        <DesktopNavbar />

        <div className="absolute right-0">
          <MobileNavbar />
        </div>
      </div>
    </header>
  );
}


