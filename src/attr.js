import { isFunction, isString } from './utils';

export function setAttr(node, name, value) {

  if (name === 'key') {
    node._key = key;
  } else if (name === 'class') {
		node.className = value || '';
	} else if (name === 'ref' && isFunction(value)) {
    value(node);
  } else if (name === 'style') {
    
    if (isString(value)) {
      node.style.cssText = value;
    } else {
      Object.assign(node[name], value);  
    }
  
  } else if (name.startsWith('on') && isFunction(value)) {
    
    const event = name.slice(2).toLowerCase();
    node._listeners = node._listeners || {};
    node.removeEventListener(event, node._listeners[event]);
    node.addEventListener(event, value);
    node._listeners[event] = value;

  } else if (name in node) {
    try { node[name] = value; } catch (e) { }
  } else {
    node.setAttribute(name, value);
  }
};

export function removeAttr(node, name, value) {

  if (name === 'className') {
    target.removeAttribute('class');
  } else if (name.startsWith('on')) {
    const event = name.substring(2).toLowerCase();
    node.removeEventListener(event, value);
    delete node._listeners[event];
  } else {
    target.removeAttribute(name);
    // delete target[name];
  }
};