import { isUndefined } from "util";
import { LicenseManagerApp } from "./app";

export namespace Scripts {
  export async function run(args) {
    if (args["install"]) {
      await doScript(async () => {
        process.title = "rf-license-manager";
        console.log("install license manager");
      });
    }
    if (args["create_mock"]) {
      await doScript(async () => {
        process.title = "rf-license-manager-mock";
        console.log("create-mocks started ... ");
        const amount = parseInt(args["create_mock"], 10) || 100;
        console.log("done creating mocks");
      });
    }
    if (args["run_server"]) {
      await doScript(async () => {
        process.title = "rf-license-manager";
        LicenseManagerApp.start();
      }, false);
    }
  }

  export async function doScript(action, isExit = true) {
    let exitCode = 0;
    try {
      await action();
    } catch (err) {
      console.error(err);

      if (!isUndefined(err.errorCode)) {
        exitCode = err.errorCode;
      } else {
        exitCode = 1;
      }
    }
    if (isExit || exitCode !== 0) {
      process.exit(exitCode);
    }
  }
}
