import React from 'react';

import './PeopleInQueue.sass';

const peopleInQueue = props => {
  if (!props.people.config.queue)
    return <div className="people-in-queue"></div>;

  const people = Object.values(props.people.config.queue);
  const peopleWithPhoto = people.length > 3 ? 3 : people.length;
  const participants = [];

  for (let i = 0; i < peopleWithPhoto; i++) {
    participants.push(people[i]);
  }

  return (
    <div className="people-in-queue">
      <div style={{ transform: `translateX(${peopleWithPhoto * 7}px)` }}>
        {participants.map((person, i) => {
          return (
            <img
              className="participants"
              src={person.photoUrl}
              key={i}
              alt="participant"
            />
          );
        })}
      </div>
      {people.length > 3 && <span>+{people.length - 3} чел.</span>}
    </div>
  );
};

export default peopleInQueue;
