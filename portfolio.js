const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const roleText = document.getElementById("role-text");
const roles = ["Frontend Developer", "Data Science and Analytics Student", "Problem Solver", "Future Data Scientist"];
let roleIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeRole() {
    if (!roleText || prefersReducedMotion) {
        return;
    }

    const currentRole = roles[roleIndex];
    roleText.textContent = deleting
        ? currentRole.slice(0, letterIndex - 1)
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

    setTimeout(typeRole, deleting ? 45 : 80);
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
        topButton.classList.toggle("show", scrollTop > 400);
    }

    const currentSection = sections
        .slice()
        .reverse()
        .find((section) => scrollTop >= section.offsetTop - 140);

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

const revealElements = document.querySelectorAll("#about, #skills, #education, #portfolio, .item, .project");
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
        { threshold: 0.18 }
    );

    revealElements.forEach((element) => observer.observe(element));
} else {
    revealElements.forEach((element) => element.classList.add("show"));
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projects = document.querySelectorAll(".project");

filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const selectedFilter = button.dataset.filter;

        filterButtons.forEach((filterButton) => {
            filterButton.classList.toggle("active-filter", filterButton === button);
        });

        projects.forEach((project) => {
            const tags = project.dataset.tags.split(" ");
            const shouldShow = selectedFilter === "all" || tags.includes(selectedFilter);
            project.classList.toggle("hide", !shouldShow);
        });
    });
});

const copyEmailButton = document.getElementById("copy-email");
const emailLink = document.getElementById("email-link");

if (copyEmailButton && emailLink) {
    copyEmailButton.addEventListener("click", async () => {
        const email = emailLink.textContent.trim();

        try {
            await copyText(email);
            copyEmailButton.textContent = "Copied!";
        } catch (error) {
            copyEmailButton.textContent = "Copy failed";
        }

        setTimeout(() => {
            copyEmailButton.textContent = "Copy Email";
        }, 1600);
    });
}

async function copyText(text) {
    if (navigator.clipboard) {
        try {
            await navigator.clipboard.writeText(text);
            return;
        } catch (error) {
            // Some browsers block Clipboard API on local files, so use a classic fallback.
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

document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("mousemove", (event) => {
        if (prefersReducedMotion) {
            return;
        }

        const rect = item.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 8;

        item.style.transform = `perspective(700px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
    });

    item.addEventListener("mouseleave", () => {
        item.style.transform = "";
    });
});
