import React from "react";
import {
  faVirus,
  faUserAltSlash,
  faHeart,
  faCalendarDay,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { cases, recovered, deaths } from "../data/data.json";

const Panel = () => {
  let active = 0;
  cases.forEach((activeCase) => {
    active += activeCase.active;
  });

  return (
    <React.Fragment>
      <div id="overview">
        <div className="col">
          <FontAwesomeIcon icon={faVirus} color='#ea6153' />
          <h4>Active</h4>
          <h4 className="active">{active.toLocaleString()}</h4>
        </div>
        <div className="col">
          <FontAwesomeIcon icon={faUserAltSlash} color='#c23616' />

          <h4>Deaths</h4>
          <h4 className="deaths">{deaths.total.toLocaleString()}</h4>
        </div>
        <div className="col">
          <FontAwesomeIcon icon={faHeart} color='#009432' />

          <h4>Recovered</h4>
          <h4 className="recovered">{recovered.total.toLocaleString()}</h4>
        </div>
        <div className="col">
          <FontAwesomeIcon icon={faCalendarDay} color='#FFC312' />

          <h4>Today</h4>
          <h4 className="warning">N/A</h4>
        </div>
      </div>
      <div id="districts">
        <div className="col">
          <h5>Cayo</h5>
        </div>
        <div className="col">
          <h5>Belize</h5>
        </div>
        <div className="col">
          <h5>Orange Walk</h5>
        </div>
        <div className="col">
          <h5>Toledo</h5>
        </div>
        <div className="col">
          <h5>Corozal</h5>
        </div>
        <div className="col">
          <h5>Stann Creek</h5>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Panel;
