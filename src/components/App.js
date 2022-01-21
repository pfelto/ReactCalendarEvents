/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ICalendar } from "datebook";

const emptyCalendar = {
  title: "",
  description: null,
  location: "",
  start: "",
  end: null,
  recurrence: {
    frequency: null,
    interval: null,
    count: null,
    monthdays: null,
    weekstart: null,
  },
};

export const App = () => {
  const [calendarEvent, setCalendarEvent] = useState(emptyCalendar);

  function createICS(event) {
    const config = {
      title: event.title,
      location: event.location,
      description: "Let's blow off some steam with a tall cold one!",
      start: new Date(event.start),
      end: new Date(event.start),
      // an event that recurs every two weeks:
    };
    console.log(event);

    const icalendar = new ICalendar(config);

    icalendar.download();
  }
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
                <input id="allday" type="checkbox" defaultChecked></input>
                <label htmlFor="allday">All Day Event</label>
              </div>
            </div>
            <div className="dates">
              <label htmlFor="eDate">End Date</label>
              <input id="eDate" type="datetime-local"></input>
            </div>
          </div>
          <div>
            <input id="recurring" type="checkbox"></input>
            <label htmlFor="recurring">Recurring Event</label>
          </div>
          <button type="submit">Create Calendar Event</button>
        </form>
      </section>
    </div>
  );
};
