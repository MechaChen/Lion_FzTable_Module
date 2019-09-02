import React from "react";
import commaNumber from "comma-number";

class FzTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setOffDays: [
        "12/27(三)",
        "12/28(四)",
        "12/29(五)",
        "12/30(六)",
        "12/31(日)",
        "01/01(一)",
        "01/02(二)"
      ],
      returnDays: [
        "12/30(六)",
        "12/31(日)",
        "01/01(一)",
        "01/02(二)",
        "01/03(三)",
        "01/04(四)",
        "01/05(五)"
      ],
      schedules: [
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: 15568,
            onSale: false
          },
          {
            key: 3,
            price: 15568,
            onSale: false
          },
          {
            key: 4,
            price: 15568,
            onSale: false
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 15568,
            onSale: false
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: 15568,
            onSale: false
          },
          {
            key: 2,
            price: 12300,
            onSale: true
          },
          {
            key: 3,
            price: 15568,
            onSale: false
          },
          {
            key: 4,
            price: 15568,
            onSale: false
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 15568,
            onSale: false
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: 15568,
            onSale: false
          },
          {
            key: 3,
            price: 15568,
            onSale: false
          },
          {
            key: 4,
            price: 15568,
            onSale: false
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 15568,
            onSale: false
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: null,
            onSale: false
          },
          {
            key: 3,
            price: 15568,
            onSale: false
          },
          {
            key: 4,
            price: 12300,
            onSale: true
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 15568,
            onSale: false
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: null,
            onSale: false
          },
          {
            key: 3,
            price: null,
            onSale: false
          },
          {
            key: 4,
            price: 15568,
            onSale: false
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 12300,
            onSale: true
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: null,
            onSale: false
          },
          {
            key: 3,
            price: null,
            onSale: false
          },
          {
            key: 4,
            price: null,
            onSale: false
          },
          {
            key: 5,
            price: 15568,
            onSale: false
          },
          {
            key: 6,
            price: 12300,
            onSale: true
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ],
        [
          {
            key: 1,
            price: null,
            onSale: false
          },
          {
            key: 2,
            price: null,
            onSale: false
          },
          {
            key: 3,
            price: null,
            onSale: false
          },
          {
            key: 4,
            price: null,
            onSale: false
          },
          {
            key: 5,
            price: null,
            onSale: false
          },
          {
            key: 6,
            price: 12300,
            onSale: true
          },
          {
            key: 7,
            price: 15568,
            onSale: false
          }
        ]
      ]
    };
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
          {this.state.schedules.map((row, index) => (
            <ul key={index} className="row">
              {row.map(schedule => (
                <li
                  key={schedule.key}
                  className={`info ${schedule.onSale && "on_sale"}`}
                >
                  {schedule.price ? (
                    <span className="price">
                      {`$${commaNumber(schedule.price)}`}
                      <span className="ex">起</span>
                    </span>
                  ) : (
                    "--"
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
