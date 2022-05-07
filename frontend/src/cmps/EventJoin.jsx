import React, { useEffect, useState } from 'react';
import { SocialShare } from '../cmps/SocialShare'
import { ParticipantList } from './ParticipantList';
import { socketService } from '../services/socketService';

export const EventJoin = (props) => {
  const [isMember, setIsMember] = useState(null)
  const { event, loggedInUser, updateEvent, loadEvent } = props;
  
  useEffect(() =>{
    setIsMember(checkIsMember());
  }, []);

  const checkIsMember = () => {
    if (!loggedInUser) return;
    return event.members.some((member) => {
      return member._id === loggedInUser._id;
    });
  };

  // joinModalMove = () => {
  //   setState({ showModal: true });
  //   setTimeout(() => {
  //     setState({ showModal: false });
  //   }, 5000);
  // };

  const joinEvent = async () => {
    const updatedEvent = { ...event };
    const { _id, fullname, imgUrl } = loggedInUser;
    const newMember = {
      _id,
      fullname,
      imgUrl,
      isMember: !isMember,
    };
    if (!isMember) {
      updatedEvent.members.push(newMember);
    } else {
      const memberIdx = event.members.findIndex(
        (member) => member._id === _id
      );
      updatedEvent.members.splice(memberIdx, 1);
    }

    await updateEvent(updatedEvent);
    await socketService.emit('event memberUpdated', newMember);
    await loadEvent();
    setIsMember(!isMember);
  };

  // console.log(isMember);
  return (
    <div className="call-to-action-container">
      {/* <div className="messages-container">
          <h1
            className={
              state.showModal && !state.isMember
                ? 'event-join'
                : 'event-join-hidden'
            }
          >
            {' '}
            See You Again 🙃{' '}
          </h1>
          <h1
            className={
              state.showModal && state.isMember
                ? 'event-leave'
                : 'event-leave-hidden'
            }
          >
            {' '}
            Let Play!😀
          </h1>
        </div> */}
      <div className="call-to-action">
        {/* <h2>Who's Coming?</h2> */}
        <h2 className="event-capcity">
          {`${event.members.length}/${event.capacity}`}{' '}
          <span className="had-joined">Had Joined!</span>{' '}
        </h2>
        <div>
          <div>
            <ParticipantList members={event.members} />
          </div>
        </div>
        <div className="button-event-container">
          <SocialShare event={event}></SocialShare>
          <button
            className="button-event"
            onClick={(ev) => {
              ev.preventDefault();
              joinEvent();
              // joinModalMove();
            }}
          >
            {isMember ? 'Leave Event' : 'Join Event'}
          </button>
        </div>
      </div>
    </div>
  );
};

// function mapStateToProps(state) {
//   return {
//     // loggedInUser: "u104",
//     loggedInUser: state.userModule.loggedInUser,
//   };
// }

// const mapDispatchToProps = {
//   updateEvent,
// };

// export const EventJoin = connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(_EventJoin);
