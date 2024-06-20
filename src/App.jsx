import { useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
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

function Icon({ iconType, section, isVisible, handleEdit, handleRemove }) {
    if (iconType === "trash") {
        return (
            <div className={`trash icons ${isVisible ? "" : "hidden"}`}>
                <ion-icon 
                    name={getIconName("trash")} 
                    onClick={handleRemove}>
                </ion-icon>
            </div>
        );
    } else if (iconType === "add") {
        return (
            <div className={`add icons ${isVisible ? "" : "hidden"}`}>
                <ion-icon 
                    className={isVisible ? "" : "hidden"}
                    name="add-circle" 
                    onClick={() => handleEdit(section)}>
                </ion-icon>
            </div>
        );
    } else if (iconType === "edit") {
        return (
            <div className={`icons ${isVisible ? "" : "hidden"}`}>
                <ion-icon 
                    name="create-outline" 
                    onClick={() => handleEdit(section)}>
                </ion-icon>
            </div>
        );
    } else {
        console.error("Icon type not available.")
    }
}


function Info({ icon, type, text }) {
    if (type === "website") {
        return (
            <div className="info-wrapper">
                <ion-icon name={`${icon}-outline`}></ion-icon>
                <a className={`${type}-info`} href={text} target="_blank">{text}</a>
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

function Education({ degree, university, period, handleRemove, isVisible }) {
    return (
        <div>
            <div className="education-header">
                <h3 className="degree">{degree}</h3>
                <Icon 
                    iconType="trash"
                    isVisible={isVisible} 
                    handleRemove={handleRemove}
                />
            </div>
            <h4 className="university">{university}</h4>
            <p className="period">{period}</p>
        </div>
    );
}

function Section({ type, list, generalInfo, isVisible, handleEdit, handleRemove }) {
    if (type === "general-info") {
        return (
            <>
                <div className="section-header">
                    <h2>General Info</h2>
                    <Icon 
                        iconType="edit"
                        section={type}
                        isVisible={isVisible} 
                        handleEdit={handleEdit}
                    />
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
                    <Icon 
                        iconType="add"
                        section={type}
                        isVisible={isVisible} 
                        handleEdit={handleEdit}
                    />
                </div>
                <div className="section education">
                    {list.map((e) => (
                        <Education 
                            key={e.degree} 
                            degree={e.degree} 
                            university={e.university} 
                            period={e.period} 
                            handleRemove={handleRemove}
                            isVisible={isVisible}
                        />
                    ))}
                </div>
            </>
        );
    } else {
        return (
            <>
                <div className="section-header">
                    <h2>{capitalize(type)}</h2>
                    <Icon 
                        iconType="add"
                        section={type}
                        isVisible={isVisible} 
                        handleEdit={handleEdit}
                    />
                </div>
                <div className="section">
                    {list.map((e) => (
                        <div key={e} className={`${type}-wrapper`}>
                            <p>{e}</p>
                            <Icon 
                                iconType="trash"
                                isVisible={isVisible} 
                                handleRemove={handleRemove}
                            />
                        </div>
                    ))}
                </div>
            </>
        );
    }
}

function Header({ name, job, handleEdit, handlePrint}) {
    return (
        <div className="header-wrapper">
            <h1 className="username">{name}</h1>
            <h2 className="user-job">{job}</h2>
            <Icon 
                iconType="edit"
                section="app"
                isVisible={true} 
                handleEdit={handleEdit}
            />
            <ion-icon 
                name={getIconName("print")} 
                onClick={() => handlePrint()}></ion-icon>
        </div>
    );
}

function Profile({ text, handleEdit, isVisible }) {
    return (
        <div className="profile">
            <div className="profile-header">
                <Info icon="person" type="profile" />
                <Icon 
                    iconType="edit"
                    section="general-info"
                    isVisible={isVisible} 
                    handleEdit={handleEdit}
                />
            </div>
            <p className="profile-text">{text}</p>
        </div>
    );
}

function Experience({ start, end, institution, role, jobs, handleRemove, isVisible }) {
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
                <div className="experience-header">
                    <h3 className="institution">{institution}</h3>
                    <p className="role">{role}</p>
                    <Icon 
                        iconType="trash"
                        isVisible={isVisible} 
                        handleRemove={handleRemove}
                    />
                </div>
                <ul>
                    {jobs.map((j) => (
                        <li key={j} className="responsibility">{capitalize(j)}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

function ExperienceList({ experiences, isVisible, handleEdit, handleRemove }) {
    return (
        <div className="experience-list">
            <div className="experience-list-header">
                <Info icon="briefcase" type="work experience" />
                <Icon 
                    iconType="add"
                    section="experience"
                    isVisible={isVisible} 
                    handleEdit={handleEdit}
                />
            </div>
            <div className="experience-wrapper">
                {experiences.map((e) => (
                    <Experience
                        key={e.institution}
                        start={e.start}
                        end={e.end}
                        institution={e.institution}
                        jobs={e.responsibilities}
                        role={e.role}
                        handleRemove={handleRemove}
                        isVisible={isVisible}
                    />
                ))}
            </div>
        </div>
    );
}

function Reference({ name, institution, phone, mail, handleRemove, isVisible }) {
    return (
        <div className="reference">
            <div className="reference-header">
                <h3 className="name">{name}</h3>
                <p className="institution">{institution}</p>
                <Icon 
                    iconType="trash"
                    isVisible={isVisible} 
                    handleRemove={handleRemove}
                />
            </div>
            <p>
                <a>Phone:</a> {phone}
            </p>
            <p>
                <a>Email:</a> {mail}
            </p>
        </div>
    );
}

function ReferenceList({ references, isVisible, handleEdit, handleRemove }) {
    return (
        <div className="reference-list">
            <div className="reference-list-header">
                <Info icon="book" type="references" />
                <Icon 
                    iconType="add"
                    section="references"
                    isVisible={isVisible} 
                    handleEdit={handleEdit}
                />
            </div>
            <div className="reference-wrapper">
                {references.map((e) => (
                    <Reference
                        key={e.name}
                        name={e.name}
                        institution={e.institution}
                        phone={e.phone}
                        mail={e.mail}
                        handleRemove={handleRemove}
                        isVisible={isVisible}
                    />
                ))}
            </div>
        </div>
    );
}

function FormBtns({ handleCancel }) {
    return (
        <div className="btn-wrapper">
            <button type="submit" className="save-btn">
                Save
            </button>
            <button type="button" className="cancel-btn" onClick={handleCancel}>
                Cancel
            </button>
        </div>
    );
}

const getIconName = (input) => {
    const iconMappings = {
        print: "print",
        mail: "mail",
        language: "language",
        bulb: "bulb",
        trash: "trash",
        period: "hourglass",
        start: "hourglass",
        end: "hourglass",
        job: "briefcase",
        role: "briefcase",
        add: "add-circle",
        name: "person",
        telephone: "call",
        website: "desktop",
        location: "location",
        degree: "ribbon",
        university: "school",
        institution: "business",
        responsibilities: "construct"
    };

    return iconMappings[input] || "information-circle";
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
    const [isEditingApp, setIsEditingApp] = useState(false);

    const handleEdit = (section) => {
        if (section === "app") setIsEditingApp(!isEditingApp);
        else setIsEditing(section);
    };

    const handleSave = (updatedInfo) => {
        setGeneralInfo(updatedInfo);
        setIsEditing(false);
    };

    const handleAdd = (type, newInfo) => {
        if ( type === "education") setEducation(newInfo);
        else if (type === "expertise") setExpertises(newInfo);
        else if (type === "language") setLanguages(newInfo);
        else if (type === "experience") setExperiences(newInfo.sort(
            (a, b) => b.start.localeCompare(a.start)));
        else if (type === "reference") setReferences(newInfo);
        else {
            console.error("Case not anticipated");
        }
        setIsEditing(false);
    }

    const handleRemove = (e) => {
        const parent = e.target.parentNode.parentNode.className;

        if (parent === "education-header") {
            const newEducation = education.filter(
                (item) => item.degree !== e
                    .target
                    .parentNode
                    .parentNode
                    .childNodes[0]
                    .textContent);
            setEducation(newEducation)
        } else if (parent === "language-wrapper") {
            const newLanguages = languages.filter(
                (item) => item !== e.target.parentNode.parentNode.childNodes[0].textContent);
            setLanguages(newLanguages);
        } else if (parent === "experience-header") {
            const institution = e
                .target
                .parentNode
                .parentNode
                .childNodes[0]
                .textContent;
            const role = e
                .target
                .parentNode
                .parentNode
                .childNodes[1]
                .textContent;

            const newList = experiences.filter((item) => (
                item.institution !== institution || item.role !== role));
            setExperiences(newList);
        } else if (parent === "reference-header") {
            const name = e
                .target
                .parentNode
                .parentNode
                .childNodes[0].textContent;
            const institution = e
                .target
                .parentNode
                .parentNode
                .childNodes[1]
                .textContent;

            const newReferences = references.filter((item) => (
                item.name !== name || item.institution != institution));
            setReferences(newReferences);
        } else {
            const newExpertises = expertises.filter(
                (item) => item !== e
                    .target
                    .parentNode
                    .parentNode
                    .childNodes[0]
                    .textContent);
            setExpertises(newExpertises);
        } 
    }

    const handleCancel = () => {
        setIsEditing(false);
    };

    const generatePDF = () => {
        const cvContainer = document.getElementById('main');

        cvContainer.style.backgroundColor = 'black';
        cvContainer.style.color = 'white';
        cvContainer.querySelectorAll('a').forEach(link => {
            link.style.color = 'lightblue';
        });

        html2canvas(cvContainer, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF({
                orientation: 'portrait',
                unit: 'pt',
                format: 'a3'
            });

            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('CV.pdf');
        });

         // Revert styles back to normal
        cvContainer.style.backgroundColor = '#080b12';
        cvContainer.style.color = '';
        cvContainer.querySelectorAll('a').forEach(link => {
            link.style.color = '#00bfff';
        });
    };

    return (
        <div id="main">
            <div className="left-section">
                <Section
                    type="general-info"
                    generalInfo={generalInfo}
                    handleEdit={handleEdit}
                    isVisible={isEditingApp}
                />
                <Section 
                    type="education" 
                    list={education} 
                    handleEdit={handleEdit} 
                    handleRemove={handleRemove} 
                    isVisible={isEditingApp} 
                />
                <Section 
                    type="expertise" 
                    list={expertises} 
                    handleEdit={handleEdit} 
                    handleRemove={handleRemove} 
                    isVisible={isEditingApp} 
                />
                <Section 
                    type="language" 
                    list={languages} 
                    handleEdit={handleEdit} 
                    handleRemove={handleRemove} 
                    isVisible={isEditingApp}
                />
            </div>
            <div className="right-section">
                <Header 
                    name={generalInfo.name} 
                    job={generalInfo.job} 
                    handleEdit={handleEdit} 
                    handlePrint={generatePDF}
                />
                <Profile 
                    text={generalInfo.profile} 
                    handleEdit={handleEdit} 
                    isVisible={isEditingApp} 
                />
                <ExperienceList 
                    experiences={experiences} 
                    handleEdit={handleEdit} 
                    handleRemove={handleRemove} 
                    isVisible={isEditingApp}
                />
                <ReferenceList 
                    references={references} 
                    handleEdit={handleEdit} 
                    handleRemove={handleRemove}
                    isVisible={isEditingApp}
                />
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

            {isEditing === "language" && (
                <LanguageForm
                    languages={languages}
                    handleAdd={handleAdd}
                    handleCancel={handleCancel}
                />
            )}
            
            {isEditing === "expertise" && (
                <ExpertiseForm
                    expertises={expertises}
                    handleAdd={handleAdd}
                    handleCancel={handleCancel}
                />
            )}

            {isEditing === "experience" && (
                <ExperienceForm
                    experiences={experiences}
                    handleAdd={handleAdd}
                    handleCancel={handleCancel}
                />
            )}

            {isEditing === "references" && (
                <ReferenceForm
                    references={references}
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
            <FormBtns handleCancel={handleCancel}/>
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

    return (
        <form id="education-form" onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
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
            <FormBtns handleCancel={handleCancel}/>
        </form>
    );
}


function ExpertiseForm({ expertises, handleAdd, handleCancel}) {
    const [data, setData] = useState("");
    const handleChange = (e) => setData(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAdd("expertise", [ ...expertises, data]);
    }

    return (
        <form id="expertise-form" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <ion-icon name={getIconName("bulb")}></ion-icon>
                <input
                    type="text"
                    id="expertise-input"
                    name="expertise-input"
                    placeholder={`Enter your expertise`}
                    onChange={handleChange}
                />
            </div>
            <FormBtns handleCancel={handleCancel}/>
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
                    id="language-input"
                    name="language-input"
                    placeholder="Enter the language"
                    onChange={handleChange}
                />
            </div>
            <FormBtns handleCancel={handleCancel}/>
        </form>
    );
}

function ReponsibilityForm ({ list, handleAddResp, handleCancel }) {
    const [responsibility, setResponsibility] = useState("");

    const handleChange = (e) => setResponsibility(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        handleAddResp([ ...list, responsibility]);
    }

    return (
        <form id="responsibility-form">
            <div className="input-wrapper">
                <ion-icon name={getIconName("responsibility")}></ion-icon>
                <input 
                    type="text" 
                    id="responsibility-input"
                    name="responsibility-input"
                    placeholder="Enter the responbility"
                    onChange={handleChange}
                />
            </div>
            <FormBtns handleCancel={handleCancel}/>
        </form>
    );
}


function ExperienceForm({ experiences, handleAdd, handleCancel }) {
    // Adds a new education information to the education list
    const [formData, setFormData] = useState({
        start: "",
        end: "",
        institution: "",
        role: "",
        responsibilities: ""
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
        handleAdd("experience", [
            ...experiences, 
            { 
                ...formData, 
                responsibilities: formData.responsibilities.split(". "), 
            }
        ]);
    };

    return (
        <form id="experience-form" onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
                    <div key={key} className="input-wrapper">
                        <ion-icon name={getIconName(key)}></ion-icon>
                        {key !== "responsibilities" 
                        ? (
                            <input
                                type="text"
                                id={key}
                                name={key}
                                placeholder={`Enter the ${key}`}
                                value={formData[key]}
                                onChange={handleChange}
                            />) 
                        : ( 
                            <textarea 
                                id={key}
                                name={key}
                                placeholder={"Enter responsibilities separated by a dot and a space"}
                                rows="10"
                                cols="40"
                                value={formData[key]}
                                onChange={handleChange}
                            /> 
                        )}
                    </div> 
            ))}
            <FormBtns handleCancel={handleCancel}/>
        </form>
    );
}

function ReferenceForm({ references, handleAdd, handleCancel }) {
    const [formData, setFormData] = useState({
        name: "",
        institution: "",
        phone: "",
        mail: "",
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
        handleAdd("reference", [...references, formData]);
    };

    return (
        <form id="reference-form" onSubmit={handleSubmit}>
            {Object.keys(formData).map((key) => (
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
            <FormBtns handleCancel={handleCancel}/>
        </form>
    );
}


export default App;
