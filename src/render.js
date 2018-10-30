import { isBoolean, isFunction, isNumber, isString, isUndefined, noop } from './utils';
import { setAttr } from './attr';
import Component from './component';

export default function render(vnode, parent = null) {
  
  const mount = parent ? el => parent.appendChild(el) : noop;
  const { type, attrs, children } = vnode;

  if (isUndefined(vnode) || isBoolean(vnode)) {
    return;
  }

  if (isString(vnode) || isNumber(vnode)) {
    return mount(document.createTextNode(vnode));
  }

  if (isFunction(type)) {
    
    const props = Object.assign({}, attrs, {children});

    if (Component.isPrototypeOf(type)) {
      
      const instance = new type(props);
      instance._vnode = instance.render();
      instance._node = render(instance._vnode);
      // console.log('rendering component', type);
      // Component.render(instance);
      // instance._node.component = instance;
      // instance._key = attrs.key;
      
      const node = mount(instance._node);
      isFunction(instance.mount) && instance.mount(node);
      
      return node;
    }

    return mount(render(type(props)));
  }

  const node = document.createElement(type);
  
  for (const name in attrs) {
    setAttr(node, name, attrs[name]);
  }
  
  for (const child of children) {
    render(child, node);
  }

  return mount(node);
};