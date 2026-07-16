const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const roleText = document.getElementById("role-text");
const roles = [
    "Java & Spring Boot Learner",
    "DSA with Java",
    "Android Development Learner",
    "Python & ML Basics"
];
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
    if (!roleText || prefersReducedMotion) {
        return;
    }

    const currentRole = roles[roleIndex];
    roleText.textContent = deleting
        ? currentRole.slice(0, Math.max(letterIndex - 1, 0))
        : currentRole.slice(0, letterIndex + 1);

    letterIndex = deleting ? letterIndex - 1 : letterIndex + 1;

    if (!deleting && letterIndex === currentRole.length) {
        deleting = true;
        setTimeout(typeRole, 1200);
        return;
    }

    if (deleting && letterIndex === 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
    }

    setTimeout(typeRole, deleting ? 42 : 76);
}

typeRole();

const progressBar = document.getElementById("progress-bar");
const topButton = document.getElementById("top-btn");
const navLinks = document.querySelectorAll("nav a");
const sections = [...navLinks]
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function updateScrollState() {
    const scrollTop = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = pageHeight > 0 ? (scrollTop / pageHeight) * 100 : 0;

    if (progressBar) {
        progressBar.style.width = `${progress}%`;
    }

    if (topButton) {
        topButton.classList.toggle("show", scrollTop > 450);
    }

    const currentSection = sections
        .slice()
        .reverse()
        .find((section) => scrollTop >= section.offsetTop - 150);

    if (currentSection) {
        navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${currentSection.id}`);
        });
    }
}

window.addEventListener("scroll", updateScrollState);
updateScrollState();

if (topButton) {
    topButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" });
    });
}

const revealElements = document.querySelectorAll(
    ".hero-copy, .profile-panel, .about-grid, .skill-group, .project-card, .learning-grid, .timeline article, .contact-section"
);
revealElements.forEach((element) => element.classList.add("reveal"));

if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.14 }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("show"));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project-card");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle("active-filter", filterButton === button);
        });

        projects.forEach((project) => {
            const tags = project.dataset.tags.split(" ");
            const shouldShow = selectedFilter === "all" || tags.includes(selectedFilter);
            project.hidden = !shouldShow;
        });
    });
});

const copyEmailButton = document.getElementById("copy-email");
const email = "divyanshusinghdsa12413005@iiitsonepat.ac.in";

if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
        try {
            await copyText(email);
            copyEmailButton.textContent = "Copied";
        } catch (error) {
            copyEmailButton.textContent = "Copy failed";
        }

        setTimeout(() => {
            copyEmailButton.textContent = "Copy Email";
        }, 1500);
    });
}

async function copyText(text) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch (error) {
            // Local file previews can block Clipboard API, so fall back to execCommand.
        }
    }

    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "absolute";
    temporaryInput.style.left = "-9999px";
    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    const copied = document.execCommand("copy");
    temporaryInput.remove();

    if (!copied) {
        throw new Error("Copy command failed");
    }
}
