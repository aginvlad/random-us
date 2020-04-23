import React from 'react';
import PeopleInQueue from '../PeopleInQueue/PeopleInQueue';
import './RandomBlock.sass';

import noRandomsGif from '../../assets/no_randoms.gif';
import noConnectionGif from '../../assets/no_connection.gif';

const randomBlock = props => {
  if (!navigator.onLine) {
    return (
      <div className="randoms-list--no-randoms">
        <img src={noConnectionGif} alt="Relaxing" />
        <p className="no-randoms-text">
          У-у-пс, похоже, у тебя нет доступа к сети{' '}
          <span role="img" aria-label="smile">
            😯
          </span>
        </p>
        <div className="update-btn">
          <i id="refresh-icon" className="fas fa-redo-alt" />
          <button className="c-btn" onClick={props.refreshAnimation}>
            Обновить
          </button>
        </div>
      </div>
    );
  }
  return (
    <>
      {props.activeRandoms ? (
        props.activeRandoms.map((random, index) => {
          return (
            <div className="randoms-list__search-box" key={index}>
              <h3 className="search-box__title">{random.title}</h3>
              <p className="search-box__defenition">{random.description}</p>
              <PeopleInQueue people={random} />
              {random.isParticipating ? (
                <button
                  className="c-btn--view c-btn"
                  onClick={() =>
                    props.participate(index + 1, random.isParticipating)
                  }
                >
                  Посмотреть
                </button>
              ) : (
                <>
                  <button
                    className="c-btn--join c-btn"
                    style={{ marginBottom: '1rem' }}
                    onClick={() =>
                      props.participate(index + 1, random.isParticipating)
                    }
                  >
                    Участвовать
                  </button>
                  {random.config.queue && (
                    <button
                      className="c-btn--view c-btn"
                      onClick={() => props.participate(index + 1, true)}
                    >
                      Посмотреть
                    </button>
                  )}
                </>
              )}
            </div>
          );
        })
      ) : (
        <div className="randoms-list--no-randoms">
          <img src={noRandomsGif} alt="Relaxing" />
          <p className="no-randoms-text">
            Активных рандомов не найдено. Можешь отдохнуть{' '}
            <span role="img" aria-label="smile">
              🙂️️️️️
            </span>
          </p>
          <div className="update-btn">
            <i id="refresh-icon" className="fas fa-redo-alt" />
            <button className="c-btn" onClick={props.refreshAnimation}>
              Обновить
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default randomBlock;
