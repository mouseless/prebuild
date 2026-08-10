const BASE_COLON_COUNT = 2; // mdc component fences start at "::"
const INDENT_SIZE = 2;

const FENCE_REGEX = /^(:{2,})(.*)$/;

/**
 * Fixes indentation of mdc component blocks in markdown content.
 *
 * Nested ":::content ... :::" fences (and deeper) get indented relative
 * to their enclosing "::" component, based on how many colons beyond the
 * base "::" they use. Lines outside any component block are left untouched.
 *
 * @param {String} content Raw markdown content
 *
 * @returns {String} Formatted markdown content
 */
export default function(content) {
  const stack = [];

  const lines = content.split("\n").map(line => {
    const trimmed = line.trim();

    if (trimmed === "") return "";

    const match = trimmed.match(FENCE_REGEX);

    if (match) {
      const colonCount = match[1].length;
      const isClosing = match[2].trim() === "";
      const indent = indentFor(colonCount);

      if (isClosing) stack.pop();
      else stack.push(colonCount);

      return indent + trimmed;
    }

    if (stack.length === 0) return line;

    const enclosingColonCount = stack[stack.length - 1];
    return indentFor(enclosingColonCount) + trimmed;
  });

  return lines.join("\n");
}

function indentFor(colonCount) {
  const level = Math.max(0, colonCount - BASE_COLON_COUNT);
  return " ".repeat(level * INDENT_SIZE);
}