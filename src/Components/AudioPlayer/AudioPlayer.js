import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './AudioPlayer.css';

export default class Arrow extends Component {

  constructor() {
    super();

    this.state = {
      playing: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.handleReplay = this.handleReplay.bind(this);
  }

  handleClick() {
    this.play();
  }

  play() {
    // start music
    const music = this.music;
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
    const music = this.music;
    music.currentTime = 0;
    music.play();
    this.setState({ playing: true });
  }

  render(props, state) {
    const { playing } = state;

    return (
      <div className={s.container}>
        <audio id="music" ref={(ref) => this.music = ref} preload="true">
          <source
            src="https://github.com/La-Silla-Vacia/transition_in_bojaya/raw/master/data/audio/DECIMO_QUINTO_ANIVERSARIO.mp3" />
          <source src="https://github.com/La-Silla-Vacia/transition_in_bojaya/raw/master/data/audio/DECIMO_QUINTO_ANIVERSARIO.ogg" />
        </audio>
        <div className={s.buttons}>
          <button className={cx(s.button, { [s.playing]: playing })} onClick={this.handleClick}>
            <svg x="0" y="0" className={s.icon} viewBox="0 0 100 100">
              <circle className={s.circle} cx="50" cy="50" r="48.5" />
              <polygon className={cx(s.play, s.shape)} points="65.7,50 35.5,32.6 35.5,67.4 " />
              <g className={s.pause}>
                <rect x="35.5" y="32.6" className={s.shape} width="8.8" height="34.9" />
                <rect x="57" y="32.6" className={s.shape} width="8.8" height="34.9" />
              </g>
            </svg>
          </button>
          <button className={s.replay} title="Repetición" onClick={this.handleReplay}>
            <svg x="0" y="0" className={s.icon} viewBox="0 0 100 100">
              <path className={s.shape}
                    d="M1.4,64.7v29.4l10.3-10.3c9.1,10,22.4,16.2,36.8,16.2c27.6,0,50-22.4,50-50S76.1,0,48.5,0C34.4,0,21.7,5.9,12.6,15.3	l8.2,8.5c6.8-7.4,16.8-12.1,27.6-12.1c21.2,0,38.2,17.1,38.2,38.2S69.7,88.2,48.5,88.2c-11.2,0-21.5-5-28.5-12.6l10.9-10.9L1.4,64.7	z" />
            </svg>
          </button>
        </div>
        <div className={s.title}>
          Listen to the music of the 15th aniversary
        </div>
      </div>
    )
  }
}