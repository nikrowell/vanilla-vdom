
export default function h(type, attrs, ...args) {
  attrs = attrs || {};
  const children = args.length ? Array.prototype.concat(...args) : [];
  return {type, attrs, children};
};