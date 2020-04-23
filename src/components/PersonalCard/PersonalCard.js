import React from 'react';

import './PersonalCard.sass';
import userPic from '../../assets/user.png';
import sinica from '../../assets/sinica.png';

const personalCard = props => {
  let personalCardClass = 'personal-card';
  if(props.personalRole === 'winner') {
      personalCardClass = 'personal-card personal-card--winner';
  }
  return (
    <div className={personalCardClass}>
      {props.personalRole === 'winner' ? <span className="personal-card--the-crown" role="img" aria-label="crown">👑️</span> : null}
      <img className="personal-card__photo" onError={(e)=>{e.target.src=userPic}} src={props.photo} alt="Person" />
      <div className="personal-card__name">{props.name}</div>
      {props.personalRole === 'sinica' ? <img className="personal-card--sinica" src={sinica} alt="Sinica"></img> : null}
    </div>
  );
};

export default personalCard;
