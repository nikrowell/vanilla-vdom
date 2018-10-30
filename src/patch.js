import { CREATE, REMOVE, REPLACE, UPDATE, REMOVE_ATTR, SET_ATTR } from './utils';
import { setAttr, removeAttr } from './attr';
import render from './render';

export default function patch(node, changes, index = 0) {
  
  if (!changes) return;
  
  // console.log(' ');
  console.log(changes);
  // console.log(node.outerHTML, node.childNodes, index, node.childNodes[index]);
  return;
  
  const child = node.childNodes[index];

  switch (changes.type) {
    
    case CREATE:
      const el = render(changes.newNode);
      return node.appendChild(el);

    case REMOVE:
      return node.removeChild(child);
      
    case REPLACE:
    
      if (node instanceof Text) {
        node.parentElement.childNodes[index].nodeValue = changes.newNode;
        return;
      } else {
        const el = render(changes.newNode);
        return node.replaceChild(el, child);
      }

    case UPDATE:
  
      const { attrs, children } = changes;

      attrs.forEach(change => {
        const { name, value } = change;
        if (change.type === SET_ATTR) {
          setAttr(node, name, value);
        } else if (type === REMOVE_ATTR) {
          removeAttr(node, name, value);
        }
      });

      children.forEach((change, i) => {
        console.log(i, child, change)
        patch(child, change, i);
      });
  }
};