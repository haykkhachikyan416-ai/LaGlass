import {
  Building2, DraftingCompass, HardHat, Home, Images, MapPin,
  MessagesSquare, Ruler, Sparkles, Wrench, type LucideIcon,
} from "lucide-react";

/** Maps the icon names used in /content JSON to Lucide components. */
export const icons: Record<string, LucideIcon> = {
  ruler: Ruler,
  wrench: Wrench,
  sparkles: Sparkles,
  message: MessagesSquare,
  pin: MapPin,
  images: Images,
  home: Home,
  hardhat: HardHat,
  compass: DraftingCompass,
  building: Building2,
};

export function icon(name: string): LucideIcon {
  return icons[name] ?? Sparkles;
}
