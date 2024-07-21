//READ MORE ABOUT ME SECTION
document.addEventListener('DOMContentLoaded', function() {
    // Toggle hidden content in the About Me section
    var readMoreLinks = document.querySelectorAll('.read-more');

    readMoreLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            var textBox = event.target.closest('.text-box');
            var hiddenContent = textBox.querySelector('.hidden-content');

            if (hiddenContent) {
                if (hiddenContent.style.display === 'none' || hiddenContent.style.display === '') {
                    hiddenContent.style.display = 'block';
                    link.textContent = 'Read Less';
                } else {
                    hiddenContent.style.display = 'none';
                    link.textContent = 'Read More';
                }
            }
        });
    });
    

    // Ensure navigation block visibility on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            navigationBlock.style.display = 'flex';
        } else {
            navigationBlock.style.display = 'none';
        }
    });
});


//HAMBURGER MENU
document.addEventListener('DOMContentLoaded', function() {
    var hamburgerMenu = document.getElementById('menu__toggle');
    var menuBox = document.querySelector('.menu__box');

    // Toggle menu box visibility on hamburger menu click
    hamburgerMenu.addEventListener('click', function() {
        menuBox.classList.toggle('open');
    });
});



// Smooth scroll functionality for navigation links for menus items
document.addEventListener('DOMContentLoaded', function() {
    // Function to handle smooth scrolling
    function scrollToSection(sectionId) {
        var section = document.querySelector(sectionId);
        if (section) {
            var sectionTop = section.offsetTop - 100; // Adjust offset as needed
            window.scrollTo({
                top: sectionTop,
                behavior: 'smooth' // Smooth scrolling behavior
            });
        }
    }

    // Attach click event listeners to navigation links
    var navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(function(navLink) {
        navLink.addEventListener('click', function(e) {
            e.preventDefault(); // Prevent default anchor behavior
            var sectionId = navLink.getAttribute('href'); // Get the href attribute value
            scrollToSection(sectionId); // Scroll to the section
        });
    });

    // Check hash on page load and scroll to section if hash exists
    var hash = window.location.hash;
    if (hash) {
        scrollToSection(hash);
    }
});


//PROJECT LIST  VIEWING

document.addEventListener("DOMContentLoaded", function() {
    const projectItems = document.querySelectorAll(".project-list li");

    // Function to display project details
    function displayProjectDetails(projectName) {
        // Here you can implement the logic to display the project details
        // For example, you can open a modal or update a section on the page with the project details
        alert(`Viewing project: ${projectName}`);
    }

    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const projectName = item.innerText;
            displayProjectDetails(projectName);
        });
    });
});



//LOGO//

document.addEventListener('DOMContentLoaded', function() {
    // Get the logo element
    const logo = document.querySelector('.logo');
    const bioSection = document.getElementById('bio');

    // Add click event listener to logo
    logo.addEventListener('click', function() {
        // Add 'active' class to bio section
        bioSection.classList.add('active');

        // Remove 'active' class from other sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });

        // Smooth scroll to bio section
        bioSection.scrollIntoView({ behavior: 'smooth' });
    });

    // Check if the logo was clicked to open bio section from another page
    const url = new URL(window.location.href);
    const hash = url.hash;

    if (hash === '#bio') {
        // Add 'active' class to bio section
        bioSection.classList.add('active');

        // Remove 'active' class from other sections
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });

        // Smooth scroll to bio section
        bioSection.scrollIntoView({ behavior: 'smooth' });
    }
});



/*Project hidden by default*/
document.addEventListener("DOMContentLoaded", function() {
    const projectCategories = document.querySelectorAll(".project-category");

    projectCategories.forEach(category => {
        const categoryTitle = category.querySelector("h3");
        const projectList = category.querySelector(".project-list");

        categoryTitle.addEventListener("click", function() {
            // Close all other open project categories
            projectCategories.forEach(cat => {
                if (cat !== category && cat.classList.contains("open")) {
                    cat.classList.remove("open");
                    cat.querySelector("h3").style.backgroundColor = "#f0f0f0";
                    cat.querySelector(".project-list").style.maxHeight = "0";
                }
            });
            
            // Toggle the "open" class for the clicked project category
            category.classList.toggle("open");

            // Adjust background color on toggle
            if (category.classList.contains("open")) {
                categoryTitle.style.backgroundColor = "#dcdcdc";
            } else {
                categoryTitle.style.backgroundColor = "#f0f0f0";
            }

            // Adjust max height based on toggle
            if (category.classList.contains("open")) {
                projectList.style.maxHeight = projectList.scrollHeight + "px";
            } else {
                projectList.style.maxHeight = "0";
            }
        });

        // Add mouse hover effect
        categoryTitle.addEventListener("mouseenter", function() {
            if (!category.classList.contains("open")) {
                categoryTitle.style.backgroundColor = "#dcdcdc";
            }
        });

        categoryTitle.addEventListener("mouseleave", function() {
            if (!category.classList.contains("open")) {
                categoryTitle.style.backgroundColor = "#f0f0f0";
            }
        });
    });
});




//SPA ARCHITECTURE
document.addEventListener("DOMContentLoaded", function() {
    // Function to handle navigation
    function navigateTo(sectionId) {
        const sections = document.querySelectorAll("section");
        sections.forEach(section => {
            section.classList.remove("active");
        });
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add("active");
        }
    }

    // Add event listeners to navigation links
    const navLinks = document.querySelectorAll(".navigation-block ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            navigateTo(sectionId);
            window.history.pushState({ sectionId }, "", `#${sectionId}`);
        });
    });

    // Handle back/forward navigation
    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.sectionId) {
            navigateTo(event.state.sectionId);
        }
    });

    // Load initial section based on URL
    const initialSectionId = window.location.hash.substring(1) || "home";
    navigateTo(initialSectionId);
});


//SKILLS LI TOGGLE FUNCTIONALITY
document.addEventListener("DOMContentLoaded", function() {
    const skillSections = document.querySelectorAll("#skills > div > h3");

    skillSections.forEach(section => {
        section.addEventListener("click", function() {
            const ul = section.nextElementSibling; // Get the <ul> following the <h3>
            const isOpen = ul.style.display === "block";

            // Toggle the visibility of the <ul> list
            ul.style.display = isOpen ? "none" : "block";
            ul.style.opacity = isOpen ? 0 : 1;

            // Apply fade-in effect when opening the list
            if (!isOpen) {
                setTimeout(() => {
                    ul.style.opacity = 1;
                }, 50); // Adjust timing as needed
            }

            // Close other open lists
            skillSections.forEach(otherSection => {
                if (otherSection !== section) {
                    const otherUl = otherSection.nextElementSibling;
                    otherUl.style.display = "none";
                    otherUl.style.opacity = 0;
                }
            });
        });
    });
});




//MEDIA QUERY-JavaScript for Responsive Behavior
document.addEventListener("DOMContentLoaded", function() {
    const body = document.body;
    const smallDeviceWidth = 768; // Adjust this value as per your design breakpoints

    function checkDeviceWidth() {
        if (window.innerWidth < smallDeviceWidth) {
            body.classList.add("small-device");
        } else {
            body.classList.remove("small-device");
        }
    }

    // Check on page load
    checkDeviceWidth();

    // Check on window resize
    window.addEventListener("resize", checkDeviceWidth);
});



//JavaScript: Ensures the #bio section is shown by default when the page loads and when the logo is clicked.

//PHONE NUMBER JS

const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});



document.addEventListener('DOMContentLoaded', function() {
    // Function to scroll to the bio section
    function scrollToBio() {
        var bioSection = document.getElementById('bio');
        if (bioSection) {
            bioSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Scroll to bio section when the page loads
    scrollToBio();

    // Scroll to bio section when the bio link is clicked
    var bioLink = document.getElementById('bioLink');
    if (bioLink) {
        bioLink.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            scrollToBio();
        });
    }
});



//ACADEMIC WRITING PROJECTS
// scripts.js
document.addEventListener('DOMContentLoaded', function() {
    const projectItems = document.querySelectorAll('.project-list li');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    projectItems.forEach(item => {
        observer.observe(item);
    });
});


//CLICK ON MENUS BAR HIDES NAV 
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.getElementById('hamburger');
    const menuList = document.getElementById('menuList');

    hamburger.addEventListener('click', () => {
        menuList.classList.toggle('show');
    });

    // Close the menu when a menu item is clicked
    menuList.addEventListener('click', () => {
        menuList.classList.remove('show');
    });
});
