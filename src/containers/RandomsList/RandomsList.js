import React, { Component } from 'react';
import axios from 'axios';
import MountRefAttr from '../../components/mountRefAttr/mountRefAttr';

import SignInModal from '../../components/SignInModal/SignInModal';
import Spinner from '../../components/Spinner/Spinner';
import RandomBlock from '../../components/RandomBlock/RandomBlock';
import ControlPanel from '../../components/ControlPanel/ControlPanel';
import { askForNotificationPermission } from '../../feenlabs/notifyMe.feenlabs';
import PersonalCard from '../../components/PersonalCard/PersonalCard';
import './RandomsList.sass';

class RandomsList extends Component {
  constructor() {
    super();
    this.state = {
      signInModal: JSON.parse(localStorage.getItem('firstVisit')),
      isLoading: true,
      activeRandoms: null,
      activeSection: 0
    };
  }

  componentDidMount() {
    axios
      .get(
        `${atob(
          'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS91c2Vycy8='
        )}${localStorage.getItem('uniqueKey')}.json`
      )
      .then(res => {
        if (res.data) {
          localStorage.setItem('name', res.data.name);
          localStorage.setItem('userPhoto', res.data.photoUrl);
          if (res.data.isSinica) {
            localStorage.setItem('isSinica', JSON.stringify(true));
          }
        }
      })
      .catch(e => console.log(e));
    this.thDefineRoutesSettings();
  }

  changeSectionHandler = id => {
    this.setState({ activeSection: id });
  };

  refreshAnimationHandler = () => {
    this.thDefineRoutesSettings();
    const refreshIcon = document.getElementById('refresh-icon');
    refreshIcon.style.animation = '.5s updating';

    setTimeout(() => {
      refreshIcon.style.animation = 'none';
    }, 500);
  };

  closeSignInModalHandler = () => {
    this.setState({ signInModal: false });
    localStorage.setItem('firstVisit', JSON.stringify(false));
  };

  thDefineRoutesSettings = () => {
    const self = this;
    if (!navigator.onLine) {
      self.setState({ isLoading: false, activeRandoms: null });
      return;
    }

    axios
      .get(
        atob(
          'aHR0cHM6Ly91cy1jZW50cmFsMS1yYW5kb211c2FwcC5jbG91ZGZ1bmN0aW9ucy5uZXQvZ2V0QWN0aXZlUmFuZG9tcw=='
        )
      )
      .then(res => {
        const name = localStorage.getItem('name');
        const activeRandoms = Object.values(res.data);
        activeRandoms.map(random => {
          if (random.status.isFinished) random.isParticipating = true;
          else if (random.config.queue) {
            const queue = Object.values(random.config.queue);
            queue.map(obj => {
              if (obj.name === name) random.isParticipating = true;
              return true;
            });
          }
          return true;
        });

        self.setState({
          activeRandoms,
          isLoading: false
        });
      })
      .catch((e) => self.setState({ isLoading: false, activeRandoms: null }));
  };

  configureNotifcations = () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      askForNotificationPermission();
    }
  };

  render() {
    const { activeSection } = this.state;
    let section;

    switch (activeSection) {
      case 0: {
        section = (
          <div className="randoms-list">
            {this.state.isLoading === true ? (
              <Spinner />
            ) : (
              <>
                {this.state.signInModal === true ? (
                  <SignInModal
                    closeSignInModal={this.closeSignInModalHandler}
                  />
                ) : null}

                <RandomBlock
                  activeRandoms={this.state.activeRandoms}
                  refreshAnimation={this.refreshAnimationHandler}
                  participate={this.props.renderQueue}
                />
              </>
            )}
          </div>
        );
        break;
      }
      case 1: {
        section = (
          <div className="rules">
            <h2 className="rules__header">Правила пользования сервисом</h2>
            <p className="rules__rule">
              1. Каждый имеет право участвовать в рандоме до момента его
              закрытия.
            </p>
            <p className="rules__rule">
              2. Все рандомы закрываются рано утром, на следующий день после
              открытия. После этого никто не сможет присоединиться к ним. В
              очереди будут только те, кто получил места до дедлайна, остальные
              желающие, которые по каким-то причинам не успели или передумали,
              могут встать в конец очереди или же, если это необходимо,
              попросить большинство пропустить их в начало.
            </p>
            <p className="rules__rule">
              3. Если рандом открыт только для одной подгруппы и есть желающие
              из другой подгруппы, которые тоже хотят что-то сдать, то в этом
              случае они участвуют в рандоме, но идут только после того, как все
              ребята из другой подгруппы закончат сдавать работы, причем в
              порядке полученной очереди. <br /> <br /> Т.е. есть четрые
              человека, лаба у первой подгруппы, из первой подгруппы - человек A{' '}
              <span role="img" aria-label="person">
                👩‍
              </span>{' '}
              и человек B{' '}
              <span role="img" aria-label="person">
                👦
              </span>
              , из 2-й - человек C{' '}
              <span role="img" aria-label="person">
                👩‍
              </span>{' '}
              и человек D{' '}
              <span role="img" aria-label="person">
                👱
              </span>
              . Имеем очередь (D, A, C, B). Это значит, что сначала сдадут А{' '}
              <span role="img" aria-label="person">
                👩‍
              </span>{' '}
              и B{' '}
              <span role="img" aria-label="person">
                👦
              </span>
              , а затем D{' '}
              <span role="img" aria-label="person">
                👱
              </span>{' '}
              и C{' '}
              <span role="img" aria-label="smile">
                👩‍
              </span>
              . Конечно, если у человека есть причина и люди согласны его
              пропустить - вопросов никогда не возникает.
            </p>
            <p className="rules__rule">
              4. В случае, когда сдаём лабу одной бригадой: чтобы было
              по-честному - в рандоме участвует один человек от бригады, если же
              остальные люди из бригады тоже присоединятся, то место в очереди
              определяется по человеку, который находится первым с конца. <br />
              <br /> Например: в бригаде человек A{' '}
              <span role="img" aria-label="person">
                👩
              </span>{' '}
              и человек B{' '}
              <span role="img" aria-label="person">
                👱
              </span>
              . Человек A{' '}
              <span role="img" aria-label="person">
                👩
              </span>{' '}
              забил место на бригаду, он получил 2-е место. Человек B{' '}
              <span role="img" aria-label="person">
                👱
              </span>{' '}
              захотел схитрить и получить 1-е, он тоже просоединился к очереди,
              но получил 10-е место. Это означает, что бригада теперь идёт 10-й.{' '}
              <br /> <br />
              Так что заранее договоритесь, кто будет у вас забивать места на
              бригаду{' '}
              <span role="img" aria-label="message">
                💬
              </span>
            </p>
          </div>
        );
        break;
      }
      case 2: {
        section = (
          <div className="notifications">
            <h2 className="rules__header">
              Здесь ты можешь включить уведомления, если ты этого не сделал
            </h2>
            <button
              className="c-btn--view c-btn"
              onClick={this.configureNotifcations}
            >
              {`${
                'Notification' in window &&
                Notification.permission === 'granted'
                  ? 'Уведомления включены'
                  : 'Включить уведомления'
              }`}
            </button>
            <MountRefAttr amount={this.state.activeRandoms} />
          </div>
        );
        break;
      }
      case 3: {
        section = (
          <div className="about">
            <h1 className="about__header">Random Us App</h1>
            <h2 className="about__version">v2.2.5 Global Update</h2>
            <span className="about__account">Привязанный аккаунт:</span>
            <PersonalCard
              name={localStorage.getItem('name')}
              photo={localStorage.getItem('userPhoto')}
            />
            <footer className="about__footer">created by FeeN Project</footer>
          </div>
        );
        break;
      }
      default: {
        section = <div></div>;
        break;
      }
    }

    return (
      <div className="container">
        {section}
        <ControlPanel
          section={activeSection}
          changeSection={this.changeSectionHandler}
        />
      </div>
    );
  }
}

export default RandomsList;
