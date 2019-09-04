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
    curPos: 0,
    colNum: 3,
    state: 0
  };

  handleClick = (row, col) => {
    this.setState(() => ({ row, col }));
  };

  handleMobileLeftTab = () => {
    if (this.state.state > 0)
      this.setState(() => ({ state: this.state.state - 1 }));
  };

  handleMobileRightTab = () => {
    if (this.state.state < 7 / this.state.colNum - 1)
      this.setState(() => ({ state: this.state.state + 1 }));
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
    return (
      <div className="schedule">
        <div className={`set_off col-${this.state.colNum}`}>
          <ul className="row">
            <li className="info date">
              <span>去程</span>
              <span>回程</span>
            </li>
            {this.state.setOffDays.map(setOffDay => (
              <li key={setOffDay} className="info date">
                {setOffDay}
              </li>
            ))}
          </ul>
        </div>
        <div className={`return col-${this.state.colNum}`}>
          {this.state.state > 0 && (
            <div onClick={this.handleMobileLeftTab} className="leftBtn"></div>
          )}
          {this.state.state < 7 / this.state.colNum - 1 && (
            <div onClick={this.handleMobileRightTab} className="rightBtn"></div>
          )}
          <ul
            className={`row col-${this.state.colNum} state-${this.state.state}`}
          >
            {this.state.returnDays.map(returnDay => (
              <li key={returnDay} className="info date">
                {returnDay}
              </li>
            ))}
          </ul>
          {this.state.schedules.map((row, rowIndex) => (
            <ul
              key={rowIndex}
              className={`row col-${this.state.colNum} state-${this.state.state}`}
            >
              {row.map((schedule, colIndex) => (
                <li
                  key={schedule.key}
                  className={`info ${schedule.onSale ? "on_sale" : ""} ${
                    this.state.col === colIndex || this.state.row === rowIndex
                      ? "other"
                      : ""
                  } ${
                    this.state.col === colIndex && this.state.row === rowIndex
                      ? "active"
                      : ""
                  }`}
                  onClick={() => this.handleClick(rowIndex, colIndex)}
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

export default FzTable;
