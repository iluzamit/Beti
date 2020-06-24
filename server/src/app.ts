import * as ServerInitializer from "./config-server";

process.on("SIGTERM", async () => {
  await LicenseManagerApp.stop();
  process.exit(0);
});

export namespace LicenseManagerApp {
  export async function start() {
    await Promise.all([ServerInitializer.init()]);
  }
  export async function stop() {
    await Promise.all([]);
  }
}
