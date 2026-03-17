import { Edit3, Music, Users, Heart } from "lucide-react";
import avatarImg from "@/assets/avatar.jpg";
import heroBanner from "@/assets/hero-banner.jpg";

const stats = [
  { label: "Tracks", value: "142", icon: Music },
  { label: "Followers", value: "2.4K", icon: Users },
  { label: "Likes", value: "8.7K", icon: Heart },
];

const ProfilePage = () => {
  return (
    <div className="flex-1 overflow-y-auto scrollbar-cyber p-6">
      {/* Banner */}
      <div className="relative rounded-2xl overflow-hidden h-48 mb-16">
        <img src={heroBanner} alt="Banner" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* Avatar & Info */}
      <div className="flex items-end gap-4 -mt-24 mb-6 px-4">
        <img src={avatarImg} alt="Profile" className="w-24 h-24 rounded-full border-4 border-background object-cover shadow-xl" />
        <div className="flex-1">
          <h1 className="text-2xl font-bold font-display neon-glow-green">CYBER_DREAMS</h1>
          <p className="text-sm text-muted-foreground font-body">@cyber_dreams · Joined March 2025</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-primary text-sm font-body font-semibold hover:bg-primary/20 transition-colors">
          <Edit3 size={14} />
          EDIT PROFILE
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        {stats.map((s) => (
          <div key={s.label} className="bg-card rounded-xl border border-border p-4 text-center">
            <s.icon size={20} className="text-primary mx-auto mb-2" />
            <p className="text-xl font-bold font-display text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <h2 className="text-sm font-bold font-display mb-2">ABOUT</h2>
        <p className="text-sm text-muted-foreground font-body leading-relaxed">
          🎵 Music is my universe. Cyberpunk enthusiast, lo-fi lover, and phonk addict.
          Always hunting for the next beat that hits different. Drop me a message if you wanna collab! ⚡
        </p>
      </div>

      {/* Favorite Genres */}
      <div className="bg-card rounded-xl border border-border p-4">
        <h2 className="text-sm font-bold font-display mb-3">FAVORITE GENRES</h2>
        <div className="flex flex-wrap gap-2">
          {["Phonk", "Lo-Fi", "Cyberpunk", "Indie", "Rap", "Electronic"].map((g) => (
            <span key={g} className="px-3 py-1 bg-primary/10 text-primary text-xs font-body font-semibold rounded-full border border-primary/20">
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
