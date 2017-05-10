import { h, render, Component } from 'preact';

import s from './base.css';
const data = require('../data/data.json');

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      height: 600
    };

    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount() {
    this.setData();
    this.updateDimensions();
  }

  componentDidMount() {
    let resizeTimer;
    window.addEventListener('resize', (e) => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        this.updateDimensions()
      }, 250);
    });
  }

  updateDimensions() {
    const header = document.querySelector('#header');
    const windowHeight = window.innerHeight;
    const headerHeight = (header) ? header.offsetHeight : 0;
    const interactiveHeight = windowHeight - headerHeight;
    this.setState({ height: interactiveHeight });
    console.log(headerHeight);
  }

  setData() {
    let dataExists = true;
    let interactiveData;
    let dataUri;
    try {
      if (transition_in_bojaya_data) {
        dataExists = true;
        interactiveData = transition_in_bojaya_data;
      }
    } catch (e) {
      dataExists = false;
    }

    if (!dataExists) {
      this.setState({ data: data });
    } else {
      if (interactiveData.dataUri) {
        dataUri = interactiveData.dataUri;
        this.fetchData(dataUri);
      }
    }
  }

  fetchData(uri) {
    fetch(uri)
      .then((response) => {
        return response.json()
      }).then((json) => {
      this.setState({ data: json });
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  render(props, state) {
    const { height } = state;

    const style = {
      height
    };

    return (
      <div className={s.container} style={style}>
        Hello transition_in_bojaya!
      </div>
    )
  }
}