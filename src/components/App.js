/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ICalendar } from "datebook";

const emptyCalendar = {
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
    Addd these later as it adds more complexity
    end: null,
    weekdays: null,
    monthdays: null,
    weekstart: null,
    */
  },
  allDay: true,
  recurring: false,
};

export const App = () => {
  const [calendarEvent, setCalendarEvent] = useState(emptyCalendar);

  function createICS(event) {
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
          title: event.title,
          location: event.location,
          description: event.description,
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

    console.log(event);

    const icalendar = new ICalendar(config);

    icalendar.download();
  }

  const recurringMarkup = (
    <div className="recurring">
      <div>
        <h5>Frequency</h5>
        <label htmlFor="frequncy">Repeat this event</label>
        <select
          id="frequncy"
          value={calendarEvent.recurrence.frequency}
          onChange={(e) => {
            let newObject = JSON.parse(JSON.stringify(calendarEvent));
            newObject.recurrence.frequency = e.target.value;
            setCalendarEvent(newObject);
          }}
        >
          <option value="DAILY">DAILY</option>
          <option value="WEEKLY">WEEKLY</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="YEARLY">YEARLY</option>
        </select>
      </div>
      <div>
        <h5>Interval</h5>
        <label htmlFor="interval">Repeat every</label>
        <input
          id="interval"
          type="number"
          value={calendarEvent.recurrence.interval}
          onChange={(e) => {
            let newObject = JSON.parse(JSON.stringify(calendarEvent));
            newObject.recurrence.interval = e.target.value;
            setCalendarEvent(newObject);
          }}
        ></input>
      </div>
      <div>
        <h5>Count</h5>
        <label htmlFor="count">Repeat for a number of occurrences</label>
        <input
          id="count"
          type="number"
          value={calendarEvent.recurrence.count}
          onChange={(e) => {
            let newObject = JSON.parse(JSON.stringify(calendarEvent));
            newObject.recurrence.count = e.target.value;
            setCalendarEvent(newObject);
          }}
        ></input>
      </div>
    </div>
  );

  return (
    <div className="App">
      <div className="header">
        <h1>Calendar Event Details</h1>
      </div>
      <section>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createICS(calendarEvent);
          }}
        >
          <label htmlFor="title">Event Title</label>
          <input
            id="title"
            type="text"
            value={calendarEvent.title}
            onChange={(e) =>
              setCalendarEvent((calendarEvent) => ({
                ...calendarEvent,
                title: e.target.value,
              }))
            }
          ></input>
          <label htmlFor="location">Event Location</label>
          <input
            id="location"
            type="text"
            value={calendarEvent.location}
            onChange={(e) =>
              setCalendarEvent((calendarEvent) => ({
                ...calendarEvent,
                location: e.target.value,
              }))
            }
          ></input>
          <label htmlFor="desc">Event Description</label>
          <textarea
            id="desc"
            style={{ resize: "none" }}
            value={calendarEvent.description}
            onChange={(e) =>
              setCalendarEvent((calendarEvent) => ({
                ...calendarEvent,
                description: e.target.value,
              }))
            }
          ></textarea>
          <div className="dateSection">
            <div className="dates">
              <label htmlFor="sDate">Start Date</label>
              <input
                id="sDate"
                type="datetime-local"
                value={calendarEvent.start}
                onChange={(e) =>
                  setCalendarEvent((calendarEvent) => ({
                    ...calendarEvent,
                    start: e.target.value,
                  }))
                }
                required
              ></input>
              <div>
                <input
                  id="allday"
                  type="checkbox"
                  checked={calendarEvent.allDay}
                  onChange={() =>
                    setCalendarEvent((calendarEvent) => ({
                      ...calendarEvent,
                      allDay: !calendarEvent.allDay,
                    }))
                  }
                ></input>
                <label htmlFor="allday">All Day Event</label>
              </div>
            </div>
            <div className="dates">
              <label htmlFor="eDate">End Date</label>
              <input
                id="eDate"
                type="datetime-local"
                value={calendarEvent.end}
                onChange={(e) =>
                  setCalendarEvent((calendarEvent) => ({
                    ...calendarEvent,
                    end: e.target.value,
                  }))
                }
                disabled={calendarEvent.allDay}
                required={calendarEvent.allDay ? false : true}
              ></input>
            </div>
          </div>
          <div>
            <input
              id="recurring"
              type="checkbox"
              checked={calendarEvent.recurring}
              onChange={() =>
                setCalendarEvent((calendarEvent) => ({
                  ...calendarEvent,
                  recurring: !calendarEvent.recurring,
                }))
              }
            ></input>
            <label htmlFor="recurring">Recurring Event</label>
            {calendarEvent.recurring ? recurringMarkup : null}
          </div>
          <button type="submit">Create Calendar Event</button>
        </form>
      </section>
    </div>
  );
};
