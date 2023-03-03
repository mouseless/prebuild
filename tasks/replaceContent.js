import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";

/**
 * Replaces old text to new text in files with given extension in source
 * directory.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.extension Extension of files to search
 * @param {String} parameters.source Source directory to search from
 * @param {String} parameters.oldText Text to be replaced
 * @param {String} parameters.newText New text
 *
 * @returns {Promise}
 */
export default async function({ extension, source, oldText, newText }) {
  log.info(`Replacing '${oldText}' content in '${extension}' files to '${newText}' in '${source}'`);

  await files(source, extension, async (dir, file) => {
    const sourceFile = join(source, dir, file);
    const regex = new RegExp(`${oldText}`, "gi");

    const data = readFileSync(sourceFile, "utf8");
    const match = data.match(regex);
    if(!match) return;

    writeFileSync(sourceFile, data.replaceAll(oldText, newText));

    log.success(`${sourceFile} => ${match.length} match(es) replaced`, 1);
  });
}

