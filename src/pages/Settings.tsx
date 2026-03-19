import { Volume2, Bell, Shield, Palette, User, Monitor, ChevronLeft, Check } from "lucide-react";
import { useState } from "react";
import { useSetting } from "@/hooks/use-settings";
import { useToast } from "@/hooks/use-toast";

const sections = [
  { icon: User, label: "Account", desc: "Manage your profile and account settings" },
  { icon: Volume2, label: "Audio", desc: "Audio quality, equalizer, and output settings" },
  { icon: Bell, label: "Notifications", desc: "Control notification preferences" },
  { icon: Shield, label: "Privacy", desc: "Privacy and security settings" },
  { icon: Palette, label: "Appearance", desc: "Theme, colors, and display preferences" },
  { icon: Monitor, label: "Streaming", desc: "Streaming quality and data saver options" },
];

const Toggle = ({ enabled, onToggle, label }: { enabled: boolean; onToggle: () => void; label: string }) => (
  <div className="flex items-center justify-between py-3 border-b border-border gap-4">
    <span className="text-sm font-body text-foreground">{label}</span>
    <button
      onClick={onToggle}
      className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${enabled ? "bg-primary" : "bg-muted"}`}
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-transform ${enabled ? "left-[22px]" : "left-0.5"}`} />
    </button>
  </div>
);

const SelectOption = ({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-border gap-2">
    <span className="text-sm font-body text-foreground">{label}</span>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="bg-muted text-foreground text-sm rounded-lg px-3 py-1.5 border border-border focus:outline-none focus:border-primary w-full sm:w-auto"
    >
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  </div>
);

const AccountSettings = () => {
  const [username, setUsername] = useSetting("username", "CYBER_DREAMS");
  const [email, setEmail] = useSetting("email", "cyber@example.com");
  const [bio, setBio] = useSetting("bio", "Music lover & night owl 🎵");
  const [showPassword, setShowPassword] = useState(false);
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: "✅ Profile saved!", description: "Your account settings have been updated." });
  };

  const handlePasswordChange = () => {
    if (!oldPass || !newPass) {
      toast({ title: "⚠️ Error", description: "Please fill both password fields.", variant: "destructive" });
      return;
    }
    if (newPass.length < 6) {
      toast({ title: "⚠️ Error", description: "New password must be at least 6 characters.", variant: "destructive" });
      return;
    }
    setOldPass("");
    setNewPass("");
    setShowPassword(false);
    toast({ title: "✅ Password changed!", description: "Your password has been updated." });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Username</label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} className="w-full mt-1 bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border focus:outline-none focus:border-primary text-sm font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" className="w-full mt-1 bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border focus:outline-none focus:border-primary text-sm font-body" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Bio</label>
        <textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} className="w-full mt-1 bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border focus:outline-none focus:border-primary text-sm font-body resize-none" />
      </div>
      <div>
        <label className="text-xs text-muted-foreground font-body uppercase tracking-wider">Password</label>
        {!showPassword ? (
          <button onClick={() => setShowPassword(true)} className="w-full mt-1 bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border text-sm font-body text-left hover:border-primary transition-colors">
            Change password...
          </button>
        ) : (
          <div className="space-y-2 mt-1">
            <input value={oldPass} onChange={(e) => setOldPass(e.target.value)} type="password" placeholder="Current password" className="w-full bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border focus:outline-none focus:border-primary text-sm font-body" />
            <input value={newPass} onChange={(e) => setNewPass(e.target.value)} type="password" placeholder="New password (min 6 chars)" className="w-full bg-muted text-foreground rounded-lg px-4 py-2.5 border border-border focus:outline-none focus:border-primary text-sm font-body" />
            <div className="flex gap-2">
              <button onClick={handlePasswordChange} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-bold">Update</button>
              <button onClick={() => { setShowPassword(false); setOldPass(""); setNewPass(""); }} className="px-4 py-2 bg-muted text-foreground rounded-lg text-sm border border-border">Cancel</button>
            </div>
          </div>
        )}
      </div>
      <button onClick={handleSave} className="mt-4 px-6 py-2 bg-primary text-primary-foreground rounded-lg font-display text-sm font-bold hover:bg-primary/90 transition-colors flex items-center gap-2">
        <Check size={16} /> SAVE CHANGES
      </button>
    </div>
  );
};

const AudioSettings = () => {
  const [quality, setQuality] = useSetting("audio_quality", "High (256kbps)");
  const [equalizer, setEqualizer] = useSetting("equalizer", "Flat");
  const [crossfade, setCrossfade] = useSetting("crossfade", true);
  const [normalize, setNormalize] = useSetting("normalize", true);
  const [gapless, setGapless] = useSetting("gapless", false);

  return (
    <div className="space-y-1">
      <SelectOption label="Streaming Quality" value={quality} options={["Low (64kbps)", "Medium (128kbps)", "High (256kbps)", "Ultra (320kbps)"]} onChange={setQuality} />
      <SelectOption label="Equalizer Preset" value={equalizer} options={["Flat", "Bass Boost", "Treble Boost", "Vocal", "Electronic", "Rock", "Jazz"]} onChange={setEqualizer} />
      <Toggle enabled={crossfade} onToggle={() => setCrossfade(!crossfade)} label="Crossfade between tracks" />
      <Toggle enabled={normalize} onToggle={() => setNormalize(!normalize)} label="Normalize volume" />
      <Toggle enabled={gapless} onToggle={() => setGapless(!gapless)} label="Gapless playback" />
    </div>
  );
};

const NotificationSettings = () => {
  const [newReleases, setNewReleases] = useSetting("notif_releases", true);
  const [friendActivity, setFriendActivity] = useSetting("notif_friends", true);
  const [playlistUpdates, setPlaylistUpdates] = useSetting("notif_playlists", false);
  const [emailNotifs, setEmailNotifs] = useSetting("notif_email", true);
  const [pushNotifs, setPushNotifs] = useSetting("notif_push", true);

  return (
    <div className="space-y-1">
      <Toggle enabled={newReleases} onToggle={() => setNewReleases(!newReleases)} label="New releases from followed artists" />
      <Toggle enabled={friendActivity} onToggle={() => setFriendActivity(!friendActivity)} label="Friend activity updates" />
      <Toggle enabled={playlistUpdates} onToggle={() => setPlaylistUpdates(!playlistUpdates)} label="Playlist update notifications" />
      <Toggle enabled={emailNotifs} onToggle={() => setEmailNotifs(!emailNotifs)} label="Email notifications" />
      <Toggle enabled={pushNotifs} onToggle={() => setPushNotifs(!pushNotifs)} label="Push notifications" />
    </div>
  );
};

const PrivacySettings = () => {
  const [privateProfile, setPrivateProfile] = useSetting("priv_profile", false);
  const [showListening, setShowListening] = useSetting("priv_listening", true);
  const [shareData, setShareData] = useSetting("priv_share", false);
  const [twoFactor, setTwoFactor] = useSetting("priv_2fa", false);
  const { toast } = useToast();

  const handleDelete = () => {
    toast({ title: "⚠️ Account deletion", description: "This feature requires backend integration.", variant: "destructive" });
  };

  return (
    <div className="space-y-1">
      <Toggle enabled={privateProfile} onToggle={() => setPrivateProfile(!privateProfile)} label="Private profile" />
      <Toggle enabled={showListening} onToggle={() => setShowListening(!showListening)} label="Show what I'm listening to" />
      <Toggle enabled={shareData} onToggle={() => setShareData(!shareData)} label="Share usage data for personalization" />
      <Toggle enabled={twoFactor} onToggle={() => setTwoFactor(!twoFactor)} label="Two-factor authentication" />
      <div className="pt-4">
        <button onClick={handleDelete} className="px-4 py-2 bg-destructive/10 text-destructive rounded-lg text-sm font-body hover:bg-destructive/20 transition-colors">
          Delete Account
        </button>
      </div>
    </div>
  );
};

const AppearanceSettings = () => {
  const [theme, setTheme] = useSetting("theme", "Dark");
  const [accentColor, setAccentColor] = useSetting("accent_color", "Neon Green");
  const [compactMode, setCompactMode] = useSetting("compact_mode", false);
  const [animations, setAnimations] = useSetting("animations", true);

  return (
    <div className="space-y-1">
      <SelectOption label="Theme" value={theme} options={["Dark", "Light", "System", "OLED Black"]} onChange={setTheme} />
      <SelectOption label="Accent Color" value={accentColor} options={["Neon Green", "Cyan", "Purple", "Pink", "Orange", "Blue"]} onChange={setAccentColor} />
      <Toggle enabled={compactMode} onToggle={() => setCompactMode(!compactMode)} label="Compact mode" />
      <Toggle enabled={animations} onToggle={() => setAnimations(!animations)} label="Enable animations" />
    </div>
  );
};

const StreamingSettings = () => {
  const [videoQuality, setVideoQuality] = useSetting("stream_video", "Auto");
  const [dataSaver, setDataSaver] = useSetting("stream_datasaver", false);
  const [autoplay, setAutoplay] = useSetting("stream_autoplay", true);
  const [offlineMode, setOfflineMode] = useSetting("stream_offline", false);
  const [downloadQuality, setDownloadQuality] = useSetting("stream_download", "High");

  return (
    <div className="space-y-1">
      <SelectOption label="Video Quality" value={videoQuality} options={["Auto", "360p", "480p", "720p", "1080p"]} onChange={setVideoQuality} />
      <SelectOption label="Download Quality" value={downloadQuality} options={["Low", "Medium", "High", "Lossless"]} onChange={setDownloadQuality} />
      <Toggle enabled={dataSaver} onToggle={() => setDataSaver(!dataSaver)} label="Data saver mode" />
      <Toggle enabled={autoplay} onToggle={() => setAutoplay(!autoplay)} label="Autoplay similar tracks" />
      <Toggle enabled={offlineMode} onToggle={() => setOfflineMode(!offlineMode)} label="Offline mode" />
    </div>
  );
};

const settingsPanels: Record<string, () => JSX.Element> = {
  Account: AccountSettings,
  Audio: AudioSettings,
  Notifications: NotificationSettings,
  Privacy: PrivacySettings,
  Appearance: AppearanceSettings,
  Streaming: StreamingSettings,
};

const SettingsPage = () => {
  const [active, setActive] = useState("Account");
  const [showPanel, setShowPanel] = useState(false);
  const ActivePanel = settingsPanels[active];

  const handleSelect = (label: string) => {
    setActive(label);
    setShowPanel(true);
  };

  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-4 sm:p-6">
      <h1 className="text-xl sm:text-2xl font-bold font-display neon-glow-green mb-4 sm:mb-6">SETTINGS</h1>
      
      {/* Desktop layout */}
      <div className="hidden md:grid grid-cols-3 gap-6">
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
        <div className="col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="text-lg font-bold font-display mb-4">{active}</h2>
          <ActivePanel />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="md:hidden">
        {!showPanel ? (
          <div className="flex flex-col gap-2">
            {sections.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSelect(s.label)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg transition-all text-left ${
                  active === s.label
                    ? "bg-primary/10 border border-primary/30 neon-border-green"
                    : "bg-surface-mid hover:bg-muted border border-transparent"
                }`}
              >
                <s.icon size={20} className={active === s.label ? "text-primary" : "text-muted-foreground"} />
                <div className="flex-1">
                  <p className="text-sm font-semibold font-body text-foreground">{s.label}</p>
                  <p className="text-xs text-muted-foreground">{s.desc}</p>
                </div>
                <ChevronLeft size={16} className="text-muted-foreground rotate-180" />
              </button>
            ))}
          </div>
        ) : (
          <div>
            <button onClick={() => setShowPanel(false)} className="flex items-center gap-2 text-primary text-sm font-body mb-4 hover:underline">
              <ChevronLeft size={16} /> Back to settings
            </button>
            <div className="bg-card rounded-xl border border-border p-4">
              <h2 className="text-lg font-bold font-display mb-4">{active}</h2>
              <ActivePanel />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SettingsPage;
