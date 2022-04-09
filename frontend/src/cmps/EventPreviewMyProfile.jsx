import React, { useState, useEffect } from 'react';
import { IconTrash } from './icon-cmps/IconTrash';
import { IconEdit } from './icon-cmps/IconEdit';
import { IconCalender } from './icon-cmps/IconCalender';
import { LocationIcon } from './icon-cmps/Location';
import { Link } from 'react-router-dom';

export const EventPreviewMyProfile = (props) => {
  const [isEditable, setEditable] = useState(false);

  useEffect(() => {
    if (props.isEditable) setEditable(true);
    setTypeIcon();
  }, []);

  const setTypeIcon = () => {
    const { type } = props.event;
    if (type === 'Football') props.event.typeIcon = '⚽';
    if (type === 'VolleyBall') props.event.typeIcon = '🏐';
    if (type === 'Basketball') props.event.typeIcon = '🏀';
    if (type === 'Running') props.event.typeIcon = '🏃🏼‍♂️';
  };


  const { event, onRemoveEvent } = props;
  let eventActions = (
    <div className="event-actions-profile">
      <button
        className="delete-button"
        onClick={() => {
          console.log('there');
          onRemoveEvent(event._id);
        }}
      >
        <IconTrash />
      </button>
      <Link to={`/create/${event._id}`}>
        <button>
          <IconEdit />
        </button>
      </Link>
    </div>
  );
  return (
    <div className="event-preview-profile">
      <Link to={`/event/${event._id}`} className="preview-link-profile">
        <div className="event-preview-img">
          <img src={event.imgs[0]} alt="" className="preview-img" />
        </div>
        <div className="preview-details font-style1">
          <h2 className="event-title-profile">{event.title}</h2>
          <h4 className="preview-date-time"><IconCalender />  {`${event.eventDate} - ${event.eventTime}`}</h4>
          <p><LocationIcon />  {event.location}</p>
        </div>
        <div className="counter font-style1">
          <p>{`${event.members.length}/${event.capacity} JOINED`}</p>
        </div>
      </Link>
      {isEditable ? eventActions : null}
    </div>

  )
}
