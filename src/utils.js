import { ICalendar } from "datebook";

export const emptyCalendar = {
  title: "",
  description: "",
  location: "",
  start: "",
  end: "",
  //recurrence is not supported in Yahoo or Outlook calendars using dateBook
  recurrence: {
    frequency: "DAILY",
    interval: 1,
    count: 1,
    /*
      Add these later as it adds more complexity
      end: null,
      weekdays: null,
      monthdays: null,
      weekstart: null,
    */
  },
  allDay: true,
  recurring: false,
};

export const STATUS = {
  IDLE: "IDLE",
  PENDING: "PENDING",
  RESOLVED: "RESOLVED",
  REJECTED: "REJECTED",
};

export function createICS(event) {
  let config = {};
  if (event.allDay) {
    if (event.recurring) {
      config = {
        title: event.title,
        location: event.location,
        description: event.description,
        start: new Date(event.start),
        end: new Date(event.start),
        // an event that recurs every two weeks:
        recurrence: {
          frequency: event.recurrence.frequency,
          interval: event.recurrence.interval,
          count: event.recurrence.count,
          /*
          count: null,
          Addd these later as it adds more complexity
          end: null,
          weekdays: null,
          monthdays: null,
          weekstart: null,
          */
        },
      };
    } else {
      config = {
        title: event.title || "",
        location: event.location || "",
        description: event.description || "",
        start: new Date(event.start),
        end: new Date(event.start),
      };
    }
  } else {
    if (event.recurring) {
      config = {
        title: event.title,
        location: event.location,
        description: event.description,
        start: new Date(event.start),
        end: new Date(event.end),
        // an event that recurs every two weeks:
        recurrence: {
          frequency: event.recurrence.frequency,
          interval: event.recurrence.interval,
          count: event.recurrence.count,
          /*
            interval: null,
            count: null,
            Addd these later as it adds more complexity
            end: null,
            weekdays: null,
            monthdays: null,
            weekstart: null,
            */
        },
      };
    } else {
      config = {
        title: event.title,
        location: event.location,
        description: event.description,
        start: new Date(event.start),
        end: new Date(event.end),
      };
    }
  }

  const icalendar = new ICalendar(config);

  icalendar.download();
}
