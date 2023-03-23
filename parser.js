const {
  findNodesByName,
  findNodeByName,
  findPropertyValue,
  roundToTwo,
  toCamelCase,
} = require("./helpers");

const normalize = (nodes, getValue, type) =>
  nodes.reduce((acc, node) => {
    const [shapeNode, informationNode, tokenNode] = node.children;
    const token = toCamelCase(findPropertyValue(tokenNode, "characters"));
    const globalToken = findNodesByName(informationNode, "global-token").map(
      (i) => findPropertyValue(i, "characters")
    )[0];

    acc[token] = {
      $value: globalToken
        ? `{${type}.${toCamelCase(globalToken)}.value}`
        : getValue(shapeNode),
      type,
      $description: findNodeByName(informationNode, "description").characters,
    };
    return acc;
  }, {});

const elevationParser = (nodes) => {
  const [globalNodes, aliasNodes] = nodes;

  const getValue = (nodes) =>
    findPropertyValue(nodes.children, "effects").map(
      ({ offset, color, radius = 0, spread = 0 }) => ({
        offsetX: `${offset.x}px`,
        offsetY: `${offset.y}px`,
        blur: `${radius}px`,
        spread: `${spread}px`,
        color: `rgba(${roundToTwo(color.r)}, ${roundToTwo(
          color.g
        )}, ${roundToTwo(color.b)}, ${roundToTwo(color.a)})`,
      })
    );

  return {
    ...normalize(
      findNodesByName(globalNodes, "elevation-token"),
      getValue,
      "shadow"
    ),
    ...normalize(
      findNodesByName(aliasNodes, "elevation-token"),
      getValue,
      "shadow"
    ),
  };
};

module.exports = {
  elevationParser,
};
