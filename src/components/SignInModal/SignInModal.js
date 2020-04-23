import React from 'react';

import userPic from '../../assets/user.png';
import './SignInModal.sass';

const signInModal = props => {
  return (
    <div className="sign-in-modal">
      <div className="container">
        <img
          className="sign-in-modal__user-photo"
          src={localStorage.getItem('userPhoto')}
          onError={e => {
            e.target.src = userPic;
          }}
          alt="User"
        />
        <h3 className="sign-in-modal__user-name">
          {localStorage.getItem('name')}
        </h3>
        <p className="sign-in-modal__info">
          {localStorage.getItem('name').split(' ')[0]}, авторизация прошла
          успешно! Встречай глобальное обновление Random Us.
          <br />
          &nbsp;
          <br />
          После закрытия этого окна ты увидишь секцию, где находятся активные
          рандомы, в которых ты можешь участвовать. При входе в любой из них ты
          сразу получаешь свой номер в очереди и можешь наблюдать за остальными
          ребятами. Не пугайся, что ты не видишь своего номера. Номера в очереди
          зависят от количества участников. Так что просто ориентируйся на
          очереди, которую видишь.
          <br />
          &nbsp;
          <br />
          Все готово к использованию{' '}
          <span role="img" aria-label="cool">
            🔥️🔥️🔥️
          </span>
          <br />
          &nbsp;
          <br />
          Желаю тебе почаще быть в первой пятерке{' '}
          <span role="img" aria-label="peace">
            ✌️️
          </span>
        </p>
        <button className="c-btn--red c-btn" onClick={props.closeSignInModal}>
          ОК
        </button>
      </div>
    </div>
  );
};

export default signInModal;
