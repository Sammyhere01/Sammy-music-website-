import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { MusicProvider } from "@/contexts/MusicContext";
import AppLayout from "@/components/AppLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import SettingsPage from "./pages/Settings";
import PlaylistPage from "./pages/Playlist";
import ProfilePage from "./pages/Profile";
import SearchPage from "./pages/Search";
import DiscoverPage from "./pages/Discover";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <MusicProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/discover" element={<DiscoverPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/playlist" element={<PlaylistPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/upload" element={<Index />} />
              <Route path="/messages" element={<Index />} />
              <Route path="/groups" element={<Index />} />
              <Route path="/events" element={<Index />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MusicProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
