import { Home, Search, Compass, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Search", path: "/search" },
  { icon: Compass, label: "Discover", path: "/discover" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

const MobileNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-surface-dark border-t border-border flex items-center justify-around py-2 px-1">
      {navItems.map((item) => {
        const active = location.pathname === item.path;
        return (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-colors ${
              active ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-body">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};

export default MobileNav;
