import { rmSync, existsSync } from "fs";
import log from "./utils/log.js";

/**
 * Cleans everything under given directories.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String[]} parameters.directories Directories to remove
 *
 * @returns {Promise}
 */
export default async function({ directories }) {
  log.info(`Cleaning directories ${directories.join(", ")}...`);

  for(const directory of directories) {
    if (existsSync(directory)) {
      rmSync(directory, { recursive: true, force: true });
      log.debug(`${directory} is force removed recursively`, 1);
    }
  }

  log.success("cleaned", 1);
}
