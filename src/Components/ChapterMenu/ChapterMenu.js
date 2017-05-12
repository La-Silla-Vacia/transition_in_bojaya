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

    let buttonText = (hidden) ? 'menú' : 'Cerrar';

    return (
      <div>
        <nav
          className={cx(className, s.container, { [s.show]: show }, { [s.hidden ]: hidden })}
        >
          <ul className={s.list}>
            { items }
          </ul>
        </nav>
        <button className={cx(s.item, s.item__close, {[s.button__hidden]: hidden})} onClick={this.toggleNav.bind(this)}>
          <svg className={s.close_icon} x="0" y="0" viewBox="0 0 100 100">
            <path className={s.cross} d="M98.9,2.4c-1.3-1.3-3.4-1.3-4.5,0L50.6,45.5L5.6,1C4.3-0.3,2.3-0.3,1.1,1c-1.3,1.3-1.3,3.3,0,4.5L46,50L1,94.6
	c-1.3,1.3-1.3,3.3,0,4.5c0.6,0.6,1.4,0.9,2.3,0.9s1.7-0.3,2.3-0.9l45.1-44.6l43.6,43.2c0.6,0.6,1.4,0.9,2.3,0.9
	c0.9,0,1.7-0.3,2.3-0.9c1.3-1.3,1.3-3.3,0-4.5L55.2,50L98.9,6.9C100.1,5.6,100.1,3.5,98.9,2.4L98.9,2.4z" />
          </svg>
          <a href="#" className={s.link}>{buttonText}</a>
        </button>
      </div>
    )
  }
}