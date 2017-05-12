import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './ChapterMenu.css';

export default class ChapterMenu extends Component {

  constructor() {
    super();

    this.state = {
      show: false,
      hidden: false,
      current: 1
    };

    this.handleClick = this.handleClick.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ show: true });
    }, 1000);
  }

  componentWillReceiveProps(newprops) {
    const { items } = newprops;
    items.map((item) => {
      const { current, id } = item;
      if (current) this.setState({ current: id });
    });
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
      const { in_menu, id, current } = item;
      return (
        <li className={cx(s.item, { [s.current]: current })} onClick={this.handleClick.bind(this, id)} key={id}>
          <span className={s.number}>0{number}</span>
          <a href={`#page-${id}`} className={s.link}>{in_menu}</a>
        </li>
      )
    });
  }

  showNav() {
    this.setState({ hidden: false });
  }

  hideNav() {
    this.setState({ hidden: true });
  }

  toggleNav() {
    this.setState({ hidden: !this.state.hidden });
  }

  render(props, state) {
    let { show, hidden } = state;
    const { className } = props;
    const items = this.getItems();

    return (
      <nav
        className={cx(className, s.container, { [s.show]: show }, { [s.hidden ]: hidden })}
      >
        <ul className={s.list}>
          { items }
          <li className={cx(s.item, s.item__close)} onClick={this.toggleNav.bind(this)}>
            <span className={s.number}>0</span>
            <a href="#" className={s.link}>cerrar el menú</a>
          </li>
        </ul>
      </nav>
    )
  }
}