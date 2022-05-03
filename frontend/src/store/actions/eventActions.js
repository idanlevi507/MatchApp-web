// import { reviewService } from '../../services/reviewService';
// import { userService } from '../../services/userService';
import { eventService } from '../../services/eventService';


export function loadAllEvents() {
  return async (dispatch) => {
    try {
      const filterBy = { type: '', location: '', date: '', time: '' }
      const allEvents = await eventService.query();
      dispatch({ type: 'SET_ALLEVENTS', allEvents });
      dispatch({ type: 'SET_EVENTS', eventData: { filteredEvents: allEvents, filterBy } });
    } catch (err) {
      console.log('EventActions: err in loadAllEvents', err);
    }
  }
}

export function loadEvents(filterBy) {
  return async (dispatch) => {
    try {
      const filteredEvents = await eventService.query(filterBy);
      dispatch({ type: 'SET_EVENTS', eventData: { filteredEvents, filterBy } });
    } catch (err) {
      console.log('EventActions: err in loadEvents', err);
    }
  };
}

export function updateFilter(filterBy) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER', eventData: { filterData: filterBy } });
    } catch (err) {
      console.log('EventActions: err in update filterBy', err);
    }
  };
}

export function filterEvents(filterBy) {
  return async (dispatch, storeState) => {
    try {
      const { eventModule } = storeState();
      const filteredEvents = await eventService.filterEvents(eventModule.allEvents, filterBy);
      dispatch({ type: 'SET_EVENTS', eventData: { filteredEvents, filterBy } });
    } catch (err) {
      console.log('EventActions: err in loadEvents', err);
    }
  };
}

export function loadLocations() {
  return async (dispatch) => {
    try {
      const locations = await eventService.getLocations();
      dispatch({ type: 'SET_LOCATIONS', locations });
    } catch (err) {
      console.log('EventActions: err in loadLocations', err);
    }
  };
}


export function setFilter(filterData) {
  return async (dispatch) => {
    try {
      dispatch({ type: 'SET_FILTER', filterData });
      // dispatch(loadEvents(filterData))
    } catch (err) {
      console.log('EventActions: err in setFilter', err);
    }
  };
}

export function clearEvent() {
  return async (dispatch) => {
    try {
      dispatch({ type: 'CLEAR_EVENT' });
    } catch (err) {
      console.log('EventActions: err in clearEvent', err);
    }
  };
}

export function addEvent(newEvent) {
  console.log(newEvent);
  return async (dispatch) => {
    try {
      const addedEvent = await eventService.save(newEvent);
      console.log(addedEvent);
      dispatch({ type: 'ADD_EVENT', addedEvent });
      // getEventById(addedEvent._id);
      return addedEvent;
    } catch (err) {
      console.log('EventActions: err in addEvent', err);
    }
  };
}

export function getEventById(eventId) {
  return async (dispatch) => {
    try {
      const event = await eventService.getById(eventId);
      dispatch({ type: 'SET_EVENT', event });
      return event;
    } catch (err) {
      console.log('EventActions: err in getEvenById', err);
    }
  };
}

export function removeEvent(eventId) {
  return async (dispatch) => {
    try {
      await eventService.removeEvent(eventId);
      dispatch({ type: 'REMOVE_EVENT', eventId });
    } catch (err) {
      console.log('EventActions: err in removeEvent', err);
    }
  };
}

export function updateEvent(event) {
  return async (dispatch) => {
    try {
      const updatedEvent = await eventService.save(event);
      console.log('eventActions- update event', updatedEvent.members);
      dispatch({ type: 'UPDATE_EVENT', event: updatedEvent });

      // getEventById(updatedEvent._id);
    } catch (err) {
      console.log('EventActions: err in updated Event', err);
    }
  };
}
