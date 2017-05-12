import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './ChapterMenu.css';
import a from '../AudioPlayer/AudioPlayer.css';

export default class ChapterMenu extends Component {

  constructor() {
    super();

    this.state = {
      show: false,
      hidden: false,
      current: 1,
      playing: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.showNav = this.showNav.bind(this);
    this.hideNav = this.hideNav.bind(this);
    this.handleAudioClick = this.handleAudioClick.bind(this);
    this.play = this.play.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
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
    const { width } = this.props;
    const { openMenuItem } = this.props;
    openMenuItem(id);
    if (width < 992) {
      this.setState({ hidden: false });
    }
  }

  getItems() {
    const { items } = this.props;
    return items.map((item, index) => {
      const number = index + 1;
      const { in_menu, id, current } = item;
      return (
        <li className={cx(s.item, { [s.current]: current })} onClick={this.handleClick.bind(this, id)} key={id}>
          <span className={s.number}>0{number}</span>
          <a className={s.link}>{in_menu}</a>
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

  handleAudioClick() {
    this.play();
  }

  play() {
    // start music
    const music = document.querySelector('#music');
    if (music.paused) {
      music.play();
      // remove play, add pause
      this.setState({ playing: true });
    } else { // pause music
      music.pause();
      // remove pause, add play
      this.setState({ playing: false });
    }
  }

  handleReplay() {
    const music = document.querySelector('#music');
    if (music) {
      music.currentTime = 0;
      music.play();
      this.setState({ playing: true });
    }
  }

  getAudio() {
    const { playing } = this.state;
    return (
      <div className={s.audioPlayerMini}>
        <button className={cx(a.button, { [a.playing]: playing })} onClick={this.handleAudioClick}>
          <svg x="0" y="0" className={s.icon} viewBox="0 0 100 100">
            <circle className={a.circle} cx="50" cy="50" r="48.5" />
            <polygon className={cx(a.play, a.shape)} points="65.7,50 35.5,32.6 35.5,67.4 " />
            <g className={a.pause}>
              <rect x="35.5" y="32.6" className={a.shape} width="8.8" height="34.9" />
              <rect x="57" y="32.6" className={a.shape} width="8.8" height="34.9" />
            </g>
          </svg>
        </button>
        <button className={a.replay} title="Repetición" onClick={this.handleReplay}>
          <svg x="0" y="0" className={a.icon} viewBox="0 0 100 100">
            <path className={a.shape}
                  d="M1.4,64.7v29.4l10.3-10.3c9.1,10,22.4,16.2,36.8,16.2c27.6,0,50-22.4,50-50S76.1,0,48.5,0C34.4,0,21.7,5.9,12.6,15.3	l8.2,8.5c6.8-7.4,16.8-12.1,27.6-12.1c21.2,0,38.2,17.1,38.2,38.2S69.7,88.2,48.5,88.2c-11.2,0-21.5-5-28.5-12.6l10.9-10.9L1.4,64.7	z" />
          </svg>
        </button>
      </div>
    )
  }

  render(props, state) {
    let { show, hidden, current } = state;
    const { className } = props;
    const items = this.getItems();

    let buttonText = (hidden) ? 'Cerrar' : 'Menú';

    const audio = (current !== 1) ? this.getAudio() : '';

    return (
      <div>
        <nav
          className={cx(className, s.container, { [s.show]: show }, { [s.hidden ]: hidden })}
        >
          <ul className={s.list}>
            { items }
          </ul>
        </nav>

        {audio}

        <button className={cx(s.item, s.item__close, { [s.button__hidden]: hidden })}
                onClick={this.toggleNav.bind(this)}>
          <svg className={s.close_icon} x="0" y="0" viewBox="0 0 100 100">
            <path className={s.cross} d="M98.9,2.4c-1.3-1.3-3.4-1.3-4.5,0L50.6,45.5L5.6,1C4.3-0.3,2.3-0.3,1.1,1c-1.3,1.3-1.3,3.3,0,4.5L46,50L1,94.6
	c-1.3,1.3-1.3,3.3,0,4.5c0.6,0.6,1.4,0.9,2.3,0.9s1.7-0.3,2.3-0.9l45.1-44.6l43.6,43.2c0.6,0.6,1.4,0.9,2.3,0.9
	c0.9,0,1.7-0.3,2.3-0.9c1.3-1.3,1.3-3.3,0-4.5L55.2,50L98.9,6.9C100.1,5.6,100.1,3.5,98.9,2.4L98.9,2.4z" />
          </svg>
          <a className={s.link}>{buttonText}</a>
        </button>
      </div>
    )
  }
}