/* eslint-disable react/prop-types */
import React from "react";
import { createICS } from "../utils";
import { useForm } from "react-hook-form";
import { Input } from "./Input";

export const App = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data, e) => {
    e.preventDefault();
    console.log(data, e);
    createICS(data);
  };
  const onError = (errors, e) => console.log(errors, e);

  return (
    <div className="App">
      <div className="header">
        <h1>Calendar Event Details</h1>
      </div>
      <section>
        <form onSubmit={handleSubmit(onSubmit, onError)}>
          <Input
            label="Event Title"
            id="title"
            type="text"
            register={register}
          ></Input>
          <Input
            label="Event Location"
            id="location"
            type="text"
            register={register}
          ></Input>
          <Input
            label="Event Description"
            id="description"
            type="text"
            register={register}
          ></Input>
          <div className="dateSection">
            <div className="dates">
              <Input
                label="Event Start"
                id="start"
                type="datetime-local"
                register={register}
                required
              ></Input>
              {errors.start?.type === "required" && (
                <div className="alert">Start Date is Required</div>
              )}
            </div>
            <div className="dates">
              <Input
                label="Event End"
                id="end"
                type="datetime-local"
                register={register}
                required
              ></Input>
              {errors.end?.type === "required" && (
                <div className="alert">End Date is Required</div>
              )}
            </div>
          </div>
          <button type="submit">Create Calendar Event</button>
        </form>
      </section>
    </div>
  );
};

/*
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
        <form onSubmit={handleSubmit}>
          
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
        </form>
      </section>
    </div>
*/
