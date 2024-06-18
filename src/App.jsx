import { useState } from "react";
import "./App.css";

// Sample data
const initialGeneralInfo = {
    name: "Olivia Wilson",
    job: "Computer Scientist",
    telephone: "+1-234-567-789",
    mail: "oliviawilson@gmail.com",
    website: "oliviawilson.com",
    location: "20 Cooper Square, New York, NY 10003, USA",
    profile: "Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
};

const initialEducation = [
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

const initialExpertises = [
    "Low level programming",
    "Integrated systems",
    "Network programming",
    "Compilers",
];

const initialLanguages = ["English", "French", "Spanish", "Mandarin Chinese"];

let initialExperiences = [
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
        role: "Senior Developer",
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
            "Keeping up-to-date with the latest advancements in technology and continuously expanding knowledge and skills",
            "Mentoring and providing guidance to junior team members or students pursuing studies in computer science",
        ],
    },
];

const initialReferences = [
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

function Info({ icon, type, text }) {
    if (type === "website") {
        return (
            <div className="info-wrapper">
                <ion-icon name={`${icon}-outline`}></ion-icon>
                <a className={`${type}-info`}>{text}</a>
            </div>
        );
    }
    return (
        <div className="info-wrapper">
            <ion-icon name={`${icon}-outline`}></ion-icon>
            <p className={`${type}-info`}>{text ? text : capitalize(type)}</p>
        </div>
    );
}

function Education({ degree, university, period, handleRemove}) {
    return (
        <div>
            <div className="education-header">
                <h3 className="degree">{degree}</h3>
                <ion-icon name="trash" onClick={handleRemove}></ion-icon>
            </div>
            <h4 className="university">{university}</h4>
            <p className="period">{period}</p>
        </div>
    );
}

function Section({ type, list, generalInfo, handleEdit, handleRemove }) {
    if (type === "general-info") {
        return (
            <>
                <div className="section-header">
                    <h2>General Info</h2>
                    <ion-icon name="create-outline" onClick={() => handleEdit(type)}></ion-icon>
                </div>
                <div className="section general-info">
                    <Info icon="call" type="telephone" text={generalInfo.telephone} />
                    <Info icon="mail" type="mail" text={generalInfo.mail} />
                    <Info icon="desktop" type="website" text={generalInfo.website} />
                    <Info icon="location" type="location" text={generalInfo.location} />
                </div>
            </>
        );
    } else if (type === "education") {
        return (
            <>
                <div className="section-header">
                    <h2>Education</h2>
                    <ion-icon name="add-circle" onClick={() => handleEdit(type)}></ion-icon>
                </div>
                <div className="section education">
                    {list.map((e) => (
                        <Education 
                            key={e.degree} 
                            degree={e.degree} 
                            university={e.university} 
                            period={e.period} 
                            handleRemove={handleRemove} />
                    ))}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="section-header">
                    <h2>{capitalize(type)}</h2>
                    <ion-icon name="add-circle" onClick={() => handleEdit(type)}></ion-icon>
                </div>
                <div className="section">
                    {list.map((e) => (
                        <div key={e} className={`${type}-wrapper`}>
                            <p>{e}</p>
                            <ion-icon name="trash" onClick={handleRemove}></ion-icon>
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

function Header({ name, job }) {
    return (
        <div className="header-wrapper">
            <h1 className="username">{name}</h1>
            <h2 className="user-job">{job}</h2>
        </div>
    );
}

function Profile({ text }) {
    return (
        <div className="profile">
            <Info icon="person" type="profile" />
            <p className="profile-text">{text}</p>
        </div>
    );
}

function Experience({ start, end, institution, role, jobs }) {
    return (
        <div className="experience">
            <div className="period">
                <p>
                    {start}
                    <br />-
                    <br />
                    {end}
                </p>
            </div>
            <div className="description">
                <h3 className="institution">{institution}</h3>
                <p className="role">{role}</p>
                <ul>
                    {jobs.map((j) => (
                        <li key={j} className="responsibility">{j}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ExperienceList({ experiences }) {
    return (
        <div className="experience-list">
            <Info icon="briefcase" type="work experience" />
            <div className="experience-wrapper">
                {experiences.map((e) => (
                    <Experience
                        key={e.institution}
                        start={e.start}
                        end={e.end}
                        institution={e.institution}
                        jobs={e.responsibilities}
                        role={e.role}
                    />
                ))}
            </div>
        </div>
    );
}

function Reference({ name, institution, phone, mail }) {
    return (
        <div className="reference">
            <h3 className="name">{name}</h3>
            <p className="institution">{institution}</p>
            <p>
                <a>Phone:</a> {phone}
            </p>
            <p>
                <a>Email:</a> {mail}
            </p>
        </div>
    );
}

function ReferenceList({ references }) {
    return (
        <div className="reference-list">
            <Info icon="book" type="references" />
            <div className="reference-wrapper">
                {references.map((e) => (
                    <Reference
                        key={e.name}
                        name={e.name}
                        institution={e.institution}
                        phone={e.phone}
                        mail={e.mail}
                    />
                ))}
            </div>
        </div>
    );
}

const getIconName = (input) => {
    if (input === "name") return "person";
    else if (input === "job") return "briefcase";
    else if (input === "telephone") return "call";
    else if (input === "mail") return input;
    else if (input === "website") return "desktop";
    else if (input === "location") return "location";
    else if (input === "degree") return "ribbon";
    else if (input === "university") return "school";
    else if (input === "period") return "hourglass";
    else if (input === "language") return "language";
    else return "information-circle";
};

function App() {
    initialExperiences = initialExperiences.sort((a, b) => b.start.localeCompare(a.start));
    const [generalInfo, setGeneralInfo] = useState(initialGeneralInfo);
    const [education, setEducation] = useState(initialEducation);
    const [expertises, setExpertises] = useState(initialExpertises);
    const [languages, setLanguages] = useState(initialLanguages);
    const [experiences, setExperiences] = useState(initialExperiences);
    const [references, setReferences] = useState(initialReferences);
    const [isEditing, setIsEditing] = useState(false); 

    const handleEdit = (section) => {
        setIsEditing(section);
    };

    const handleSave = (updatedInfo) => {
        setGeneralInfo(updatedInfo);
        setIsEditing(false);
    };

    const handleAdd = (type, newInfo) => {
        if ( type === "education") setEducation(newInfo);
        else if (type === "expertise") setExpertises(newInfo);
        else if (type === "language") setLanguages(newInfo);
        else if (type === "experience") setExperiences(newInfo);
        else if (type === "reference") setReferences(newInfo);
        else {
            console.error("Case not anticipated");
        }
        setIsEditing(false);
        console.table(education);
    }

    const handleRemove = (e) => {
        const parent = e.target.parentNode.className;

        if (parent === "education-header") {
            const newEducation = education.filter(
                (item) => item.degree !== e.target.parentNode.childNodes[0].textContent);
            setEducation(newEducation)
        } else if (parent === "language-wrapper") {
            const newLanguages = languages.filter((item) => item !== e.target.parentNode.childNodes[0].textContent);
            setLanguages(newLanguages);
        } else {
            const newExpertises = expertises.filter((item) => item !== e.target.parentNode.childNodes[0].textContent);
            setExpertises(newExpertises);
        } 

    }

    const handleCancel = () => {
        setIsEditing(false);
    };

    return (
        <div id="main">
            <div className="left-section">
                <Section
                    type="general-info"
                    generalInfo={generalInfo}
                    handleEdit={handleEdit}
                />
                <Section type="education" list={education} handleEdit={handleEdit} handleRemove={handleRemove} />
                <Section type="expertise" list={expertises} handleEdit={handleEdit} handleRemove={handleRemove} />
                <Section type="language" list={languages} handleEdit={handleEdit} handleRemove={handleRemove} />
            </div>
            <div className="right-section">
                <Header name={generalInfo.name} job={generalInfo.job} />
                <Profile text={generalInfo.profile} />
                <ExperienceList experiences={experiences} />
                <ReferenceList references={references} />
            </div>

            {isEditing === "general-info" && (
                <GeneralInfoForm
                    generalInfo={generalInfo}
                    handleSave={handleSave}
                    handleCancel={handleCancel}
                />
            )}

            {isEditing === "education" && (
                <EducationForm
                    education={education}
                    handleAdd={handleAdd}
                    handleCancel={handleCancel}
                />
            )}

        </div>
    );
}

function GeneralInfoForm({ generalInfo, handleSave, handleCancel }) {
    const [formData, setFormData] = useState(generalInfo);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSave(formData);
    };

    return (
        <form id="general-info-form" onSubmit={handleSubmit}>
            {Object.keys(generalInfo).map((key) => (
                <div key={key} className="input-wrapper">
                    <ion-icon name={getIconName(key)}></ion-icon>
                    {key !== "profile" ? (
                        <input
                            type="text"
                            id={key}
                            name={key}
                            placeholder={generalInfo[key]}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    ) : (
                        <textarea
                            id={key}
                            name={key}
                            rows="10"
                            cols="30"
                            placeholder={generalInfo[key]}
                            value={formData[key]}
                            onChange={handleChange}
                        />
                    )}
                </div>
            ))}
            <div className="btn-wrapper">
                <button type="submit" className="save-btn">
                    Save
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

function EducationForm({ education, handleAdd, handleCancel }) {
    // Adds a new education information to the education list
    const [formData, setFormData] = useState({
        degree: "",
        university: "",
        period: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd("education", [...education, formData]);
    };

    const inputs = ["degree", "university", "period"];

    return (
        <form id="education-form" onSubmit={handleSubmit}>
            {inputs.map((key) => (
                <div key={key} className="input-wrapper">
                    <ion-icon name={getIconName(key)}></ion-icon>
                    <input
                        type="text"
                        id={key}
                        name={key}
                        placeholder={`Enter the ${key}`}
                        value={formData[key]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <div className="btn-wrapper">
                <button type="submit" className="save-btn">
                    Save
                </button>
                <button type="button" className="cancel-btn" onClick={handleCancel}>
                    Cancel
                </button>
            </div>
        </form>
    );
}

function LanguageForm({ languages, handleAdd, handleCancel}) {
    const [language, setLanguage] = useState("");
    const handleChange = (e) => setLanguage(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd("language", [ ...languages, language]);
    }

    return (
        <form id="language-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <ion-icon name={getIconName("language")}></ion-icon>
                <input
                    type="text"
                    id={key}
                    name={key}
                    placeholder={`Enter the ${key}`}
                    value={formData[key]}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}

export default App;
