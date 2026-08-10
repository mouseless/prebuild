import { test } from "node:test";
import assert from "node:assert/strict";
import indent from "../tasks/utils/indent.js";

test("indents nested mdc component blocks", () => {
  const input = `
::block
:::content
#test

Seess

#mest

mest
:::
::`;
  const expected = `
::block
  :::content
  #test

  Seess

  #mest

  mest
  :::
::`;

  assert.equal(indent(input), expected);
});

test("is idempotent", () => {
  const input = `
::block
  :::content
  #test
  :::
::`;

  assert.equal(indent(input), input);
});

test("handles triple-nested components", () => {
  const input = `
::outer
:::middle
::::inner
text
::::
:::
::`;
  const expected = `
::outer
  :::middle
    ::::inner
    text
    ::::
  :::
::`;

  assert.equal(indent(input), expected);
});

test("leaves content outside any fence untouched", () => {
  const input = `
# Title

Normal paragraph, not touched.

- list item
  - nested list item`;

  assert.equal(indent(input), input);
});

test("empty lines inside a fence stay empty (no trailing indent)", () => {
  const input = `::block
:::content
text

:::
::`;

  const result = indent(input);
  const blankLine = result.split("\n")[3];

  assert.equal(blankLine, "");
});