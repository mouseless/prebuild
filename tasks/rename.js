import { renameSync } from "fs";
import { join, extname } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";

/**
 * Renames files in source directory from find value to replace value.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.source Directory to search
 * @param {String} parameters.find Name of files to rename
 * @param {String} parameters.replace New file name
 *
 * @returns {Promise}
 */
export default async function({ source, find, replace }) {
  log.info(`Renaming '${find}' files to '${replace}' in '${source}'`);

  await files(source, extname(find), async (dir, file) => {
    if(file !== find) return;

    const sourceFile = join(source, dir, file);
    const replacedFile = join(source, dir, replace);

    renameSync(sourceFile, replacedFile);

    log.success(`${sourceFile} => '${replacedFile}'`, 1);
  });
}
