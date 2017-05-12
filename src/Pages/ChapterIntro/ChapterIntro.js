import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import p from '../Pages.css';
import s from './ChapterIntro.css';

export default class ChapterIntro extends Component {

  render(props, state) {
    const { id, title, subtitle, intro, content, background_image, children } = props;

    const style = {
      backgroundImage: `url(${background_image})`
    };

    const formattedIntro = (intro) ? md.render(String(intro)) : false;
    const formattedContent = (content) ? md.render(String(content)) : false;
    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={cx(p.background, s.background)} style={style} />
        <div className={p.inner}>
          <div className={p.inner_container}>
            <div className={s.intro}>
              <h2 className={s.title}>{ title }</h2>
              <span>{subtitle}</span>
              <div dangerouslySetInnerHTML={{ __html: formattedIntro }} />
            </div>
            <div className={s.content} dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
        </div>
        {children}
      </div>
    )
  }
}