import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './Arrow.css';

export default class Arrow extends Component {

  constructor() {
    super();

    this.state = {
      show: false
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { callback, to } = this.props;
    callback(to);
  }

  render(props, state) {
    const { show } = state;
    const { className, direction, to } = props;
    if (!to) return;

    return (
      <button onClick={this.handleClick} className={cx(className, s.container, s[direction], { [s.show]: show })}>
        <svg className={s.icon} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
             viewBox="0 0 66 66" style="enable-background:new 0 0 66 66;" xmlSpace="preserve">
          <circle className={s.border} cx="33" cy="33" r="33" />
          <path className={s.shape} d="M32.8,14.5c-0.4,0-0.8,0.2-1.1,0.5c-0.6,0.6-0.6,1.5,0,2.1l14.9,14.4H16.3c-0.8,0-1.5,0.7-1.5,1.5c0,0.8,0.7,1.5,1.5,1.5
	h30.3L31.8,48.9c-0.6,0.5-0.7,1.5-0.2,2.1c0.4,0.3,0.8,0.5,1.2,0.5c0.3,0,0.7-0.1,1-0.4l16.4-15.9l0,0c1.2-1.2,1.2-3.2,0-4.3
	L33.9,15C33.5,14.7,33.2,14.5,32.8,14.5L32.8,14.5z" />
        </svg>
      </button>
    )
  }
}