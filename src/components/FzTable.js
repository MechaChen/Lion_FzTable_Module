import React from "react";
import commaNumber from "comma-number";
import axios from "axios";

class FzTable extends React.Component {
  state = {
    setOffDays: [],
    returnDays: [],
    schedules: [],
    row: null,
    col: null
  };

  handleClick = (row, col) => {
    this.setState(() => ({ row, col }));
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
        <div className="set_off">
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
        <div className="return">
          <div className="leftBtn"></div>
          <div className="rightBtn"></div>
          <ul className="row">
            {this.state.returnDays.map(returnDay => (
              <li key={returnDay} className="info date">
                {returnDay}
              </li>
            ))}
          </ul>
          {this.state.schedules.map((row, rowIndex) => (
            <ul key={rowIndex} className="row">
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
