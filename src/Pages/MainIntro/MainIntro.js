import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import FadeIn from '../../Components/FadeIn';
import AudioPlayer from '../../Components/AudioPlayer';

import p from '../Pages.css';
import s from './MainIntro.css';

export default class MainIntro extends Component {

  render(props, state) {
    const { id, title, subtitle, intro, background_image, children } = props;

    const style = {
      backgroundImage: `url(${background_image})`
    };

    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={cx(p.background, p.background__animated)} style={style} />
        <div className={p.inner}>
          <FadeIn className={s.title}>
            <h1 className={s.mainTitle}>{ title }</h1>
            <AudioPlayer />
            <p className={s.subTitle}>{subtitle}</p>
            <div className={s.intro}><p>{intro}</p></div>
          </FadeIn>
        </div>
        {children}
      </div>
    )
  }
}