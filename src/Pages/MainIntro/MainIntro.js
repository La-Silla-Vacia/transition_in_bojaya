import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import FadeIn from '../../Components/FadeIn';

import p from '../Pages.css';
import t from '../Typography.css';
import s from './MainIntro.css';

export default class MainIntro extends Component {

  render(props, state) {
    const { id, title, subtitle, intro, background_image } = props;

    const style = {
      backgroundImage: `url(${background_image})`
    };

    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={cx(p.background, p.background__animated)} style={style} />
        <div className={p.inner}>
          <FadeIn className={cx(p.center, t.shadow, s.title)}>
            <h1 className={t.mainTitle}>{ title }</h1>
            <span className={t.subTitle}>{subtitle}</span>
          </FadeIn>

          <div className={s.intro} dangerouslySetInnerHTML={{ __html: md.render(String(intro)) }} />
        </div>
      </div>
    )
  }
}