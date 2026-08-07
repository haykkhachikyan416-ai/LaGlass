import { ViteReactSSG } from "vite-react-ssg";
import { routes } from "@/routes";
// Self-hosted so there is no third-party font request (next/font did this for us).
import "@fontsource-variable/fraunces";
import "@fontsource-variable/hanken-grotesk";
import "@/styles/globals.css";

/**
 * Entry point. ViteReactSSG prerenders every route to real HTML at build time
 * and hydrates it in the browser, so pages still ship as crawlable markup
 * rather than an empty SPA shell.
 */
export const createRoot = ViteReactSSG({ routes });
