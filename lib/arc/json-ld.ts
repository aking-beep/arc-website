/**
 * Serialize a structured-data object for `dangerouslySetInnerHTML`.
 *
 * `JSON.stringify` does not escape `<`, so a string containing `</script>`
 * would close the tag early and anything after it would be parsed as markup.
 * Nothing in this repository's content modules contains that today — these
 * blocks are built from authored data, not user input — but a page that is
 * safe only because of what the data happens to contain is one content edit
 * away from not being. Escaping here makes it safe by construction.
 *
 * The last two are U+2028 and U+2029: valid inside a JSON string, but they
 * terminate a line in JavaScript, so a parser would see an unterminated
 * literal. Built with RegExp so the source carries the escape rather than the
 * character itself.
 */
const LINE_TERMINATORS = new RegExp("[\\u2028\\u2029]", "g");

export function jsonLdScript(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(LINE_TERMINATORS, (c) =>
      c === "\u2028" ? "\\u2028" : "\\u2029",
    );
}
