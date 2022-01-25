/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { ErrorBoundary } from "../ErrorBoundary";
import { emptyCalendar, STATUS, createICS } from "../utils";
import { GenericInput } from "./GenericInput";
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
        <GenericInput
          id="interval"
          type="number"
          value={calendarEvent.recurrence.interval}
          onChange={handleNestedChange}
          min={1}
        >
          Repeat every
        </GenericInput>
      </div>
      <div>
        <h5>Count</h5>
        <GenericInput
          id="count"
          type="number"
          value={calendarEvent.recurrence.count}
          onChange={handleNestedChange}
          min={1}
        >
          Repeat for a number of occurrences
        </GenericInput>
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
            <GenericInput
              id="title"
              type="text"
              value={calendarEvent.title}
              onChange={handleChange}
            >
              Event Title
            </GenericInput>
            <GenericInput
              id="location"
              type="text"
              value={calendarEvent.location}
              onChange={handleChange}
            >
              Event Location
            </GenericInput>
            <label htmlFor="description">Event Description</label>
            <textarea
              id="description"
              style={{ resize: "none" }}
              value={calendarEvent.description}
              onChange={handleChange}
            ></textarea>
            <div className="dateSection">
              <div className="dates">
                <GenericInput
                  id="start"
                  type="datetime-local"
                  value={calendarEvent.start}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  Start Date
                </GenericInput>
                {touched.start === true ? (
                  <div className="alert">{errors.start}</div>
                ) : null}
                <div>
                  <GenericInput
                    id="allDay"
                    type="checkbox"
                    checked={calendarEvent.allDay}
                    onChange={handleCheckboxChange}
                  >
                    All Day Event
                  </GenericInput>
                </div>
              </div>
              <div className="dates">
                <GenericInput
                  id="end"
                  type="datetime-local"
                  value={calendarEvent.end}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  disabled={calendarEvent.allDay}
                >
                  End Date
                </GenericInput>
                {touched.end === true ? (
                  <div className="alert">{errors.end}</div>
                ) : null}
              </div>
            </div>
            <div>
              <GenericInput
                id="recurring"
                type="checkbox"
                checked={calendarEvent.recurring}
                onChange={handleCheckboxChange}
              >
                Recurring
              </GenericInput>
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
