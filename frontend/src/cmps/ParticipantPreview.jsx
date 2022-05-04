import React from 'react';

export function ParticipantPreview({ member }) {
  return <div className="participant"><img className="member-img-participant" src={member.imgUrl} alt=''/></div>;
}
