
function Contact() {
  return (
    <section className="contact-section" id="contact">
      <p className="section-label">06 — GET IN TOUCH</p>

      <div className="contact-content">
        <h2>
          Wanna know more?
          <br />
          <em>Let's talk.</em>
        </h2>

        <p className="contact-description">
          I'm interested in software development, AI,
          and opportunities to build meaningful projects.
          Feel free to reach out.
        </p>

        <a
          className="primary-button contact-email"
          href="mailto:anuananya100906@gmail.com"
        >
          Email me <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="contact-links">
        <a href="https://github.com/Ananya-1009" target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a href="https://www.linkedin.com/in/ananya-soni-394269369/" target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a href="https://leetcode.com/u/Ananya100906/" target="_blank" rel="noreferrer">
          LeetCode ↗
        </a>
      </div>
    </section>
  )
}

export default Contact
