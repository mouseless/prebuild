import { test } from "node:test";
import assert from "node:assert/strict";
import md from "../tasks/utils/autoindentation/rules/md.js";

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

  assert.equal(md(input), expected);
});

test("is idempotent", () => {
  const input = `
::block
  :::content
  #test
  :::
::`;

  assert.equal(md(input), input);
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

  assert.equal(md(input), expected);
});

test("leaves content outside any fence untouched", () => {
  const input = `
# Title

Normal paragraph, not touched.

- list item
  - nested list item`;

  assert.equal(md(input), input);
});

test("empty lines inside a fence stay empty (no trailing indent)", () => {
  const input = `::block
:::content
text

:::
::`;

  const result = md(input);
  const blankLine = result.split("\n")[3];

  assert.equal(blankLine, "");
});