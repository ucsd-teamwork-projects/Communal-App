import React, { Component } from "react";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./styles.css";
import SocialCard from "../SocialCard";

const list = [
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>,
  <SocialCard/>
];

const MenuItem = ({ children, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{children}</div>;
};

export const Menu = list =>
  list.map((el, idx) => {

    return (<MenuItem key={idx} > {el} </MenuItem>);
    
  });

const Arrow = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};
Arrow.propTypes = {
  text: PropTypes.string,
  className: PropTypes.string
};

export const ArrowLeft = Arrow({ text: "<", className: "arrow-prev" });
export const ArrowRight = Arrow({ text: ">", className: "arrow-next" });

class HorizontalScroll extends Component {
  state = {
    alignCenter: true,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    hideSingleArrow: true,
    itemsCount: list.length,
    selected: "item1",
    translate: 0,
    transition: 0.4,
    wheel: true
  };

  constructor(props) {
    super(props);
    this.menu = null;
    this.menuItems = Menu(list.slice(0, list.length), this.state.selected);
  }

  onUpdate = ({ translate }) => {
    console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  setItemsCount = ev => {
    const { itemsCount = list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= list.length && val >= 0
        ? +ev.target.value
        : list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(list.slice(0, itemsCountNew), selected);
      this.setState({
        itemsCount: itemsCountNew
      });
    }
  };

  setSelected = ev => {
    const { value } = ev.target;
    this.setState({ selected: String(value) });
  };

  render() {
    const {
      alignCenter,
      clickWhenDrag,
      hideArrows,
      dragging,
      hideSingleArrow,
      // itemsCount,
      selected,
      translate,
      transition,
      wheel
    } = this.state;

    const menu = this.menuItems;

    // const checkboxStyle = {
    //   margin: "5px 10px"
    // };
    // const valueStyle = {
    //   margin: "5px 10px",
    //   display: "inline-block"
    // };

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Your Socials!</h1>
        </header>
        <p className="App-intro">
         Don't forget! Take a pic of your adventure and post it on the Event Page!
        </p>

        <ScrollMenu
          ref={el => (this.menu = el)}
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          hideArrows={hideArrows}
          hideSingleArrow={hideSingleArrow}
          transition={+transition}
          onUpdate={this.onUpdate}
          onSelect={this.onSelect}
          selected={selected}
          translate={translate}
          alignCenter={alignCenter}
          dragging={dragging}
          clickWhenDrag={clickWhenDrag}
          wheel={wheel}
        />
        <hr />
    
      </div>
    );
  }
}

export default HorizontalScroll;