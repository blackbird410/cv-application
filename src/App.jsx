import { useState } from "react";
import "./App.css";

// Create a section for education and expertise next

const generalInfo = {
    name: "Olivia Wilson",
    job: "Computer Scientist",
    telephone: "+1-234-567-789",
    mail: "oliviawilson@gmail.com",
    website: "oliviawilson.com",
    location: "20 Cooper Square, New York, NY 10003, USA",
    profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum consequat dictum lorem, eu faucibus turpis volutpat at. Donec sagittis convallis condimentum. Cras faucibus luctus ex, ac fringilla nulla. Praesent sollicitudin viverra volutpat. Ut eu hendrerit neque. In neque est, interdum scelerisque semper ac, volutpat eu ligula. Praesent tempus justo vel mollis euismod. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eu semper arcu. Nulla nibh mauris, vehicula nec tincidunt dignissim, posuere ut orci. Fusce ac tincidunt nisi. Fusce nec nibh suscipit nisl porttitor porta. In a ligula in nisi sollicitudin laoreet vel in sapien. Morbi elementum volutpat tellus vitae convallis. Fusce convallis odio ligula, sit amet pharetra nisi ornare quis.",

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

let experiences = [
    {
        start: "2016",
        end: "2020",
        institution: "TSMC",
        role: "Senior Engineer",
        responsibilities: [
            "Developing new products or solving practical computing problems",
            "Conducting research involving experimentation and modeling",
            "Seeking to improve the performance of existing computer systems and software",
        ],
    },
    {
        start: "2020",
        end: "2023",
        institution: "Amazon",
        role: "Senior Developper",
        responsibilities: [
            "Thinking about and conceptualizing computational and maths-related problems and challenges",
            "Designing and implementing algorithms and data structures to solve complex computational problems",
            "Conducting research to advance the field of computer science and contribute to scientific publications",
        ],
    },
    {
        start: "2023",
        end: "",
        institution: "Google",
        role: "Senior Researcher",
        responsibilities: [
            "Testing and evaluating computer systems and software to ensure functionality, reliability, and security", 
            "Keeping up-to-date with the latest advancements in technology and continuously expanding knowledge and skills", "Mentoring and providing guidance to junior team members or students pursuing studies in computer science",
        ],
    },
];

const references = [
    {
        name: "John Doe",
        institution: "Google",
        phone: "+1-258-795-963",
        mail: "jdoe@gmail.com",
    },
    {
        name: "郭泰森",
        institution: "TSMC (台積電)",
        phone: "+886-979-952-325",
        mail: "blackbird410@gmail.com",
    },
    {
        name: "Peter Solomon",
        institution: "Amazon",
        phone: "+1-258-795-923",
        mail: "solomonpete@gmail.com",
    },
];

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
            <p className={props.type +"-info"}>{(props.text) ? props.text : capitalize(props.type) }</p>
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

function Header(props) {
    return (
        <div className="header-wrapper">
            <h1 className="username">{props.name}</h1>
            <h2 className="user-job">{props.job}</h2>
        </div>
    );
}

function Profile(props) {
    return(
        <div className="profile">
            <Info icon="person" type="profile" />
            <p className="profile-text">{props.text}</p>
        </div>
    );
}

function Experience(props) {
    return(
        <div className="experience">
            <div className="period">
                <p>{props.start}<br></br>-<br></br>{props.end}</p>
            </div>
            <div className="description">
                <h3 className="institution">{props.institution}</h3>
                <p className="role">{props.role}</p>
                <ul>
                    {props.jobs.map(j => 
                        <li key={j} className="responsibility">{j}</li>)
                    }
                </ul>
            </div>
        </div>
    );
}

function ExperienceList(props) {
    return (
        <div className="experience-list">
            <Info icon="briefcase" type="work experience"/>
            <div className="experience-wrapper">
                {props.experiences.map(e => 
                    <Experience 
                        key={e.institution} 
                        start={e.start} 
                        end={e.end} 
                        institution={e.institution} 
                        jobs={e.responsibilities} 
                        role={e.role} />)}
            </div>
        </div>
    );
}

function Reference(props) {
    return(
        <div className="reference">
            <h3 className="name">{props.name}</h3>
            <p className="institution">{props.institution}</p>
            <p><a>Phone:</a> {props.phone}</p>
            <p><a>Email:</a> {props.mail}</p>
        </div>
    );
}

function ReferenceList(props) {
    return(
        <div className="reference-list">
            <Info icon="book" type="references"/>
            <div className="reference-wrapper">
                {props.references.map(e => 
                    <Reference 
                        key={e.name} 
                        name={e.name}
                        institution={e.institution} 
                        phone={e.phone} 
                        mail={e.mail} />)}
            </div>
        </div>
    );
}

function App() {
    experiences = experiences.sort((a, b) => b.start - a.start);

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
                <Header name={generalInfo.name} job={generalInfo.job}/>
                <Profile text={generalInfo.profile}/>
                <ExperienceList experiences={experiences} />
                <ReferenceList references={references} />
            </div>
        </div>
  );
}

export default App;
