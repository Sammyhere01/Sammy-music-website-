import { Settings as SettingsIcon, Volume2, Bell, Shield, Palette, User, Monitor } from "lucide-react";
import { useState } from "react";

const sections = [
  { icon: User, label: "Account", desc: "Manage your profile and account settings" },
  { icon: Volume2, label: "Audio", desc: "Audio quality, equalizer, and output settings" },
  { icon: Bell, label: "Notifications", desc: "Control notification preferences" },
  { icon: Shield, label: "Privacy", desc: "Privacy and security settings" },
  { icon: Palette, label: "Appearance", desc: "Theme, colors, and display preferences" },
  { icon: Monitor, label: "Streaming", desc: "Streaming quality and data saver options" },
];

const SettingsPage = () => {
  const [active, setActive] = useState("Account");

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      <h1 className="text-2xl font-bold font-display neon-glow-green mb-6">SETTINGS</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-2">
          {sections.map((s) => (
            <button
              key={s.label}
              onClick={() => setActive(s.label)}
              className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all text-left ${
                active === s.label
                  ? "bg-primary/10 border border-primary/30 neon-border-green"
                  : "bg-surface-mid hover:bg-muted border border-transparent"
              }`}
            >
              <s.icon size={20} className={active === s.label ? "text-primary" : "text-muted-foreground"} />
              <div>
                <p className="text-sm font-semibold font-body text-foreground">{s.label}</p>
                <p className="text-xs text-muted-foreground">{s.desc}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-display mb-4">{active}</h2>
          <p className="text-muted-foreground font-body mb-6">
            Settings panel for {active.toLowerCase()} will appear here. Customize your experience!
          </p>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-muted rounded-lg mb-3 animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
