import React from 'react';
import { EventPreview } from './EventPreview';
import { EventFilter } from './EventFilter';

export function EventList({ gEvents, onRemoveEvent }) {
  return (
    <section className="list-main-containers">
      <div className="list-filter-container">
        <EventFilter events={gEvents} />
      </div>
      <div className="list-preview-container">
        {gEvents.map((event) => {
          return (
            <EventPreview
              key={event._id}
              event={event}
              onRemoveEvent={onRemoveEvent}
            />
          );
        })}
      </div>
    </section>
  );
}
