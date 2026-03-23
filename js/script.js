document.addEventListener("DOMContentLoaded", () => {
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    // Toggle Mobile Menu
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        
        // Change icon between bars and times (X)
        const icon = hamburger.querySelector("i");
        if(navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close menu when clicking a link (mobile oriented)
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            hamburger.querySelector("i").classList.remove("fa-times");
            hamburger.querySelector("i").classList.add("fa-bars");
        });
    });
});