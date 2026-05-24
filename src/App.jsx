const { useEffect, useMemo, useState } = React;

const roles = ["React Developer", "Android Developer", "Python Learner", "Data Science Student"];

const skills = [
  { name: "HTML5", icon: "https://simpleicons.org/icons/html5.svg" },
  { name: "CSS3", icon: "https://simpleicons.org/icons/css.svg" },
  { name: "JavaScript", icon: "https://simpleicons.org/icons/javascript.svg" },
  { name: "React", icon: "https://simpleicons.org/icons/react.svg" },
  { name: "Python", icon: "https://simpleicons.org/icons/python.svg" },
  { name: "Kotlin", icon: "https://simpleicons.org/icons/kotlin.svg" },
  { name: "Android", icon: "https://simpleicons.org/icons/android.svg" },
  { name: "C", icon: "https://simpleicons.org/icons/c.svg" },
  { name: "C++", icon: "https://simpleicons.org/icons/cplusplus.svg" },
  { name: "Java", icon: "https://simpleicons.org/icons/openjdk.svg" },
  { name: "GitHub", icon: "https://simpleicons.org/icons/github.svg" },
];

const projects = [
  {
    name: "Blog-App",
    description: "An Android blog app built with Kotlin in Android Studio.",
    url: "https://github.com/divyanshu12413005/Blog-App",
    language: "Kotlin",
    tags: ["Android", "Kotlin"],
  },
  {
    name: "Weather-App",
    description: "An Android weather app built with Kotlin that shows real-time weather information.",
    url: "https://github.com/divyanshu12413005/Weather-App",
    language: "Kotlin",
    tags: ["Android", "Kotlin"],
  },
  {
    name: "Web-Designing",
    description: "Semester 2 web designing project code covering HTML, CSS and JavaScript.",
    url: "https://github.com/divyanshu12413005/Web-Designing",
    language: "HTML",
    tags: ["HTML", "CSS", "JavaScript"],
  },
  {
    name: "Portfolio-Website",
    description: "Personal portfolio website showcasing skills, learning progress and projects.",
    url: "https://github.com/divyanshu12413005/Portfolio-Website",
    language: "React",
    tags: ["React", "Portfolio"],
  },
  {
    name: "Python",
    description: "Python practice covering basics, loops, functions, modules and data structures.",
    url: "https://github.com/divyanshu12413005/Python",
    language: "Python",
    tags: ["Python", "Learning"],
  },
  {
    name: "Java-Learning",
    description: "Java practice covering OOP, inheritance, exception handling and collections.",
    url: "https://github.com/divyanshu12413005/Java-Learning",
    language: "Java",
    tags: ["Java", "Learning"],
  },
  {
    name: "C-Programming",
    description: "C programming practice and learning code.",
    url: "https://github.com/divyanshu12413005/C-Programming",
    language: "C",
    tags: ["C", "Programming"],
  },
];

const filters = ["All", "React", "Android", "Python", "Web", "Java", "C"];

function App() {
  const [role, setRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [letterIndex, setLetterIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("about");
  const [filter, setFilter] = useState("All");
  const [emailCopied, setEmailCopied] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const delay = deleting ? 45 : letterIndex === currentRole.length ? 900 : 80;
    const timeout = window.setTimeout(() => {
      setRole(
        deleting
          ? currentRole.slice(0, Math.max(letterIndex - 1, 0))
          : currentRole.slice(0, letterIndex + 1)
      );
      setLetterIndex((current) => current + (deleting ? -1 : 1));

      if (!deleting && letterIndex === currentRole.length) {
        setDeleting(true);
      }

      if (deleting && letterIndex === 0) {
        setDeleting(false);
        setRoleIndex((current) => (current + 1) % roles.length);
      }
    }, delay);

    return () => window.clearTimeout(timeout);
  }, [deleting, letterIndex, roleIndex]);

  useEffect(() => {
    const updateScroll = () => {
      const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(pageHeight > 0 ? (window.scrollY / pageHeight) * 100 : 0);
      setShowTop(window.scrollY > 420);

      const section = ["portfolio", "education", "skills", "about"].find((id) => {
        const element = document.getElementById(id);
        return element && window.scrollY >= element.offsetTop - 150;
      });

      if (section) {
        setActiveSection(section);
      }
    };

    updateScroll();
    window.addEventListener("scroll", updateScroll);
    return () => window.removeEventListener("scroll", updateScroll);
  }, []);

  const visibleProjects = useMemo(() => {
    if (filter === "All") {
      return projects;
    }

    if (filter === "Web") {
      return projects.filter((project) =>
        project.tags.some((tag) => ["HTML", "CSS", "JavaScript", "React"].includes(tag))
      );
    }

    return projects.filter((project) => [project.language, ...project.tags].includes(filter));
  }, [filter]);

  const copyEmail = async () => {
    const email = "divyanshusinghdsa12413005@iiitsonepat.ac.in";

    if (navigator.clipboard) {
      await navigator.clipboard.writeText(email);
    } else {
      const input = document.createElement("textarea");
      input.value = email;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }

    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 1500);
  };

  return (
    <React.Fragment>
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }} />
      <main className="shell">
        <aside className="sidebar" aria-label="Profile">
          <section className="profile">
            <img src="./divyaimg.png" alt="Divyanshu Singh Chauhan" />
            <h1>Divyanshu Singh Chauhan</h1>
            <p className="role">{role}</p>
          </section>

          <section className="contact" aria-label="Contact details">
            <ContactItem
              icon="https://simpleicons.org/icons/gmail.svg"
              label="Email"
              value="divyanshusinghdsa12413005@iiitsonepat.ac.in"
              href="mailto:divyanshusinghdsa12413005@iiitsonepat.ac.in"
            />
            <button className="copy-btn" type="button" onClick={copyEmail}>
              {emailCopied ? "Copied" : "Copy Email"}
            </button>
            <ContactItem icon="https://simpleicons.org/icons/whatsapp.svg" label="Phone" value="7355442326" href="tel:7355442326" />
            <ContactItem icon="https://simpleicons.org/icons/googlemaps.svg" label="Location" value="Ballia, U.P" />
          </section>

          <div className="social">
            <a href="https://x.com/Divyans51305601" aria-label="X profile">
              <img src="https://simpleicons.org/icons/x.svg" alt="" />
            </a>
            <a href="https://github.com/divyanshu12413005" aria-label="GitHub profile">
              <img src="https://simpleicons.org/icons/github.svg" alt="" />
            </a>
            <a href="https://www.linkedin.com/in/divyanshu-singh-chauhan-390264307/" aria-label="LinkedIn profile">
              <img src="https://www.svgrepo.com/show/57068/linkedin.svg" alt="" />
            </a>
          </div>
        </aside>

        <div className="content-panel">
          <nav aria-label="Main navigation">
            {["about", "skills", "education", "portfolio"].map((section) => (
              <a className={activeSection === section ? "active" : ""} href={`#${section}`} key={section}>
                {section}
              </a>
            ))}
          </nav>

          <Section id="about" title="About Me">
            <p>
              I am a B.Tech undergraduate in Data Science and Analytics at IIIT Sonepat, learning by building
              practical projects. Along with C, C++, Java, Data Structures and web fundamentals, I have recently
              added Python, React, Android development and Kotlin to my growing skill set.
            </p>
            <p>
              I enjoy creating responsive web interfaces and Android apps, and I am publishing my learning projects
              on GitHub as I improve. My goal is to keep growing as a developer while building a strong path toward
              data science and real-world problem solving.
            </p>
          </Section>

          <Section id="skills" title="Skills">
            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card" key={skill.name}>
                  <img src={skill.icon} alt="" aria-hidden="true" />
                  <h3>{skill.name}</h3>
                </article>
              ))}
            </div>
          </Section>

          <Section id="education" title="Education">
            <div className="timeline">
              <TimelineItem
                year="2024-2028"
                degree="Bachelor of Technology in Data Science and Analytics"
                place="Indian Institute of Information Technology, Sonepat"
                detail="Building foundations in programming, data structures, frontend development, Android development and data science."
              />
              <TimelineItem
                year="2022-2023"
                degree="Senior Secondary Education Class XII"
                place="CBSE"
                detail="Science stream."
              />
            </div>
          </Section>

          <Section id="portfolio" title="GitHub Projects">
            <div className="filters" aria-label="Project filters">
              {filters.map((item) => (
                <button
                  className={filter === item ? "active-filter" : ""}
                  key={item}
                  type="button"
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="project-grid">
              {visibleProjects.map((project) => (
                <article className="project-card" key={project.name}>
                  <div className="project-topline">
                    <span>{project.language}</span>
                    <span aria-hidden="true">GitHub</span>
                  </div>
                  <h3>{project.name}</h3>
                  <p>{project.description}</p>
                  <div className="tag-row">
                    {project.tags.map((tag) => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={project.url}>View on GitHub</a>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </main>

      <button
        className={`top-btn ${showTop ? "show" : ""}`}
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        ↑
      </button>
    </React.Fragment>
  );
}

function ContactItem({ icon, label, value, href }) {
  const content = (
    <React.Fragment>
      <span className="contact-icon">
        <img src={icon} alt="" />
      </span>
      <span>
        <strong>{label}</strong>
        <span>{value}</span>
      </span>
    </React.Fragment>
  );

  return href ? (
    <a className="contact-item" href={href}>
      {content}
    </a>
  ) : (
    <div className="contact-item">{content}</div>
  );
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <h2>{title}</h2>
      <div className="accent-line" />
      {children}
    </section>
  );
}

function TimelineItem({ year, degree, place, detail }) {
  return (
    <article className="timeline-item">
      <span>{year}</span>
      <h3>{degree}</h3>
      <p className="place">{place}</p>
      <p>{detail}</p>
    </article>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
