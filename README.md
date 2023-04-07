# Prebuild

This project is a task based mechanism which enables you to run tasks, 
providing custom functionality in prebuild stage. It is designed as a submodule
to use in various projects.

In order to use this in your project, you should import `./index.js` use and 
use the `run()` function;

```javascript
await run("path/to/your/config.yml", { customTasks });
```

The function reads your configuration from the provided `.yml` file and
asyncrounusly runs the tasks with given configurations.

## Setup

We suggest you use to add this as a submodule to your repository and follow 
folder structure.

```
prebuild/
├─ .prebuild => git submodule
├─ tasks/
│  ├─ customTask.js
├─ config.yml
├─ index.js
```

> :warning:
>
> The project requires `YAML` package. Make sure you include this package in
> your `package.json`.
> 
> ```json
> "yaml": "^2.2.1"
> ```

## Sample Configuration

Below is sample configuration which you can copy and use. Before you run your
app, make sure you correctly change the _projectRoot_ value accordingly.

```yaml
# Project root relative to this config file
# This is required
projectRoot: ../../

# Log settings
log:
  debug: false # Enable debug logs
  quiet: false # Disable logs completely

# Tasks run in given order, you can change the order according to your needs
tasks:
  - clean:
      directories:
        - ./.theme/.temp
        - ./.theme/.output
  - copy:
      extension: .png # optional
      source: ./
      target: ./.theme/.public
  
  - extractDiagrams:
      source: ./
      target: ./.theme/.temp
      outputFormat: 'svg'
      deviceScaleFactor: 1
      config: 
        backgroundColor: '#000000'
        theme: base
        themeVariables:
          primaryColor: '#FA465B'
          primaryTextColor: '#fff'
          primaryBorderColor': '#7C0000'
          lineColor: '#F8B229'
          secondaryColor: '#006100'
          tertiaryColor: '#fff'

  - move:
      extension: .png # optional
      source: ./.theme/.temp
      target: ./.theme/.public

  - rename:
      source: ./.theme/.temp
      find: README.md
      replace: index.md

  - replaceContent:
      extension: .md
      source: ./.theme/.temp
      oldText: README.md
      newText: index.md

  - touch:
      path: ./.theme/.env.local
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
