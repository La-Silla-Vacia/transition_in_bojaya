import { h, render, Component } from 'preact';

import MainIntro from './Pages/MainIntro';
import ChapterMenu from './Components/ChapterMenu';

import s from './base.css';
const data = require('../data/data.json');

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      pages: [],
      menuItems: [],
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

  scroll(event) {
    event.preventDefault();
    const element = document.querySelector('#scrollview');
    element.scrollLeft += event.deltaY;
    element.scrollLeft += event.deltaX;
  }

  updateDimensions() {
    const header = document.querySelector('#header');
    const windowHeight = window.innerHeight;
    const headerHeight = (header) ? header.offsetHeight : 0;
    const interactiveHeight = windowHeight - headerHeight;
    this.setState({ height: interactiveHeight });
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
      this.formatData(json);
      console.log('Data fetched');
    }).catch((ex) => {
      console.log('parsing failed', ex)
    })
  }

  formatData(rawData) {
    const menuItems = [];
    const pages = [];

    rawData.map((rawItem) => {
      const item = {
        id: rawItem.id,
        hidden: rawItem.hidden,
        in_menu: rawItem.in_menu,
        title: rawItem.title,
        subtitle: rawItem.subtitle,
        page_type: rawItem.page_type,
        background_image: rawItem.background_image
      };

      if (!item.hidden) pages.push(item);
      if (!item.hidden && item.in_menu) menuItems.push(item);
    });

    this.setState({ pages, menuItems });
  }

  getPages() {
    const { pages } = this.state;
    return pages.map((page) => {
      const { id } = page;

      return (
        <MainIntro {...page} key={id} />
      )
    });
  }

  render(props, state) {
    const { height, menuItems } = state;
    const pages = this.getPages();

    const style = {
      height
    };

    return (
      <div className={s.container} style={style}>
        <div id="scrollview" onWheel={this.scroll} className={s.pages}>
          {pages}
        </div>
        <ChapterMenu items={menuItems} />
      </div>
    )
  }
}