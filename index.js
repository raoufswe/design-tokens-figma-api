const fs = require("fs");
const { elevationParser } = require("./parser");
const dotenv = require("dotenv");
dotenv.config();

const getFigmaFileTree = async ({ figmaId, nodeIds }) => {
  const result = await fetch(
    `https://api.figma.com/v1/files/${figmaId}/nodes?ids=${nodeIds}`,
    {
      method: "GET",
      headers: {
        "X-Figma-Token": process.env.figmaApiKey,
      },
    }
  );
  const figmaTreeStructure = await result.json();
  const nodes = Object.entries(figmaTreeStructure.nodes).flatMap(
    (i) => i[1].document
  );
  return nodes;
};

const inti = async () => {
  const elevationNodes = await getFigmaFileTree({
    figmaId: "1EPQqBfaXdQ7rWAjoAXPQL",
    nodeIds: "44:598,48:861",
  });

  const elevation = elevationParser(elevationNodes);

  const tokens = {
    shadow: elevation,
  };

  fs.writeFileSync("./tokens.json", JSON.stringify(tokens, null, 2), "utf-8");
};

inti();
