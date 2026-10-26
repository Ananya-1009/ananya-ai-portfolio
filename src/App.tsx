
import './App.css'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Journey from './components/Journey'
import Contact from './components/Contact'
import JarvisAssistant from './components/JarvisAssistant'
function App() {
  return (
    <main className="portfolio">
      <nav className="navbar">
        <a className="brand" href="#home">
          AN<span>.</span>
        </a>

        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        <a className="nav-cta" href="#contact">
          Let's connect ↗
        </a>
      </nav>

      <section className="hero-section" id="home">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="status-dot" />
            B.TECH IT STUDENT · JIIT NOIDA
          </p>

          <h1>
            Building ideas
            <br />
            into <span>reality.</span>
          </h1>

          <p className="hero-description">
            Hi, I'm Ananya. I explore software development,
            AI and machine learning to build useful,
            thoughtful digital experiences.
          </p>

          <div className="hero-actions">
            <a className="primary-button" href="#projects">
              Explore my work ↗
            </a>

            <a className="secondary-button" href="#about">
              Get to know me
            </a>
          </div>

          <div className="hero-footer">
            <span>SOFTWARE DEVELOPMENT</span>
            <span>AI & MACHINE LEARNING</span>
          </div>
        </div>

        <aside className="jarvis-card">
          <div className="card-top">
            <span>J.A.R.V.I.S.</span>
            <span className="live-label">PORTFOLIO AI</span>
          </div>

          <div className="orb">
            <div className="orb-ring orb-ring-one" />
            <div className="orb-ring orb-ring-two" />
            <div className="orb-core" />
          </div>
          <JarvisAssistant />
          <p className="card-note">
            VOICE INTERACTION · COMING SOON
          </p>
        </aside>
      </section>
      <About />
      <Skills />
      <Projects />
      <Journey />
      <Contact />
      <footer className="portfolio-footer">
        <span>ANANYA SONI</span>
        <span>CURIOUS BY NATURE. BUILT TO CREATE.</span>
      </footer>
    </main>
  )
}

export default App
