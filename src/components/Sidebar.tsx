import { Home, Search, Compass, Settings } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import avatarImg from "@/assets/avatar.jpg";

const navItems = [
  { icon: Home, label: "HOME", path: "/" },
  { icon: Search, label: "SEARCH", path: "/search" },
  { icon: Compass, label: "DISCOVER", path: "/discover" },
  { icon: Settings, label: "SETTINGS", path: "/settings" },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="w-20 lg:w-56 bg-surface-dark border-r border-border flex flex-col items-center lg:items-stretch py-6 px-2 lg:px-4 gap-2 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-6 px-2">
        <span className="text-primary font-display text-lg font-bold neon-glow-green hidden lg:block">HEY BUDDY</span>
        <span className="text-primary font-display text-lg font-bold neon-glow-green lg:hidden">HB</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-col gap-1 flex-1">
        {navItems.map((item) => {
          const active = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-sm font-body font-medium ${
                active
                  ? "bg-primary/10 text-primary neon-border-green border"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground border border-transparent"
              }`}
            >
              <item.icon size={20} />
              <span className="hidden lg:block">{item.label}</span>
              {item.badge && (
                <span className="ml-auto hidden lg:flex w-5 h-5 rounded-full bg-accent text-accent-foreground text-xs items-center justify-center font-bold">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="flex items-center gap-3 px-2 py-3 mt-auto">
        <img src={avatarImg} alt="Profile" className="w-9 h-9 rounded-full object-cover border-2 border-primary/40" />
        <div className="hidden lg:block">
          <p className="text-sm font-semibold font-body text-foreground">CYBER_DREAMS</p>
          <p className="text-xs text-muted-foreground">Online</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
