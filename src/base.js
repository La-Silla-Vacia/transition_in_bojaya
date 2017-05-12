import { h, render, Component } from 'preact';

import MainIntro from './Pages/MainIntro';
import ChapterIntro from './Pages/ChapterIntro';
import Text from './Pages/Text';

import ChapterMenu from './Components/ChapterMenu';
import Arrow from './Components/Arrow';

import s from './base.css';
const data = require('../data/data.json');

export default class Base extends Component {

  constructor() {
    super();

    this.state = {
      pages: [],
      menuItems: [],
      height: 600,
      width: 600,
      halfWidth: 300,
      currentPage: false,
      smallHeader: false
    };

    this.pages = [];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.scroll = this.scroll.bind(this);
    this.goToPage = this.goToPage.bind(this);
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
        this.updateDimensions();
        this.checkActivePage();
      }, 250);
    });
  }

  componentDidUpdate() {
    this.checkActivePage()
  }

  scroll(event) {
    const width = this.state.width;
    if (this.pagesRoot && width > 992) {
      event.preventDefault();
      const element = this.pagesRoot;
      element.scrollLeft += event.deltaY;
      element.scrollLeft += event.deltaX;

      this.checkActivePage();
    }
  }

  checkActivePage() {
    const { halfWidth, currentPage, menuItems, smallHeader, width } = this.state;
    let menuItem = false;

    if (width < 992) return;
    this.pages.map((page) => {
      const offsetLeft = page.base.getBoundingClientRect().left;
      if (page.props.in_menu) menuItem = page.props.id;

      if (offsetLeft > -halfWidth && offsetLeft < halfWidth) {
        const current = page.props.id;
        if (current === menuItem) menuItem = current;
        const newItems = [];
        // console.log(page);
        if (currentPage !== current) {
          menuItems.map((item) => {
            item.current = item.id === menuItem;
            newItems.push(item);
          });

          if (current > 1 && !smallHeader) {
            this.updateHeader();
          } else if (current <= 1 && smallHeader) {
            this.updateHeader();
          }
          this.setState({ currentPage: current, menuItems: newItems });
        }
      }
    })
  }

  updateHeader() {
    const { smallHeader } = this.state;
    const headerElement = document.querySelector('#header');
    if (!headerElement) return;
    this.setState({ smallHeader: !smallHeader });
    if (smallHeader) {
      headerElement.classList.remove('header--compact');
    } else {
      headerElement.classList.add('header--compact');
    }

    const interval = setInterval(() => {
      this.updateDimensions()
    }, 10);
    setTimeout(() => {
      clearInterval(interval);
    }, 550);
  }

  updateDimensions() {
    const { smallHeader } = this.state;
    const header = document.querySelector('#header');
    const navbarCollapse = document.querySelector('#navbarCollapse');
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const headerHeight = (smallHeader) ? ((navbarCollapse) ? navbarCollapse.offsetHeight : 0) : ((header) ? header.offsetHeight : 0);
    const interactiveHeight = windowHeight - headerHeight;
    this.setState({ height: interactiveHeight, width: windowWidth, halfWidth: windowWidth / 2 });
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
      } else {
        this.formatData(data);
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
        intro: rawItem.intro,
        content: rawItem.content,
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
    return pages.map((page, index) => {
      const { id, page_type } = page;

      let prev, next;
      if (pages[index - 1]) {
        prev = pages[index - 1].id
      }
      if (pages[index + 1]) {
        next = pages[index + 1].id
      }

      switch (page_type) {
        case 'main_intro':
          return (
            <MainIntro ref={(ref) => this.pages[index] = ref} {...page} key={id}>
              <Arrow to={prev} direction="prev" callback={this.goToPage} />
              <Arrow to={next} direction="next" callback={this.goToPage} />
            </MainIntro>
          );
          break;
        case 'chapter_intro':
          return (
            <ChapterIntro ref={(ref) => this.pages[index] = ref} {...page} key={id}>
              <Arrow to={prev} direction="prev" callback={this.goToPage} />
              <Arrow to={next} direction="next" callback={this.goToPage} />
            </ChapterIntro>
          );
          break;
        case 'text':
          return (
            <Text ref={(ref) => this.pages[index] = ref} {...page} key={id}>
              <Arrow to={prev} direction="prev" callback={this.goToPage} />
              <Arrow to={next} direction="next" callback={this.goToPage} />
            </Text>
          )
      }
    });
  }

  goToPage(id) {
    // Check if the page exists
    const pageRef = this.pages[id];
    if (pageRef) {
      const element = pageRef.base;
      const offset = element.offsetLeft;

      this.pagesRoot.classList.add(s.opacity0);
      setTimeout(() => {
        this.pagesRoot.scrollLeft = offset;
        this.checkActivePage();
      }, 500);
      setTimeout(() => {
        this.pagesRoot.classList.remove(s.opacity0);
      }, 500);
    }
  }

  render(props, state) {
    const { height, width, menuItems } = state;
    const pages = this.getPages();

    let style;
    if (width > 992) {
      style = {
        height
      };
    }

    return (
      <div className={s.container} style={style}>
        <div ref={(ref) => this.pagesRoot = ref} onWheel={this.scroll} className={s.pages}>
          {pages}
        </div>
        <ChapterMenu items={menuItems} openMenuItem={this.goToPage} />
      </div>
    )
  }
}