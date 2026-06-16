// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-q");
  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");
    document.querySelectorAll(".faq-item.open").forEach((o) => o.classList.remove("open"));
    if (!isOpen) item.classList.add("open");
  });
});

// Contact form
const form = document.getElementById("contact-form");
const status = document.getElementById("form-status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  
  // Show a loading/sending state
  status.style.color = "var(--primary)";
  status.textContent = "Sending your message...";

  const data = new FormData(form);
  const name = (data.get("name") || "").toString().trim();

  try {
    // REPLACE THE URL BELOW WITH YOUR ACTUAL ENDPOINT URL FROM FORMSPREE/WEB3FORMS
    const response = await fetch("https://formspree.io/f/mykavjpd", {
      method: "POST",
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      status.style.color = "var(--primary)";
      status.textContent = `Thanks${name ? ", " + name : ""}! Your message has been received. I'll be in touch shortly.`;
      form.reset();
    } else {
      throw new Error("Server responded with an error status.");
    }
  } catch (error) {
    // Turn text warm ochre/red if something fails
    status.style.color = "var(--accent)"; 
    status.textContent = "Oops! Something went wrong sending your message. Please try again.";
  }
});