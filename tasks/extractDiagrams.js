import { mkdirSync, readdirSync } from "fs";
import { join, parse } from "path";
import { run } from "@mermaid-js/mermaid-cli";
import log from "./utils/log.js";
import files from "./utils/files.js";

/**
 * Extracts diagrams from markdown files in given source directory into target
 * directory. Also replaces mermaid code blocks in markdown files and puts them
 * into target directory.
 *
 * @async
 * @param {Object} parameters Task parameters
 * @param {String} parameters.source Source directory to process
 * @param {String} parameters.target Target directory to put files to
 *
 * @returns {Promise}
 */
export default async function({ source, target, config }) {
  log.info(`Extracting diagrams from markdown files in '${source}' to '${target}'`);

  await files(source, ".md", async (dir, file) => {
    const sourceFile = join(source, dir, file);
    const targetDir = join(target, dir);
    const targetFile = join(target, dir, file);
    const fileName = parse(file).name;

    mkdirSync(targetDir, { recursive: true });

    await run(sourceFile, targetFile, {
      puppeteerConfig: { "executablePath" : process.env.CHROMIUM_EXECUTABLE_PATH },
      quiet: log.settings.quiet || !log.settings.debug,
      outputFormat: "png",
      parseMMDOptions: {
        viewport: { width: 1280, height: 720, },
        backgroundColor: config?.backgroundColor || "#fff",
        mermaidConfig: { 
          theme: config?.theme || "default",
          themeVariables: config?.themeVariables || []
         }
      },
    });

    const diagrams = readdirSync(targetDir)
      .filter(f => f.startsWith(fileName) && f.endsWith(".png"))
      .map(diagram => `'${join(targetDir, diagram)}'`);

    diagrams.forEach(diagram => log.debug(`${sourceFile} => ${diagram}`, 1));

    if(diagrams.length > 0) {
      log.success(`${sourceFile} => ${diagrams.length} diagram(s) exported`, 1);
    }
  });
}

