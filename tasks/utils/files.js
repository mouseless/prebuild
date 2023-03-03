import { readdirSync, statSync } from "fs";
import { join, extname } from "path";
import log from "./log.js";

/**
 * Called for each file found under given directory.
 *
 * @async
 * @callback actionCallback
 * @param {String} dir Relative directory path of the file under execution
 * @param {String} file Name of the under execution
 */
/**
 * Calls given action function on every file with given extension under dirPath
 * recursively.
 *
 * @async
 * @param {String} rootDir Root directory to browse
 * @param {String} extension Extension of the file to filter
 * @param {actionCallback} action Action callback to call for each file
 *
 * @returns {Promise}
 */
export default async function(rootDir, extension, action) {
  await files(rootDir, extension, action, "");
}

async function files(rootDir, extension, action, subDir) {
  const currentDir = join(rootDir, subDir);
  const currentFiles = readdirSync(currentDir);

  await Promise.all(
    currentFiles.map(async file => {
      let isDirectory;
      try { isDirectory = statSync(join(currentDir, file)).isDirectory(); }
      catch { isDirectory = false; }

      if (isDirectory) {
        if(file.startsWith(".")) { return; }

        log.debug(`checking '${file}' under '${currentDir}'`, 1);
        await files(rootDir, extension, action, join(subDir, file));
      } else if (extension && extname(file) !== extension) {
        log.debug(`skipped '${file}' under '${currentDir}'`, 1);
      } else {
        try {
          log.debug(`found '${file}' in '${currentDir}'`, 1);
          await action(subDir, file);
        } catch (e) {
          log.warning(`error while processing ${file} under ${currentDir}: ${e.stack}`, 1);
        }
      }
    })
  );
}
