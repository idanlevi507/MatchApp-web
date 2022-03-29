import React, { Component } from 'react';
import InfiniteCarousel from 'react-leaf-carousel';
import { EventPreviewMyProfile } from './EventPreviewMyProfile';

export class EventListEdit extends Component {
  render() {
    let numOfEvents = this.props.events.length;
    if (numOfEvents > 4) numOfEvents = 4;
    if (numOfEvents === 0) return <div className="event-replacement" >Create/Join events to see them here</div>;
    return (
      <main className="upcoming-container-profile">
        {this.props.events.length > 0 && (
          <InfiniteCarousel
            breakpoints={[
              {
                breakpoint: 550,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1100,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 1,
                },
              },
              {
                breakpoint: 1450,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 1,
                },
              },
            ]}
            swipe={true}
            dots={false}
            showSides={false}
            sideSize={0.5}
            slidesToScroll={1}
            slidesToShow={4}
            responsive={true}
            slidesSpacing={2}
          >
            {this.props.events.map((event) => (
              <EventPreviewMyProfile
                key={event._id}
                event={event}
                onRemoveEvent={this.props.onRemoveEvent}
                isEditable={this.props.isEditable}
              />
            ))}
          </InfiniteCarousel>
        )}
      </main>
    );
  }
}
