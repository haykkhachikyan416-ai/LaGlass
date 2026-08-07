import type { RouteRecord } from "vite-react-ssg";
import App from "@/App";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ShowerEnclosures from "@/pages/ShowerEnclosures";
import GlassRailings from "@/pages/GlassRailings";
import Gallery from "@/pages/Gallery";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import NotFound from "@/pages/NotFound";

/**
 * Every path listed here is prerendered to static HTML at build time, so the
 * site still serves real markup to crawlers and to visitors whose JavaScript
 * fails — the behaviour the App Router gave us for free.
 */
export const routes: RouteRecord[] = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "services", element: <Services /> },
      { path: "services/shower-enclosures", element: <ShowerEnclosures /> },
      { path: "services/glass-railings", element: <GlassRailings /> },
      { path: "gallery", element: <Gallery /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "privacy", element: <Privacy /> },
      { path: "404", element: <NotFound /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
