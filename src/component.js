import diff from './diff';
import patch from './patch';

const queue = [];
let scheduled;

function enqueue(component) {
  if (!queue.includes(component)) {
    queue.push(component);
    scheduled || (scheduled = window.requestAnimationFrame(update));
  }
}

function update() {
  let component;
  while (component = queue.pop()) {
    const vnode = component.render();
    const changes = diff(vnode, component._vnode);
    patch(component._node, changes);
    component._vnode = vnode;
  }
  scheduled = false;
}

export default class Component {

  constructor(props) {
    this.props = props;
    this.state = null;
  }

  update(state) {
    Object.assign(this.state, state);
    enqueue(this);
  }
}