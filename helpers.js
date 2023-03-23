const findNodesByName = (tree, name) => {
  let nodes = [];
  if (tree.name === name) nodes.push(tree);
  if (tree.children) {
    for (let node of tree.children) {
      const childNodes = findNodesByName(node, name);
      nodes = nodes.concat(childNodes);
    }
  }
  return nodes;
};

const findNodeByName = (tree, name) => {
  if (!tree[Symbol.iterator]) tree = [tree]; // wrap object in array to make it iterable
  for (let node of tree) {
    if (node.name === name) return node;
    if (node.children) {
      const childNode = findNodeByName(node.children, name);
      if (childNode) return childNode;
    }
  }
};

const findPropertyValue = (tree, propertyName) => {
  if (!tree[Symbol.iterator]) tree = [tree]; // wrap object in array to make it iterable
  for (let node of tree) {
    if (node[propertyName]) return node[propertyName];
    if (node.children) {
      const childValue = findPropertyValue(node.children, propertyName);
      if (childValue) return childValue;
    }
  }
};

const roundToTwo = (num) => {
  return +(Math.round(num + "e+2") + "e-2");
};

function toCamelCase(str) {
  // Replace dashes with camel case
  str = str.replace(/-([a-z])/g, function (match, letter) {
    return letter.toUpperCase();
  });

  // Remove special characters
  str = str.replace(/[^a-zA-Z0-9]/g, "");

  return str;
}

module.exports = {
  findNodesByName,
  findNodeByName,
  findPropertyValue,
  roundToTwo,
  toCamelCase,
};
