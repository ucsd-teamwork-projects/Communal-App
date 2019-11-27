import React, { Component } from "react";
import PropTypes from "prop-types";
import ScrollMenu from "react-horizontal-scrolling-menu";
import "./styles.css";
import SocialCard from "../SocialCard";
import API from "../../utils/API";

// const list = [{item: "item1"}];

const MenuItem = ({ children, selected }) => {
  return <div className={`menu-item ${selected ? "active" : ""}`}>{children}</div>;
};

export const Menu = list => {
  return list.map((el, idx) => {

    return (<MenuItem key={idx} > {el} </MenuItem>);
    
  });
};

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
    alignCenter: false,
    clickWhenDrag: false,
    dragging: true,
    hideArrows: true,
    itemsCount: this.props.posts.length,
    hideSingleArrow: true,
    selected: "0",
    translate: 0,
    transition: 0.4,
    wheel: true
  };
  
  constructor(props) {
    super(props);
    this.menu = null;
    this.list = props.posts;

    this.menuItems = Menu(this.list.slice(0, this.list.length), this.state.selected);

  }
  
  onUpdate = ({ translate }) => {
    // console.log(`onUpdate: translate: ${translate}`);
    this.setState({ translate });
  };

  onSelect = key => {
    // console.log(`onSelect: ${key}`);
    this.setState({ selected: key });
  };

  componentDidUpdate(prevProps, prevState) {
    const { alignCenter } = prevState;
    const { alignCenter: alignCenterNew } = this.state;
    if (alignCenter !== alignCenterNew) {
      this.menu.setInitial();
    }
  }

  componentDidMount() {
    this.setState({itemsCount: this.menuItems.length});
  }

  setItemsCount = ev => {
    const { itemsCount = this.list.length, selected } = this.state;
    const val = +ev.target.value;
    const itemsCountNew =
      !isNaN(val) && val <= this.list.length && val >= 0
        ? +ev.target.value
        : this.list.length;
    const itemsCountChanged = itemsCount !== itemsCountNew;

    if (itemsCountChanged) {
      this.menuItems = Menu(this.list.slice(0, itemsCountNew), selected);
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
      itemsCount,
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
      <div className="scrollApp" style={{"width": "100%"}}>
        
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
      </div>
    );
  }
}

export default HorizontalScroll;