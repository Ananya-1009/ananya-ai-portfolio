
const education = [
  {
    period: '2024 — 2028',
    title: 'B.Tech in Information Technology',
    organization: 'Jaypee Institute of Information Technology, Noida',
    description:
      'CGPA: 8.74/10. Building foundations in computer science, software engineering, and information technology.',
  },
]

const experience = [
  {
    period: 'MAY 2026 — JUL 2026',
    title: 'Software Development Intern',
    organization:
      'Bharat Heavy Electricals Limited (BHEL) · Corporate Digital Transformation',
    description:
      'Developed a local RAG assistant for document-aware question answering. Worked on document ingestion, semantic retrieval, and response generation for enterprise knowledge management.',
  },
]

function Journey() {
  return (
    <section className="journey-section" id="education">
      <div className="journey-column">
        <p className="section-label">04 — EDUCATION</p>
        <h2>
          Where I <em>learn.</em>
        </h2>

        {education.map((item) => (
          <article className="journey-item" key={item.title}>
            <span className="journey-period">{item.period}</span>
            <h3>{item.title}</h3>
            <p className="journey-organization">
              {item.organization}
            </p>
            <p className="journey-description">
              {item.description}
            </p>
          </article>
        ))}
      </div>

      <div className="journey-column" id="experience">
        <p className="section-label">05 — EXPERIENCE</p>
        <h2>
          Where I <em>grow.</em>
        </h2>

        {experience.map((item) => (
          <article className="journey-item" key={item.title}>
            <span className="journey-period">{item.period}</span>
            <h3>{item.title}</h3>
            <p className="journey-organization">
              {item.organization}
            </p>
            <p className="journey-description">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Journey
