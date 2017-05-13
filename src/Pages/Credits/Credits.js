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
                  <td>
                    Texto:
                  </td>
                  <td>
                    Natalia Arenas
                  </td>
                </tr>
                <tr>
                  <td>
                    Fotografías:
                  </td>
                  <td>
                    Rafael Espinosa Murcia, Unidad para la Atención y Reparación Integral a las Víctimas<br />
                    Lina Jaramillo, Ceaf, Universidad Icesi <br />
                    Jóvenes participantes del Taller de Periodismo que viene realizando en la Institución Educativa
                    César Contó, de Bellavista, la Maestría en Periodismo de la Universidad Icesi. <br />
                    Natalia Arenas
                  </td>
                </tr>
                <tr>
                  <td>
                    Música:
                  </td>
                  <td>
                    “Decimoquinto aniversario”. Grupo de Cantadoras de Pogue; Universidad Icesi; Pacifico Records y
                    Fundación Ford.
                  </td>
                </tr>
                <tr>
                  <td width="162">
                    Diseño y desarrollo:
                  </td>
                  <td>
                    Wietse Neven
                  </td>
                </tr>
                </tbody>
              </table>
              <small className={s.foottext}>Especial agradecimiento al Centro de Estudios Afrodiaspóricos, Ceaf, de la Universidad Icesi, Cali.</small>
            </div>
          </div>
        </div>
        {children}
      </div>
    )
  }
}