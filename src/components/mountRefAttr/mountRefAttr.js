import React, { Component } from 'react';
import axios from 'axios';

import './mountRefAttr.sass';

class MountRefAttr extends Component {
  constructor() {
    super();
    this.state = {
      _parse_th_attrib: '#fjgan2mdla9'
    };
  }
  __parse_on_mount_jdl = () => {
    const self = this;
    axios
      .get(
        `${atob(
          'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS91c2Vycy8='
        )}${localStorage.getItem('uniqueKey')}.json`
      )
      .then(res => {
        if (!res.data.aol_attribute) return;
        res.data.aol_attribute.title = document.getElementById(
          'gHdfi31ms9fk'
        ).value;
        res.data.aol_attribute.description = document.getElementById(
          'jHeivmXm2otl'
        ).value;
        let randomId = 1;
        if (this.props.amount) {
          randomId = this.props.amount.length + 1;
        }
        axios
          .put(
            `${atob(
              'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS9yYW5kb21zMWc4WWVock5hOTIzNE1hZDVGODNGZ2hzbmV3L3JhbmRvbS0='
            )}${randomId}.json`,
            res.data.aol_attribute
          )
          .then(() => {
            self.__parse_on_dismount_jdl();
            window.location.reload();
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  };
  __parse_on_dismount_jdl = () => {
    this.setState({ _parse_th_attrib: '#fjgan2mdla9' });
  };
  __eval_drive_cache_data = () => {
    this.setState({ _parse_th_attrib: '#8fsam2hfld9wj' });
  };
  __eval_sw_pwl_cache_data = () => {
    const answ = prompt('');
    if (!answ) return;
    const result = this.props.amount[answ - 1].status.isFinished;
    axios
      .put(
        `${atob(
          'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS9yYW5kb21zMWc4WWVock5hOTIzNE1hZDVGODNGZ2hzbmV3L3JhbmRvbS0='
        )}${answ}/status.json`,
        { isFinished: !result }
      )
      .then(() => window.location.reload())
      .catch(err => alert('Error: ' + err.message));
  };
  __reconfig_mte_wpa_data_attrib_set = () => {
    const answ = prompt('');
    axios
      .delete(
        `${atob(
          'aHR0cHM6Ly9yYW5kb211c2FwcC5maXJlYmFzZWlvLmNvbS9yYW5kb21zMWc4WWVock5hOTIzNE1hZDVGODNGZ2hzbmV3L3JhbmRvbS0='
        )}${answ}.json`
      )
      .then(() => window.location.reload())
      .catch(e => console.log(e)
      );
  };
  render() {
    return (
      <>
        {this.state._parse_th_attrib === '#8fsam2hfld9wj' ? (
          <div className="mount-ref-attr__doubled">
            <input id="gHdfi31ms9fk" placeholder="Заголовок" />
            <textarea id="jHeivmXm2otl" placeholder="Описание" />
            <button onClick={this.__parse_on_mount_jdl}>Опубликовать</button>
            <button onClick={this.__parse_on_dismount_jdl}>Вернуться</button>
          </div>
        ) : (
          <div className="mount-ref-attr">
            <div className="mount-ref-attr__container">
              <i className="fas fa-plus" />
              <button
                className="mount-ref-attr__btn mount-ref-attr__btn--c"
                onClick={this.__eval_drive_cache_data}
              >
                Создать
              </button>
            </div>
            <div className="mount-ref-attr__container">
              <i className="fas fa-flag-checkered" />
              <button
                className="mount-ref-attr__btn mount-ref-attr__btn--f"
                onClick={this.__eval_sw_pwl_cache_data}
              >
                Завершить
              </button>
            </div>
            <div className="mount-ref-attr__container">
              <i className="fas fa-trash-alt" />
              <button
                className="mount-ref-attr__btn mount-ref-attr__btn--d"
                onClick={this.__reconfig_mte_wpa_data_attrib_set}
              >
                Удалить
              </button>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default MountRefAttr;
