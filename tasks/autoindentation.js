import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import log from "./utils/log.js";
import files from "./utils/files.js";
import rules from "./utils/autoindentation/rules/index.js";

/**
 * Fixes indentation of files with given extension in source directory,
 * according to extension-specific rule sets.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.extension Extension of files to search (e.g. ".md")
 * @param {String} parameters.source Source directory to search from
 *
 * @returns {Promise}
 */
export default async function({ extension, source }) {
  const rule = rules[extension];

  if (!rule) {
    log.warning(`Autoindentation is not supported for '${extension}' files, skipping`);
    return;
  }

  log.info(`Fixing indentation of '${extension}' files in '${source}'`);

  await files(source, extension, async (dir, file) => {
    const sourceFile = join(source, dir, file);

    const data = readFileSync(sourceFile, "utf8");
    const formatted = rule(data);

    if (formatted === data) return;

    writeFileSync(sourceFile, formatted);

    log.success(`${sourceFile} => indentation fixed`, 1);
  });
}