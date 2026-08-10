import { defineCliConfig } from "sanity/cli";

/**
 * Configuration for the `sanity` command-line tool.
 *
 * This is separate from sanity.config.ts: that one configures the studio
 * application (schemas, plugins, structure), while this tells the CLI which
 * project to talk to when running `sanity deploy`, `sanity dataset`, etc.
 */
export default defineCliConfig({
  api: {
    projectId: "6i8hnrv7",
    dataset: "production",
  },
  /** Deployed studio hostname — https://laglass.sanity.studio */
  studioHost: "laglass",
  deployment: {
    // Auto-updates make the hosted studio pull Sanity's newest version at
    // runtime. Left off because that code path crashes while resolving
    // installed versions ("Failed to parse installed version"), and because a
    // pinned build is the predictable choice for a site someone else owns:
    // the studio cannot change under them without a deliberate redeploy.
    autoUpdates: false,
  },
});
