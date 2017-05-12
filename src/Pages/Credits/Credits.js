import { h, render, Component } from 'preact';
import cx from 'classnames';

import p from '../Pages.css';
import s from './Credits.css';

export default class ChapterIntro extends Component {

  render(props, state) {
    const { id, title, subtitle, children } = props;

    return (
      <div id={`page-${id}`} className={cx(p.container, s.container)}>
        <div className={p.inner}>
          <div className={p.inner_container}>
            <div className={s.intro}>
              <h2 className={s.title}>Créditos</h2>
            </div>
            <div className={s.content}>
              <table className={s.table}>
                <tbody>
                <tr>
                  <td>Historia:</td>
                  <td>Natalia Arenas</td>
                </tr>
                <tr>
                  <td>Fotos:</td>
                  <td>Nombre</td>
                </tr>
                <tr>
                  <td>Diseño y desarrollo:</td>
                  <td>Wietse Neven</td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
}