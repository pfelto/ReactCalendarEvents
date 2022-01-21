/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ICalendar } from "datebook";

export const App = () => {
  const [calendarEvent, setCalendarEvent] = useState({});

  function createICS() {
    const config = {
      title: "Happy Hour",
      location: "The Bar, New York, NY",
      description: "Let's blow off some steam with a tall cold one!",
      start: new Date("2022-07-08T19:00:00"),
      end: new Date("2022-07-08T23:30:00"),
      // an event that recurs every two weeks:
      recurrence: {
        frequency: "WEEKLY",
        interval: 2,
      },
    };
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
            createICS();
          }}
        >
          <label htmlFor="title">Event Title</label>
          <input id="title" type="text"></input>
          <label htmlFor="location">Event Location</label>
          <input id="location" type="text"></input>
          <label htmlFor="desc">Event Description</label>
          <textarea id="desc" style={{ resize: "none" }}></textarea>
          <div className="dateSection">
            <div className="dates">
              <label htmlFor="sDate">Start Date</label>
              <input id="sDate" type="date"></input>
              <div>
                <input id="allday" type="checkbox" defaultChecked></input>
                <label htmlFor="allday">All Day Event</label>
              </div>
            </div>
            <div className="dates">
              <label htmlFor="eDate">End Date</label>
              <input id="eDate" type="date"></input>
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
