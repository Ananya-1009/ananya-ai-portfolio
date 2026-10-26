
const projects=[
  {
    number: '01',
    category: 'FULL-STACK DEVELOPMENT',
    title: 'Collaborative Study Room',
    description:
      'A collaborative learning platform designed around study rooms, shared resources and real-time interaction.',
    technologies: ['React', 'TypeScript', 'Node.js'],
    status: 'In development',
    github: 'https://github.com/Ananya-1009/collaborative-study-room',
  },
  {
    number: '02',
    category: 'AI & RETRIEVAL',
    title: 'AI Document Assistant',
    description:
      'A document question-answering assistant exploring embeddings, vector search and retrieval-augmented generation.',
    technologies: ['Python', 'Ollama', 'ChromaDB'],
    status: 'Project',
    github: 'https://github.com/Ananya-1009/rag_assistant'
  },
  {
    number: '03',
    category: 'INTERACTIVE AI WEB',
    title: 'Jarvis Portfolio',
    description:
      'An interactive personal portfolio being developed with the goal of conversational voice navigation and AI-powered answers.',
    technologies: ['React', 'TypeScript', 'AI'],
    status: 'In development',
    github:''
  },
  {
    number: '04',
    category: 'DATA ENGINEERING',
    title: 'Real Estate Data Scraper',
    description:
      'An automated data collection pipeline that extracts property listings, validates and cleans records, detects duplicates, and stores structured data in a normalized MySQL database.',
    technologies: ['Python', 'Selenium', 'MySQL'],
    status: 'Project',
    github:'https://github.com/Ananya-1009/Web-Scraping'
  },
]

function Projects() {
  return (
    <section className="projects-section" id="projects">
      <div className="projects-heading">
        <div>
          <p className="section-label">03 — SELECTED WORK</p>
          <h2>
            Things I've been
            <br />
            <em>building.</em>
          </h2>
        </div>

        <p className="projects-intro">
          A selection of projects through which I'm exploring
          software engineering, AI and creative problem-solving.
        </p>
      </div>

      <div className="projects-grid">
        {projects.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-card-top">
              <span>{project.number} / {project.category}</span>
              <span className="project-arrow" aria-hidden="true">
                ↗
              </span>
            </div>

            <div className={`project-visual project-visual-${project.number}`}>
            {project.number === '01' && (
                <div className="study-preview">
                <div className="preview-topbar">
                    <span>study room</span>
                    <span className="preview-live">● LIVE</span>
                </div>
                <div className="preview-room">
                    <div>
                    <span className="preview-caption">CURRENT ROOM</span>
                    <strong>Deep Work Session</strong>
                    <span className="preview-muted">3 participants online</span>
                    </div>
                    <div className="preview-avatars">
                    <span>A</span><span>S</span><span>R</span>
                    </div>
                </div>
                <div className="preview-progress">
                    <span />
                </div>
                <div className="preview-bottom">
                    <span>Focus session</span>
                    <strong>24:36</strong>
                </div>
                </div>
            )}

            {project.number === '02' && (
                <div className="rag-preview">
                <div className="rag-sidebar">
                    <span className="rag-mark">AI.</span>
                    <span className="rag-file">PDF</span>
                    <span className="rag-file">TXT</span>
                </div>
                <div className="rag-chat">
                    <span className="preview-caption">DOCUMENT ASSISTANT</span>
                    <div className="rag-question">
                    What are the key points in this document?
                    </div>
                    <div className="rag-answer">
                    <span className="rag-answer-mark">✳</span>
                    <div>
                        <strong>Answer generated</strong>
                        <p>Relevant information retrieved from your documents.</p>
                    </div>
                    </div>
                    <div className="rag-input">Ask a question... <span>↗</span></div>
                </div>
                </div>
            )}

            {project.number === '03' && (
                <div className="jarvis-preview">
                <div className="jarvis-preview-label">J.A.R.V.I.S.</div>
                <div className="jarvis-preview-orb">
                    <span />
                </div>
                <div className="jarvis-preview-caption">
                    <strong>Your portfolio, in conversation.</strong>
                    <span>AI · VOICE · INTERACTION</span>
                </div>
                </div>
            )}
            </div>

            <div className="project-card-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>


            <div className="project-tags">
            {project.technologies.map((technology) => (
                <span key={technology}>{technology}</span>
            ))}
            </div>

            {project.github && (
            <a
                className="project-github"
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
            >
                View source code ↗
            </a>
            )}

            <p className="project-status">{project.status}</p>
            </div>

          </article>
        ))}
      </div>
    </section>
  )
}

export default Projects
