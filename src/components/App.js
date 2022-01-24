/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { emptyCalendar, STATUS, createICS } from "../utils";
import { OneInputAndSubmitForm } from "./OneInputAndSubmitForm";

export const App = () => {
  const [calendarEvent, setCalendarEvent] = useState(emptyCalendar);
  const [status, setStatus] = useState(STATUS.IDLE);
  const [touched, setTouched] = useState({});

  //derived State
  const errors = getErrors(calendarEvent);
  const isValid = Object.keys(errors).length === 0;

  function getErrors(calendarEventObject) {
    const result = {};
    if (calendarEventObject.start === "")
      result.start = "Start Date is required";
    if (!calendarEventObject.allDay) {
      if (calendarEventObject.end === "") result.end = "End Date is required";
    }
    return result;
  }

  function handleChange(e) {
    setCalendarEvent((calendarEvent) => ({
      ...calendarEvent,
      [e.target.id]: e.target.value,
    }));
  }

  function handleCheckboxChange(e) {
    setCalendarEvent((calendarEvent) => ({
      ...calendarEvent,
      [e.target.id]: e.target.checked,
    }));
  }

  function handleNestedChange(e) {
    let newObject = { ...calendarEvent };
    newObject.recurrence = { ...calendarEvent.recurrence };
    newObject.recurrence[e.target.id] = e.target.value;
    setCalendarEvent(newObject);
  }

  function handleBlur(e) {
    setTouched((cur) => ({ ...cur, [e.target.id]: true }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.PENDING);
    if (!isValid) {
      setStatus(STATUS.REJECTED);
      return;
    }
    setStatus(STATUS.RESOLVED);
    createICS(calendarEvent);
  }

  const recurringMarkup = (
    <div className="recurring">
      <div>
        <h5>Frequency</h5>
        <label htmlFor="frequency">Repeat this event</label>
        <select
          id="frequency"
          value={calendarEvent.recurrence.frequency}
          onChange={handleNestedChange}
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
          onChange={handleNestedChange}
          min={1}
        ></input>
      </div>
      <div>
        <h5>Count</h5>
        <label htmlFor="count">Repeat for a number of occurrences</label>
        <input
          id="count"
          type="number"
          value={calendarEvent.recurrence.count}
          onChange={handleNestedChange}
          min={1}
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
        {!isValid && status === STATUS.REJECTED ? (
          <div className="alert">
            <p>Please fix the following errors:</p>
            <ul>
              {Object.keys(errors).map((key) => {
                return <li key={key}>{errors[key]}</li>;
              })}
            </ul>
          </div>
        ) : null}
        <ErrorBoundary>
          <OneInputAndSubmitForm handleSubmit={handleSubmit}>
            <label htmlFor="title">Event Title</label>
            <input
              id="title"
              type="text"
              value={calendarEvent.title}
              onChange={handleChange}
            ></input>
            <label htmlFor="location">Event Location</label>
            <input
              id="location"
              type="text"
              value={calendarEvent.location}
              onChange={handleChange}
            ></input>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              style={{ resize: "none" }}
              value={calendarEvent.description}
              onChange={handleChange}
            ></textarea>
            <div className="dateSection">
              <div className="dates">
                <label htmlFor="start">Start Date</label>
                <input
                  id="start"
                  type="datetime-local"
                  value={calendarEvent.start}
                  onChange={handleChange}
                  onBlur={handleBlur}
                ></input>
                {touched.start === true ? (
                  <div className="alert">{errors.start}</div>
                ) : null}
                <div>
                  <input
                    id="allDay"
                    type="checkbox"
                    checked={calendarEvent.allDay}
                    onChange={handleCheckboxChange}
                  ></input>
                  <label htmlFor="allDay">All Day Event</label>
                </div>
              </div>
              <div className="dates">
                <label htmlFor="end">End Date</label>
                <input
                  id="end"
                  type="datetime-local"
                  value={calendarEvent.end}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={calendarEvent.allDay}
                ></input>
                {touched.end === true ? (
                  <div className="alert">{errors.end}</div>
                ) : null}
              </div>
            </div>
            <div>
              <input
                id="recurring"
                type="checkbox"
                checked={calendarEvent.recurring}
                onChange={handleCheckboxChange}
              ></input>
              <label htmlFor="recurring">Recurring Event</label>
              {calendarEvent.recurring ? recurringMarkup : null}
            </div>
            <button type="submit" disabled={status === STATUS.PENDING}>
              Create Calendar Event
            </button>
          </OneInputAndSubmitForm>
        </ErrorBoundary>
      </section>
    </div>
  );
};
