import React from "react";

const SetOff = props => {
  const { show, setOffDays } = props;

  return (
    <div className={`set_off col-${show}`}>
      <ul className="row">
        <li className="info date">
          <span>去程</span>
          <span>回程</span>
        </li>
        {setOffDays.map(setOffDay => (
          <li
            key={setOffDay}
            className={`info date ${
              setOffDay.match(/^01\/01/) ? "new_year" : ""
            }`}
          >
            {setOffDay}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SetOff;
