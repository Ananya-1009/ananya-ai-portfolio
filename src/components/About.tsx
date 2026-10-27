function About(){
    return (
        <section className="about-section" id="about">
            <div className="about-heading">
                <p className="section-label">01-A LITTLE ABOUT ME</p>
                <h2>
                    Curious mind.
                    <br/>
                    <em>Builder at heart.</em>
                </h2>
            </div>
            <div className="about-content">
                <p className="about-intro">
                    I'm Ananya, a B.Tech Informtion Technology student at JIIT Noida, interested in building software that solves real problems.
                </p>
                <p>
                    I enjoy exploring full-stack development, artificial intelligence and machine learning. I believe the best way to learn is to build projects, understand how they work, and keep improving them.
                </p>
                <p>
                    Currently working on projects that combine software engineering with AI, while strengthening my foundations in development and problem solving.
                </p>
                <div className="about-tags">
                    <span>Software Development</span>
                    <span>AI & Machine Learning</span>
                    <span>Problem Solving</span>
                </div>
                      <div className="resume-actions">
                    <a
                        href="/resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="resume-button resume-button-primary"
                    >
                        View Resume ↗
                    </a>

                    <a
                        href="/resume.pdf"
                        download="Ananya_Soni_Resume.pdf"
                        className="resume-button resume-button-secondary"
                    >
                        Download Resume ↓
                    </a>
                </div>
            </div>
        </section>
    )
}
export default About