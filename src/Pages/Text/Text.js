import { h, render, Component } from 'preact';
import cx from 'classnames';
const MarkdownIt = require('markdown-it'),
  md = new MarkdownIt();

import p from '../Pages.css';
import t from '../Typography.css';
import s from './Text.css';

export default class Text extends Component {

  render(props, state) {
    const { id, content, background_image, children } = props;

    const style = {
      backgroundImage: `url(${background_image})`
    };

    const formattedContent = (content) ? md.render(String(content)) : false;
    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={cx(p.background, s.background)} style={style} />
        <div className={p.inner}>
          <div className={p.inner_container}>
            <div className={s.content} dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
        </div>
        {children}
      </div>
    )
  }
}