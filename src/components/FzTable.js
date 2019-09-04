import React from "react";
import commaNumber from "comma-number";
import axios from "axios";

class FzTable extends React.Component {
  state = {
    setOffDays: [],
    returnDays: [],
    schedules: [],
    row: null,
    col: null,
    state: 0,
    count: {
      colNum: this.props.count.colNum,
      slide: this.props.count.slide
    },
    speed: this.props.speed,
    whenClick: this.props.whenClick
  };

  handleClick = ({ target }, row, col) => {
    this.setState(() => ({ row, col }));
    this.state.whenClick(target);
  };

  handleMobileLeftTab = () => {
    const { state } = this.state;
    const { slide } = this.state.count;
    if (state - slide < 0) {
      this.setState(() => ({ state: 0 }));
    } else {
      this.setState(() => ({ state: state - slide }));
    }
  };

  handleMobileRightTab = () => {
    const { state } = this.state;
    const { colNum, slide } = this.state.count;
    if (state + colNum < 7 - slide) {
      this.setState(() => ({ state: state + slide }));
    } else {
      this.setState(() => ({ state: 7 - colNum }));
    }
  };

  componentDidMount() {
    // 行程
    axios.get("JSON/schedules.json").then(res =>
      this.setState(() => ({
        schedules: res.data
      }))
    );
    // 出發日期
    axios
      .get("JSON/setOffDays.json")
      .then(res => this.setState(() => ({ setOffDays: res.data })));
    // 回歸日期
    axios
      .get("JSON/returnDays.json")
      .then(res => this.setState(() => ({ returnDays: res.data })));
  }

  render() {
    const { colNum } = this.state.count;
    const { setOffDays, col, state } = this.state;
    const transition = { transition: `${this.state.speed}s` };
    return (
      <div className="schedule">
        <div className={`set_off col-${this.state.colNum}`}>
          <ul className="row">
            <li className="info date">
              <span>去程</span>
              <span>回程</span>
            </li>
            {setOffDays.map(setOffDay => (
              <li key={setOffDay} className="info date">
                {setOffDay}
              </li>
            ))}
          </ul>
        </div>
        <div className={`return col-${colNum}`}>
          {state > 0 && (
            <div onClick={this.handleMobileLeftTab} className="leftBtn"></div>
          )}
          {state + colNum < 7 && (
            <div onClick={this.handleMobileRightTab} className="rightBtn"></div>
          )}
          <ul className={`row col-${colNum} state-${state}`} style={transition}>
            {this.state.returnDays.map(returnDay => (
              <li key={returnDay} className="info date">
                {returnDay}
              </li>
            ))}
          </ul>
          {this.state.schedules.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className={`row col-${colNum} state-${state}`}
              style={transition}
            >
              {row.map((schedule, colIndex) => (
                <li
                  key={schedule.key}
                  className={`info ${schedule.onSale ? "on_sale" : ""} ${
                    col === colIndex || this.state.row === rowIndex
                      ? "other"
                      : ""
                  } ${
                    col === colIndex && this.state.row === rowIndex
                      ? "active"
                      : ""
                  }`}
                  onClick={e => this.handleClick(e, rowIndex, colIndex)}
                >
                  {schedule.price ? (
                    <span className="price">
                      {`$${commaNumber(schedule.price)}`}
                      <span className="ex">起</span>
                    </span>
                  ) : (
                    <span>{rowIndex === 0 ? "--" : "查看"}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

FzTable.defaultProps = {
  count: {
    colNum: 4,
    slide: 2
  },
  speed: 0.3,
  whenClick($element) {
    console.log($element);
  }
};

export default FzTable;
