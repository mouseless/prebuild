/**
 AI-GEN(Claude AI Sonnet 5)
 Write a JavaScript function (ES module, default export) that takes a raw
 markdown string (mdc format) and returns it with corrected indentation,
 following these rules:

 - A line starting with 2 or more colons (::, :::, ::::, ...) is a component
   fence (opening or closing). Its indent level is (colonCount - 2) * 2 spaces —
   so :: = 0 spaces, ::: = 2 spaces, :::: = 4 spaces, and so on.
 - A line starting with exactly one colon (e.g. :block{content="..."},
   :include{content="..."}) is a self-closing inline component, not a fence.
   It should be indented to match whatever fence it's currently nested inside —
   specifically the nearest (innermost) enclosing fence, even across multiple
   nesting levels.
 - Lines that are not inside any fence at all (i.e., before any :: block or
   fully outside one) must be left completely untouched, exactly as they are.
 - Blank lines should remain blank — no trailing spaces added.
 - The function must be idempotent: running it again on
   already-correctly-formatted output should produce the exact same result.
 Example input:
  ::block
  :::content
  #test

  Seess

  #mest

  mest
  :::
  ::

 Expected output:
  ::block
  :::content
  #test

  Seess

  #mest

  mest
  :::
  ::
  Also handle deeper nesting correctly — e.g. a single-colon component inside a
  triple-nested fence (::::) should get 4 spaces of indent, matching its
  innermost enclosing fence, not the outermost one.
*/
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
    if (trimmed === "") { return ""; }

    const match = trimmed.match(FENCE_REGEX);
    if (match) {
      const colonCount = match[1].length;
      const isClosing = match[2].trim() === "";
      const indent = indentFor(colonCount);

      if (isClosing) { stack.pop(); }
      else { stack.push(colonCount); }

      return indent + trimmed;
    }
    if (stack.length === 0) { return line; }

    const enclosingColonCount = stack[stack.length - 1];

    return indentFor(enclosingColonCount) + trimmed;
  });

  return lines.join("\n");
}

function indentFor(colonCount) {
  const level = Math.max(0, colonCount - BASE_COLON_COUNT);

  return " ".repeat(level * INDENT_SIZE);
}