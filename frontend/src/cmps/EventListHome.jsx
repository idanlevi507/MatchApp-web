import React from 'react';
import { EventPreview } from './EventPreview';
import InfiniteCarousel from 'react-leaf-carousel';

export const EventListHome = (props) => {

  return (
    <main className="upcoming-container">
      {props.events.length > 0 && (
        <InfiniteCarousel
          breakpoints={[
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 900,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 1,
              },
            },
            {
              breakpoint: 2200,
              settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
              },
            },
          ]}
          swipe={true}
          dots={false}
          showSides={false}
          sideSize={0.5}
          slidesToScroll={1}
          slidesToShow={5}
          responsive={true}
          slidesSpacing={10}
        >
          {props.events.map((event) => (
            <EventPreview
              key={event._id}
              event={event}
            />
          ))}
        </InfiniteCarousel>
      )}
    </main>
  );
}
