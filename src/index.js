import h from './h';
import render from './render';
import Component from './component';

const Greeting = (props) => (
  <h1>Hello {props.name || 'Anonymous'}</h1>
);

class Button extends Component {

  constructor(props) {
    super(props);
    this.state = {clicks: 0};
    this.colors = ['#F04926', '#54D10B', '#23537F'];
    this.onClick = this.onClick.bind(this);
  }
  
  onClick(event) {
    this.update({clicks: this.state.clicks + 1});
  }

  render() {
    const clicks = this.state.clicks;
    const style = `background-color: ${this.colors[clicks % 3]}`;
    // const text = `${clicks} ${clicks === 1 ? 'Click' : 'Clicks'}`;
    return (
      <button type="button" className="btn" style={style} onClick={this.onClick}>
        {clicks} {clicks === 1 ? 'Click' : 'Clicks'}
      </button>
    );
  }
}

const Message = (props) => {
  return (
    <div className="message">
      <span>Message: <strong>{props.message}</strong></span>
      {props.children}
    </div>
  );
}

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {count: 0};
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    const count = this.state.count + 1;
    this.update({count});
    this.el.style.backgroundColor = '#f1f1f1';
  }

  render() {
    const count = this.state.count;
    return (
      <div class="site" ref={el => this.el = el}>
        <Greeting name="Nikolaus" count={count} />
        <Message message="Hello there">
          <span>this is a test {count}</span>
        </Message>
        Count: <strong>{count}</strong>
        <ul class="some-list" data-something="foo">
          <li className="some-list__item" onClick={this.onClick}>Colorado (click me)</li>
          <li><a href="https://bigislandguide.com/" target="_blank">Hawaii</a></li>
        </ul>
        {count === 3 && <Button />}
      </div>
    );
  }
}

const app = new App();
console.log(app.render());
render(<App />, document.body);