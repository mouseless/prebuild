import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import * as builtInTasks from "./tasks/index.js";
import * as log from "./tasks/utils/log.js";

/**
 * Runs tasks configured in .yml file
 * 
 *
 * @async
 * @param {String} configPath Path of the prebuild configuration file
 * @param {Module} customTasks Custom module for user defined tasks
 *
 * @returns {Promise}
 */
export async function run(configPath, customTasks = {}) {
  process.setMaxListeners(0);

  const scriptDir = dirname(fileURLToPath(import.meta.url));
  const config = YAML.parse(readFileSync(configPath, "utf8"));

  process.chdir(join(scriptDir, config.projectRoot));
  Object.assign(log.settings, config.log);
  
  const tasks = {...builtInTasks, ...customTasks };

  for(const task of config.tasks) {
    const [name] = Object.keys(task);
    const parameters = task[name];

    await tasks[name](parameters);
  }
}
