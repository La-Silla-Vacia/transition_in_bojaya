import { h, render, Component } from 'preact';
import cx from 'classnames';

import s from './FadeIn.css';

export default class FadeIn extends Component {

  constructor() {
    super();

    this.state = {
      show: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({show: true});
    }, 1000);
  }

  render(props, state) {
    const { show } = state;
    const { children, className } = props;
    return (
      <div className={cx(className, s.container, {[s.show]: show})}>
        {children}
      </div>
    )
  }
}