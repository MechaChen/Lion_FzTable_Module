import React from "react";
import commaNumber from "comma-number";

const Return = props => {
  const {
    show,
    state,
    transition,
    returnDays,
    schedules,
    col,
    handleClick,
    handleMobileLeftTab,
    handleMobileRightTab
  } = props;

  return (
    <div className={`return col-${show}`}>
      {state > 0 && (
        <div onClick={handleMobileLeftTab} className="leftBtn"></div>
      )}
      {state + show < 7 && (
        <div onClick={handleMobileRightTab} className="rightBtn"></div>
      )}
      <ul className={`row col-${show} state-${state}`} style={transition}>
        {returnDays.map(returnDay => (
          <li
            key={returnDay}
            className={`info date ${
              returnDay.match(/^01\/01/) ? "new_year" : ""
            }`}
          >
            {returnDay}
          </li>
        ))}
      </ul>
      {schedules.map((row, rowIndex) => (
        <ul
          key={rowIndex}
          className={`row col-${show} state-${state} `}
          style={transition}
        >
          {row.map((schedule, colIndex) => (
            <li
              key={schedule.key}
              className={`info ${schedule.onSale ? "on_sale" : ""} ${
                col === colIndex || props.row === rowIndex ? "other" : ""
              } ${col === colIndex && props.row === rowIndex ? "active" : ""}`}
              onClick={e => handleClick(e, rowIndex, colIndex)}
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
  );
};

export default Return;
