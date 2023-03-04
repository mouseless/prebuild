import { existsSync, writeFile } from "fs";
import log from "./utils/log.js";

/**
 * Checks whether file with a given path exists, if not, it creates an empty
 * file at the specified path.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.path Path to be touched
 *
 * @returns {Promise}
 */
export default async function({ path }) {
  log.info(`Touch ${path}`);
  if(existsSync(path)) {
    log.debug("File found successfully");
  } else {
    writeFile(path, "", err => {
      if (err) {
        return log.warning(err);
      }
    });

    return log.info("File created successfully");
  }
}
