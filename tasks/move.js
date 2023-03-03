import { renameSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";

/**
 * Moves all files with given extension from source directory to target
 * directory.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.extension Extension of files to be moved
 * @param {String} parameters.source Source directory to move from
 * @param {String} parameters.target Target directory to move to
 *
 * @returns {Promise}
 */
export default async function({ extension, source, target }) {
  log.info(`Moving ${extension} files from '${source}' to '${target}'`);

  await files(source, extension, async (dir, file) => {
    const sourceFile = join(source, dir, file);
    const targetFile = join(target, dir, file);

    mkdirSync(dirname(targetFile), { recursive: true });
    renameSync(sourceFile, targetFile);

    log.success(`${sourceFile} => '${targetFile}'`, 1);
  });
}

