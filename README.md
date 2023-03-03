# Prebuild

This project is a task based mechanism which enables you to run tasks, enabling
custom functionality in prebuild stage. It is designed as a submodule to use 
in various projects.

In order to use this in your project, you should import `./index.js` use and 
use the'run()' function;

```java
  prebuild.run([your-config-path], { customTasks: tasks });
```

The functions reads your configuration from the provided `.yml` file and
asyncrounusly runs the tasks with given configurations.

## Setup

 We suggest you use to add this as a submodule to your repository and follow 
 folder structure.

```
  +-- prebuild
  |   +-- .prebuild-submodule
  |   +-- index.js
  +-- tasks
  |   +-- customTask.js
  +-- config.yml
```

## Built-in Tasks

### Clean

This task (`.theme/prebuild/tasks/clean.js`) deletes files with the given
parameters, including subfolders.

### Copy

This task (`.theme/prebuild/tasks/copy.js`) copies files with the given
extension to the desired location.

### Extract Diagrams

This task (`.theme/prebuild/tasks/extractDiagrams.js`) processes markdown files
and extracts diagrams as `.png` files and modifies markdowns to replace
markdown code with diagram images.

### Move

This task (`.theme/prebuild/tasks/move.js`) moves files with given extension
from source directory to target directory.

### Rename

This task (`.theme/prebuild/tasks/rename.js`) renames files with the given
name in the given location to the desired name in the same location.

### Replace Content

This task (`.theme/prebuild/tasks/replaceContent.js`) replaces given old text
to new text in files with given extension. We used this one to replace
`README.md` with `index.md` before fixing links.

### Touch

This task (`.theme/prebuild/tasks/touch.js`) checks whether file with a given
path exists, if not, it creates an empty file at the specified path.
