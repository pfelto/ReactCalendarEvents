# React Calendar Events App

creating an app that will take user input and create an .ics file that can be used by any calendar software.

using [DateBook Library](https://datebook.dev/docs/)

- found these sites while looking too
  - [How to Generate Calendar Events programmatically](https://javascript.plainenglish.io/how-to-generate-calendar-events-programmatically-for-browser-and-nodejs-using-javascript-157c5f54b761)
  - ["Add event to a calendar" repository](https://github.com/InteractionDesignFoundation/add-event-to-calendar-docs)
  - [ics file structure](https://www.webdavsystem.com/server/creating_caldav_carddav/calendar_ics_file_structure/)

<details>
<summary>Lessons Learned</summary>

1. React Scaffolding is confusing starting out but setting it up once gives a lot of insight into what create-react-app and other "frameworks" are doing behind the scenes. Also, this does not change much from project to project so I will look into a way to automate this so I can use my own over create-react-app on future simple React Apps. I want to try Next.js and Remix soon.

- Little confusing the random webpack plugins that are required and there settings. HtmlWebpackPlugin can take in a minify object, like how are you suppose to know that plugin is so import?

2. Most natural way of handling forms in React for me is by Controlled components as it all comes into React. You save input values to state and update them. Renders are a lot as you run into a re-render of the whole form on every input change but makes the most senses. I found basic inputs easily to do in React Hook Form however, but i could not easily recreate the whole application with that library after 2+ hours of reading and testing.

- Controlled Forms in React also require a lot of additional code for validation, state for input value/checked, onChange, onSubmit, onBlur, etc which can lead to alot of noise if not separated correctly.
- got a strong grip on Controlled Components, but not so much uncontrolled and will require some more work with useRef and React Hook Forms.

</details>
