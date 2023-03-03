import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import YAML from "yaml";
import * as tasks from "./tasks/index.js";
import * as log from "./tasks/utils/log.js";

process.setMaxListeners(0);

const scriptDir = dirname(fileURLToPath(import.meta.url));
const config = YAML.parse(readFileSync(join(scriptDir, "config.yml"), "utf8"));

process.chdir(join(scriptDir, config.projectRoot));
Object.assign(log.settings, config.log);

for(const task of config.tasks) {
  const [name] = Object.keys(task);
  const parameters = task[name];

  await tasks[name](parameters);
}
