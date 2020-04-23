import React from 'react';
import axios from 'axios';
import { askForNotificationPermission } from '../../feenlabs/notifyMe.feenlabs';

import Logo from '../../assets/logo.svg';
import './Auth.sass';

const auth = props => {
  const signInUser = () => {
    const uniqueKey = document.getElementById('unique-key').value;

    axios
      .get(`${atob('aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS91c2Vycy8=')}${uniqueKey}.json`)
      .then(res => {
        if (res.data) {
          localStorage.setItem('uniqueKey', uniqueKey);
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('userPhoto', res.data.photoUrl);
          localStorage.setItem('firstVisit', JSON.stringify(true));
          if (res.data.isSinica) {
            localStorage.setItem('isSinica', JSON.stringify(true));
          }
          if ('Notification' in window && 'serviceWorker' in navigator) {
            askForNotificationPermission();
          }
          props.nextRoute();
        } else document.getElementById('sign-in-error').style.display = 'block';
      })
      .catch(err => {
        const errorMsg = document.getElementById('sign-in-error');
        errorMsg.style.display = 'block';
        errorMsg.value = 'Ошибка подключения к серверу, проверь соединение';
      });
  };

  return (
    <div className="auth">
      <div className="auth__title">
        <img src={Logo} alt="Logo" />
        <h1>Random Us</h1>
      </div>
      <div className="auth-sign-in">
        <input
          type="text"
          id="unique-key"
          className="auth-sign-in__input"
          placeholder="Введите ваш уникальный ключ..."
        />
        <div className="auth-sign-in__btn-wrapper">
          <button className="auth-sign-in__btn c-btn" onClick={signInUser}>
            Присоединиться
          </button>
          <i className="fas fa-sign-in-alt" />
        </div>
        <span id="sign-in-error" className="auth-sign-in__error">
          Не удалось распознать ключ
        </span>
      </div>
      <footer>created by FeeN Project</footer>
    </div>
  );
};

export default auth;
