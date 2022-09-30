let xGenElement = document.getElementById("XgenElement");
function getTemplateRegEx() {
  const anything = String.raw`([\s\S]*?)`;
  const optionalNewLines = String.raw`\n*`;
  const optionalWhitespace = String.raw`\s*`;
  const spaceNotNewLines = String.raw`[ \t]*`;

  const tagStart = `{{${optionalWhitespace}`;
  const tagEnd = `${optionalWhitespace}}}`;
  const sectionStart = `${spaceNotNewLines}${tagStart}(?:#(.*?))${tagEnd}${optionalNewLines}`;
  const sectionEnd = String.raw`${optionalWhitespace}${tagStart}/\1${tagEnd}`;

  const repeatingSectionTag = `${sectionStart}${anything}${sectionEnd}`;
  const replacementTag = `${tagStart}(.*?)${tagEnd}`;
  const combinedRegEx = new RegExp(`${repeatingSectionTag}|${replacementTag}`, "g");

  return combinedRegEx;
}
function render(template, data) {
  const templateRegEx = getTemplateRegEx();
  return template.replace(templateRegEx, (_match, sectionTag, sectionContents, replacementTag) => {
    if (sectionTag !== undefined) {
      const replacements = objectPath.get(data, sectionTag);
      return replacements
        .map((subData) => {
          return render(sectionContents, { ...subData, this: subData });
        })
        .join("\n");
    }
    const replacement = objectPath.get(data, replacementTag);
    if (replacement === null || replacement === undefined) {
      return "";
    }
    if (typeof replacement === "function") {
      return replacement();
    }
    return replacement;
  });
}

for (var product of products) {
  if (product.sale_price != "None") {
    product.price = product.sale_price;
  }
  if (product.is_in_stock != 0 && product.product_types.includes("top")) {
    xGenElement.innerHTML += render(htmlTemplate, product);
  }
}
