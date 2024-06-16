import { useState } from "react";
import "./App.css";

// Create a section for education and expertise next

const capitalize = (text) => text[0].toUpperCase() + text.slice(1);

function Info(props) {
    if (props.type ==="website") {

        return (
            <div className="info-wrapper">
                <ion-icon name={props.icon + "-outline"}></ion-icon>
                <a className={props.type +"-info"}>{props.text}</a>
            </div>
        );
    }
    return (
        <div className="info-wrapper">
            <ion-icon name={props.icon + "-outline"}></ion-icon>
            <p className={props.type +"-info"}>{props.text}</p>
        </div>
    );
}

function Education(props) {
    return (
        <div>
            <h3 className="degree">{props.degree}</h3>
            <h4 className="university">{props.university}</h4>
            <p className="period">{props.period}</p>
        </div>
    );
}

function Section(props) {
    if (props.type === "general-info") {
        return(
            <>
                <h2>General Info</h2>
                <div className="section general-info" >
                    <Info icon="call" type="telephone" text={props.telephone}/>
                    <Info icon="mail" type="mail" text={props.mail}/>
                    <Info icon="desktop" type="website" text={props.website}/>
                    <Info icon="location" type="location" text={props.location}/>
                </div>
            </>
        );
    } else if (props.type === "education") {
        return(
            <>
                <h2>Education</h2>
                <div className="section education">
                    {props.list.map(e => <Education key={e.degree} degree={e.degree} university={e.university} period={e.period} />)}
                </div>
            </>
        );
    } else {
        return (
            <>
                <h2>{capitalize(props.type)}</h2>
                <div className="section">
                    {props.list.map(e => <p key={e}>{e}</p>)}
                </div>
            </>
        );
    }
}

function App() {
    const generalInfo = {
        name: "Olivia Wilson",
        job: "Computer Scientist",
        telephone: "+1-234-567-789",
        mail: "oliviawilson@gmail.com",
        website: "oliviawilson.com",
        location: "20 Cooper Square, New York, NY 10003, USA",
    };

    const education = [
        {
            degree: "Bachelor of Computer Science",
            university: "University of Purdue",
            period: "2008-2012"
        },
        {
            degree: "Master of Computer Science",
            university: "University of Purdue",
            period: "2013-2015"
        },
    ];

    const expertises = [
        "Low level programming",
        "Integrated systems",
        "Network programming",
        "Compilers",
    ];

    const languages = ["English", "French", "Spanish", "Mandarin Chinese"];

  return (
        <div id="main">
            <div className="left-section">
                <Section 
                    type="general-info"
                    telephone={generalInfo.telephone} 
                    mail={generalInfo.mail}
                    website={generalInfo.website}
                    location={generalInfo.location}
                />
                <Section type="education" list={education} />
                <Section type="expertise" list={expertises} />
                <Section type="language" list={languages} />
            </div>
            <div className="right-section">

            </div>

        </div>
  );
}

export default App;
