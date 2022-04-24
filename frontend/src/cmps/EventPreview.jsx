//everyone events. not editable

import React from 'react';
import { Link } from 'react-router-dom';
import { LocationIcon } from './icon-cmps/Location';
import { IconCalender } from './icon-cmps/IconCalender';
import { IconStar } from './icon-cmps/IconStar';
import { utilService } from '../services/utilService';

export const EventPreview = ({event}) => {
   
  let date = utilService.getTimeAndDate(event.eventDate);
  let dateString = (
    <h4 className="preview-date-time preview-normal-text"><IconCalender />
      <span className="preview-details-month">{date.month} </span> {date.day}
      <span className="preview-details-th">th</span> {date.year} -{' '}
      {event.eventTime}
    </h4>
  );

  return (
    <div className="event-preview ">
      <Link to={`/event/${event._id}`} className="preview-link">
        <div className="event-preview-img">
          <img src={event.imgs[0]} alt="" className="preview-img" />
        </div>
        <div className="counter">
          <p className="counter-color">{`${event.members.length}/${event.capacity} JOINED`}</p>
        </div>
        <div className="preview-details">
          <h2>{event.title}</h2>
          {dateString}
          <h4 className="preview-normal-text"> <LocationIcon /> {event.location} </h4>
          <div className="lower-preview">
            <div className="preview-user-details">
              <img
                className="preview-user-img"
                src={event.createdBy.imgUrl}
                alt=""
              />
              <div className="user-name-rating">
                <h4>{event.createdBy.fullname}</h4>
              </div>
            </div>
            <h5>
              <IconStar />
              {event.createdBy.rating}(5)
            </h5>
          </div>
        </div>
      </Link>
    </div>
  );
}
