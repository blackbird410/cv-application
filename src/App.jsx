import { useState } from "react";
import "./App.css";

function Field(props) {
  if (props.min) {
    return (
      <div className="field-wrapper">
        <label for={props.id}>{props.labelText}: </label>
        <input
          type={props.type}
          id={props.id}
          name={props.name}
          min={props.min}
          value={props.min}
        ></input>
      </div>
    );
  }

  return (
    <div className="field-wrapper">
      <label for={props.id}>{props.labelText}: </label>
      <input type={props.type} id={props.id} name={props.name}></input>
    </div>
  );
}

function Edit(props) {
  return <button className={props.section + "-btn"}>Edit</button>;
}

function Submit(props) {
  return (
    <button className={props.section + "-btn"} type="submit">
      Submit
    </button>
  );
}

// A section to add general information
function GeneralInfo(props) {
  return (
    <section className="general-info">
      <Field id="name" labelText="Name" type="text" name="name" />
      <Field id="usermail" labelText="Email" type="email" name="usermail" />
      <Field id="userphone" labelText="Phone" type="tel" name="userphone" />
      <Edit section="general-info" />
      <Submit section="general-info" />
    </section>
  );
}

function Education(props) {
  return (
    <section className="education">
      <Field
        id="school-name"
        labelText="School"
        type="text"
        name="school-name"
      />
      <Field
        id="title-of-study"
        labelText="Title of study"
        type="text"
        name="title-of-study"
      />
      <Field
        id="date-of-study-start"
        labelText="Start date"
        type="date"
        name="date-of-study-start"
        min="1950-01-01"
      />
      <Field
        id="date-of-study-end"
        labelText="End date"
        type="date"
        name="date-of-study-end"
        min="1950-01-01"
      />
      <Edit section="education" />
      <Submit section="education" />
    </section>
  );
}

function Experience(props) {
  return (
    <section className="experience">
      <Field
        id="company-name"
        labelText="Company"
        type="text"
        name="company-name"
      />
      <Field
        id="company-position"
        labelText="Position"
        type="text"
        name="company-position"
      />
      <Field
        id="date-of-experience-start"
        labelText="Start date"
        type="date"
        name="date-of-experience-start"
        min="1950-01-01"
      />
      <Field
        id="date-of-experience-end"
        labelText="End date"
        type="date"
        name="date-of-experience-end"
        min="1950-01-01"
      />
      <Edit section="experience" />
      <Submit section="experience" />
    </section>
  );
}

function App() {
  return (
    <form>
      <GeneralInfo />
      <Education />
      <Experience />
    </form>
  );
}

export default App;
