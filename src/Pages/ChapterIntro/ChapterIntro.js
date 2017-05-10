import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import FadeIn from '../../Components/FadeIn';

import p from '../Pages.css';
import t from '../Typography.css';
import s from './ChapterIntro.css';

export default class ChapterIntro extends Component {

  render(props, state) {
    const { id, title, subtitle, intro, content, background_image } = props;

    const style = {
      backgroundImage: `url(${background_image})`
    };

    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={cx(p.background)} style={style} />
        <div className={p.inner}>
          <div className={s.intro}>
            <h2 className={s.title}>{ title }</h2>
            <span className={t.subTitle}>{subtitle}</span>
            <div dangerouslySetInnerHTML={{__html: md.render(String(intro))}} />
          </div>
          <div className={s.content} dangerouslySetInnerHTML={{__html: md.render(String(content))}} />
        </div>
      </div>
    )
  }
}