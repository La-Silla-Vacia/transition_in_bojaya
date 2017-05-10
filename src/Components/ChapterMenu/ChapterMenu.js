import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './ChapterMenu.css';

export default class ChapterMenu extends Component {

  constructor() {
    super();

    this.state = {
      show: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 1000);
  }

  handleClick(id, e) {
    e.preventDefault();
    const { openMenuItem } = this.props;
    openMenuItem(id);
  }

  getItems() {
    const { items } = this.props;
    return items.map((item, index) => {
      const number = index + 1;
      const { title, id, current } = item;
      return (
        <li className={cx(s.item, {[s.current]: current})} onClick={this.handleClick.bind(this, id)} key={id}>
          <span className={s.number}>0{number}</span>
          <a href={`#page-${id}`} className={s.link}>{title}</a>
        </li>
      )
    });
  }

  render(props, state) {
    const { show } = state;
    const { children, className } = props;

    const items = this.getItems();

    return (
      <nav className={cx(className, s.container, { [s.show]: show })}>
        <ul className={s.list}>
          { items }
        </ul>
      </nav>
    )
  }
}