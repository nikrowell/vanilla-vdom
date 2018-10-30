import { 
  CREATE, 
  REMOVE, 
  REPLACE, 
  UPDATE, 
  REMOVE_ATTR, 
  SET_ATTR,
  isNumber,
  isString,
  isUndefined 
} from './utils';

function changed(node1, node2) {
  return typeof node1 !== typeof node2 ||
         isString(node1) && node1 !== node2 ||
         isNumber(node1) && node1 !== node2 ||
         node1.type !== node2.type;
}

export default function diff(newNode, oldNode) {
  
  if (isUndefined(oldNode)) {
    return {type: CREATE, newNode};
  }
  
  if (isUndefined(newNode)) {
    return {type: REMOVE, oldNode};
  }

  if (changed(newNode, oldNode)) {
    return {type: REPLACE, newNode, oldNode};
  }

  if (newNode.type) {
    const attrs = diffAttrs(newNode, oldNode);
    const children = diffChildren(newNode, oldNode);
    return {type: UPDATE, attrs, children};
  }
};

function diffAttrs(newNode, oldNode) {
  
  const attrs = Object.assign({}, newNode.attrs, oldNode.attrs);
  const changes = [];

  Object.keys(attrs).forEach(name => {
    
    const newVal = newNode.attrs[name];
    const oldVal = oldNode.attrs[name];
    
    if (isUndefined(newVal)) {
      changes.push({type: REMOVE_ATTR, name, value: oldVal});
    } else if (isUndefined(oldVal) || newVal !== oldVal) {
      changes.push({type: SET_ATTR, name, value: newVal});
    }
  });

  return changes;
}

function diffChildren(newNode, oldNode) {
  
  const length = Math.max(newNode.children.length, oldNode.children.length);
  const changes = new Array(length);

  for (let i = 0; i < length; i++) {
    changes[i] = diff(
      newNode.children[i],
      oldNode.children[i]
    );
  }

  return changes;
}