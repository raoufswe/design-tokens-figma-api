const StyleDictionary = require("style-dictionary");
const {
  w3cTokenJsonParser,
} = require("style-dictionary-utils/dist/parser/w3c-token-json-parser");

StyleDictionary.registerParser(w3cTokenJsonParser);

StyleDictionary.registerTransform({
  name: "shadow/css",
  type: `value`,
  transitive: false,
  matcher: (token) => token?.type === "shadow",
  transformer: ({ value }) =>
    value
      .map((v) => `${v.offsetX} ${v.offsetY} ${v.blur} ${v.spread} ${v.color}`)
      .join(", "),
});

const MyStyleDictionary = StyleDictionary.extend({
  source: ["./tokens.json"],
  platforms: {
    scss: {
      transforms: ["shadow/css"],
      transformGroup: "scss",
      buildPath: "build/",
      files: [
        {
          destination: "variables.scss",
          format: "scss/variables",
        },
      ],
    },
  },
});

MyStyleDictionary.buildAllPlatforms();
