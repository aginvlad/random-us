import React, { Component } from 'react';
import axios from 'axios';

import Spinner from '../../components/Spinner/Spinner';
import PersonalCard from '../../components/PersonalCard/PersonalCard';
import './Queue.sass';

class Queue extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      currentQueue: [],
      isFinished: false,
      title: ''
    };
  }

  componentDidMount() {
    const self = this;
    if (!this.props.randomInfo.isParticipating) {
      axios
        .get(
          `${atob(
            'aHR0cHM6Ly91cy1jZW50cmFsMS1yYW5kb211c2FwcC5jbG91ZGZ1bmN0aW9ucy5uZXQvam9pblNlbGVjdGVkUXVldWU/dW5pcXVlS2V5PQ=='
          )}${localStorage.getItem('uniqueKey')}&index=${
            this.props.randomInfo.index
          }`
        )
        .then(res => {
          self.setState({
            currentQueue: Object.values(res.data.config.queue),
            isLoading: false,
            title: res.data.title
          });
        })
        .catch(e => console.log(e)
        );
    } else {
      this.getSelectedQueue();
    }
  }

  getSelectedQueue = () => {
    const refreshIcon = document.getElementById('refresh-icon');
    if (refreshIcon)
      refreshIcon.style.animation = '.8s updating linear infinite';

    const self = this;
    axios
      .get(
        `${atob(
          'aHR0cHM6Ly91cy1jZW50cmFsMS1yYW5kb211c2FwcC5jbG91ZGZ1bmN0aW9ucy5uZXQvZ2V0U2VsZWN0ZWRRdWV1ZT9pbmRleD0='
        )}${this.props.randomInfo.index}`
      )
      .then(res => {
        const title = res.data.title;
        if (res.data.status.isFinished) {
          self.setState(
            {
              currentQueue: Object.values(res.data.config.queue),
              isLoading: false,
              isFinished: true,
              title
            },
            () => {
              if (refreshIcon) refreshIcon.style.animation = 'none';
            }
          );
        } else
          self.setState(
            {
              currentQueue: Object.values(res.data.config.queue),
              isLoading: false,
              title
            },
            () => {
              if (refreshIcon) refreshIcon.style.animation = 'none';
            }
          );
      })
      .catch(e => console.log(e)
      );
  };

  refreshAnimationHandler = () => {
    const refreshIcon = document.getElementById('refresh-icon');
    refreshIcon.style.animation = '.5s updating';

    setTimeout(() => {
      refreshIcon.style.animation = 'none';
    }, 500);
  };

  render() {
    let isFirst = true;
    return (
      <div className="queue">
        {this.state.isLoading ? (
          <Spinner />
        ) : (
          <>
            <header>
              <div className="queue__header">
                <i
                  id="go-back-to-randoms-list-btn"
                  className="fas fa-arrow-left"
                  onClick={this.props.renderRandomsLists}
                />
                <h2 className="queue__title">{this.state.title}</h2>
                <i
                  id="refresh-icon"
                  className="fas fa-redo-alt"
                  onClick={this.getSelectedQueue}
                />
              </div>
              <div className="queue__status">
                Статус:{' '}
                <span>{this.state.isFinished ? 'завершён' : 'в процессе'}</span>
              </div>
            </header>
            <div className="queue__list">
              {this.state.currentQueue.map((person, i) => {
                if (person) {
                  if (isFirst) {
                    isFirst = false;
                    return (
                      <PersonalCard
                        personalRole="winner"
                        name={person.name}
                        photo={person.photoUrl}
                        key={i}
                      />
                    );
                  }
                  if (person.isSinica) {
                    return (
                      <PersonalCard
                        personalRole="sinica"
                        name={person.name}
                        photo={person.photoUrl}
                        key={i}
                      />
                    );
                  }
                  return (
                    <PersonalCard
                      name={person.name}
                      photo={person.photoUrl}
                      key={i}
                    />
                  );
                }
                return true;
              })}
            </div>
          </>
        )}
      </div>
    );
  }
}

export default Queue;
