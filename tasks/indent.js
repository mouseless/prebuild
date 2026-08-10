import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";
import indent from "./utils/indent.js";

/**
 * Fixes indentation of files with given extension in source directory,
 * according to extension-specific rule sets.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.source Source directory to search from
 *
 * @returns {Promise}
 */
export default async function({ source }) {
  log.info(`Fixing indentation of .md files in '${source}'`);

  await files(source, '.md', async (dir, file) => {
    const sourceFile = join(source, dir, file);
    const data = readFileSync(sourceFile, "utf8");
    const formatted = indent(data);

    if (formatted === data) { return; }

    writeFileSync(sourceFile, formatted);

    log.success(`${sourceFile} => indentation fixed`, 1);
  });
}