import { copyFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";

/**
 * Copies all files with given extension from source directory to target
 * directory.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.extension Extension of files to be copied
 * @param {String} parameters.source Source directory to copy from
 * @param {String} parameters.target Target directory to copy to
 *
 * @returns {Promise}
 */
export default async function({ extension, source, target }) {
  log.info(`Copying ${extension} files from '${source}' to '${target}'`);

  await files(source, extension, async (dir, file) => {
    const sourceFile = join(source, dir, file);
    const targetFile = join(target, dir, file);

    mkdirSync(dirname(targetFile), { recursive: true });
    copyFileSync(sourceFile, targetFile);

    log.success(`${sourceFile} => '${targetFile}'`, 1);
  });
}
