import { storageService } from './asyncStorageService';
import { httpService } from './httpService';

// const STORAGE_KEY = 'event';
const defaultFilter = {
  type: '',
  location: '',
  date: '',
  time: '',
};

export const eventService = {
  query,
  getById,
  save,
  removeEvent,
  filterEvents
};

async function query(filterBy = defaultFilter) {
  // return storageService.query(STORAGE_KEY, filterBy);
  try {
    console.log('fetching with', filterBy);
    const gEvents = await httpService.get(`event/`);
    return filterEvents(gEvents, filterBy);
  } catch (err) {
    throw err;
  }
}

function filterEvents(gEvents, filterBy) {
  // if ( filterBy.type === '') return gEvents;
  const filteredEvents = gEvents.filter(event => {
    // return event.type.toUpperCase().includes(filterBy.type.toUpperCase());
    const evUpCaseType = event.type.toUpperCase();
    const filtUpCaseType = filterBy.type.toUpperCase();
    return (evUpCaseType.includes(filtUpCaseType)&& event.eventDate.includes(filterBy.date)
     && event.eventTime.includes(filterBy.time));
  });
  return filteredEvents;
}

// function getLocations() {
//   return storageService.queryLocations();
// }

async function getById(eventId) {
  // return storageService.get(STORAGE_KEY, eventId);
  try {
    return await httpService.get(`event/${eventId}`);
  } catch (err) {
    throw err;
  }
}

// function addEvent(newEvent) {
//   storageService.post(STORAGE_KEY, newEvent);
//   return Promise.resolve(newEvent);
// }

// function addPost(newPost) {
//   storageService.post(STORAGE_KEY, newPost);
//   return Promise.resolve(newPost);
// }

async function removeEvent(eventId) {
  // return storageService.remove(STORAGE_KEY, eventId);
  try {
    return await httpService.delete(`event/${eventId}`);
  } catch (err) {
    throw err;
  }
}

async function save(event) {
  if (event._id) {
    try {
      return await httpService.put(`event/${event._id}`, event);
    } catch (err) {
      throw err;
    }
  } else {
    try {
      return await httpService.post('event', event);
    } catch (err) {
      throw err;
    }
  }
}
