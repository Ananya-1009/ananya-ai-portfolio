const skillGroups=[
    {
        title:'Languages',
        number:'01',
        skills:['Python','C','C++','JavaScript','SQL'],
    },
    {
        title:'Web Development',
        number:'02',
        skills:['React','TypeScript','Node.js','Express'],
    },
    {
        title:'AI & Machine Learning',
        number:'03',
        skills:['Machine Learning','RAG','Ollama','ChromaDB'],
    },
    {
        title:'Tools & Databases',
        number:'04',
        skills:['Git','GitHub','MySQL','PostgreSQL'],
    },
]
function Skills(){
    return(
        <section className="skills-section" id="skills">
            <div className="skills-heading">
                <p className="section-label">02-WHAT I WORK WITH</p>
                <h2>
                    Tools for turning
                    <br/>
                    <em>ideas into reality</em>
                </h2>
                <p className="skills-intro">
                    Technologies I've worked with while exploring software development and artificial intelligence.
                </p>
            </div>
            <div className="skills-grid">
                {skillGroups.map((group)=>(
                    <article className="skill-card" key={group.number}>
                        <div className="skill-card-top">
                            <span>{group.number}</span>
                            <span>↗</span>
                        </div>
                        <h3>{group.title}</h3>
                        <div className="skill-tag">
                            {group.skills.map((skill)=>(
                                <span key={skill}>{skill}  </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}
export default Skills