import React from "react";
import SetOff from "./SetOff";
import Return from "./Return";
import axios from "axios";

class FzTable extends React.Component {
  state = {
    setOffDays: [],
    returnDays: [],
    schedules: [],
    row: null,
    col: null,
    state: 0,
    speed: this.props.speed,
    whenClick: this.props.whenClick
  };

  handleClick = ({ target }, row, col) => {
    this.setState(() => ({ row, col }));
    this.state.whenClick(target);
  };

  handleMobileLeftTab = () => {
    const { state } = this.state;
    const { slide } = this.props.count;
    this.setState(() => ({ speed: this.props.speed }));
    if (state - slide < 0) {
      this.setState(() => ({ state: 0 }));
    } else {
      this.setState(() => ({ state: state - slide }));
    }
  };

  handleMobileRightTab = () => {
    const { state } = this.state;
    const { show, slide } = this.props.count;
    this.setState(() => ({ speed: this.props.speed }));
    if (state + show < 7 - slide) {
      this.setState(() => ({ state: state + slide }));
    } else {
      this.setState(() => ({ state: 7 - show }));
    }
  };

  handleTra;

  componentDidMount() {
    // 出發日期
    axios
      .get("JSON/setOffDays.json")
      .then(res => this.setState(() => ({ setOffDays: res.data })));
    // 回歸日期
    axios
      .get("JSON/returnDays.json")
      .then(res => this.setState(() => ({ returnDays: res.data })));
    // 行程
    axios.get("JSON/schedules.json").then(res =>
      this.setState(() => ({
        schedules: res.data
      }))
    );

    window.addEventListener("resize", () => {
      this.setState(() => ({ speed: 0 }));
      if (window.innerWidth > 980) {
        this.setState(() => ({ speed: this.props.speed }));
      }
    });
  }

  render() {
    const { show } = this.props.count;
    const { setOffDays, returnDays, schedules, row, col, state } = this.state;
    const transition = { transition: `${this.state.speed}s` };
    const { handleClick, handleMobileLeftTab, handleMobileRightTab } = this;
    return (
      <div className="schedule">
        <SetOff show={show} setOffDays={setOffDays} />
        <Return
          show={show}
          state={state}
          transition={transition}
          returnDays={returnDays}
          schedules={schedules}
          row={row}
          col={col}
          handleClick={handleClick}
          handleMobileLeftTab={handleMobileLeftTab}
          handleMobileRightTab={handleMobileRightTab}
        />
      </div>
    );
  }
}

FzTable.defaultProps = {
  count: {
    show: 4,
    slide: 2
  },
  speed: 0.3,
  whenClick($element) {
    console.log($element);
  }
};

export default FzTable;
