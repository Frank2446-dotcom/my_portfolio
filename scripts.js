document.addEventListener('DOMContentLoaded', function() {
    // Ensure navigation block visibility on window resize
    var navigationBlock = document.getElementById('navigation-block');
    window.addEventListener('resize', function() {
        if (window.innerWidth > 600) {
            navigationBlock.style.display = 'flex';
        } else {
            navigationBlock.style.display = 'none';
        }
    });

    // READ MORE ABOUT ME SECTION
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

    // HAMBURGER MENU TOGGLE TO THE RESPECTIVE SECTION
    function scrollToSection(sectionId) {
        var section = document.querySelector(sectionId);
        if (section) {
            var sectionTop = section.offsetTop - 100;
            window.scrollTo({ top: sectionTop, behavior: 'smooth' });
            document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
            section.classList.add('active');
        }
    }
    document.querySelectorAll('.navigation-block ul li a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
            window.history.pushState(null, '', this.getAttribute('href'));
        });
    });
    document.querySelectorAll('.menu__box .menu__item').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            scrollToSection(this.getAttribute('href'));
            document.getElementById('menu__toggle').checked = false;
            window.history.pushState(null, '', this.getAttribute('href'));
        });
    });
    window.addEventListener('popstate', function(event) {
        const hash = window.location.hash || '#bio';
        scrollToSection(hash);
    });
    const initialSectionId = window.location.hash || '#bio';
    scrollToSection(initialSectionId);

    // Hide Navigation Bar When Hamburger Menu Opens
    var hamburgerMenu = document.getElementById('menu__toggle');
    var menuBox = document.querySelector('.menu__box');
    hamburgerMenu.addEventListener('click', function() {
        menuBox.classList.toggle('open');
        if (menuBox.classList.contains('open')) {
            navigationBlock.classList.add('hidden');
        } else {
            navigationBlock.classList.remove('hidden');
        }
    });

    // PROJECT LIST VIEWING

    // LOGO
    const logo = document.querySelector('.logo');
    const bioSection = document.getElementById('bio');
    logo.addEventListener('click', function() {
        bioSection.classList.add('active');
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });
        bioSection.scrollIntoView({ behavior: 'smooth' });
    });
    const url = new URL(window.location.href);
    const hash = url.hash;
    if (hash === '#bio') {
        bioSection.classList.add('active');
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            if (section !== bioSection) {
                section.classList.remove('active');
            }
        });
        bioSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Project hidden by default











    

    // SPA ARCHITECTURE
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
    const navLinks = document.querySelectorAll(".navigation-block ul li a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const sectionId = this.getAttribute("href").substring(1);
            navigateTo(sectionId);
            window.history.pushState({ sectionId }, "", `#${sectionId}`);
        });
    });
    window.addEventListener("popstate", function(event) {
        if (event.state && event.state.sectionId) {
            navigateTo(event.state.sectionId);
        }
    });

    // Toggling skill categories
    const skillLinks = document.querySelectorAll('.skills-list .skill-category h3');
    skillLinks.forEach(link => {
        link.addEventListener('click', function() {
            const category = link.closest('.skill-category');
            const skillItems = category.querySelector('.skill-items');
            if (skillItems.style.display === 'none' || skillItems.style.display === '') {
                skillItems.style.display = 'block';
            } else {
                skillItems.style.display = 'none';
            }
        });
    });

    // International telephone input
    const phoneInputField = document.querySelector("#phone");
    if (phoneInputField) {
        const phoneInput = window.intlTelInput(phoneInputField, {
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
        });
    }




    //SKILL SECTION SCROLL MOVEMENT OF DIV CLASS IN DIFF DIRECTIONS

    const skillItems = document.querySelectorAll('.skill-item');

    // Function to check if an element is in the viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top < window.innerHeight &&
            rect.bottom >= 0 &&
            rect.left < window.innerWidth &&
            rect.right >= 0
        );
    };

    // Function to handle adding/removing the animation class
    const handleScroll = () => {
        skillItems.forEach(item => {
            if (isInViewport(item)) {
                item.classList.add('animate');
            } else {
                item.classList.remove('animate');
            }
        });
    };

    // Check on page load
    handleScroll();

    // Check on scroll
    window.addEventListener('scroll', handleScroll);
    ;







    
});










//OPEN/CLOSE PROJECTS

// OPEN/CLOSE PROJECTS
document.addEventListener("DOMContentLoaded", () => {
    const projectCategories = document.querySelectorAll(".project-category");

    // Function to close all project lists
    function closeAllProjectLists() {
        projectCategories.forEach(cat => {
            const list = cat.querySelector(".project-list");
            if (list) {
                list.classList.remove("open");
                list.querySelectorAll("li div").forEach(div => div.style.display = "none");
            }
        });
    }

    // Function to close all project details within a specific project list
    function closeAllProjectDetails(projectList) {
        const listItems = projectList.querySelectorAll("li");
        listItems.forEach(item => {
            const details = item.querySelector("div");
            if (details) {
                details.style.display = "none";
            }
        });
    }

    projectCategories.forEach(category => {
        const categoryTitle = category.querySelector("h3");
        const projectList = category.querySelector(".project-list");
        const listItems = projectList.querySelectorAll("li");

        // Hide project details by default
        closeAllProjectDetails(projectList);

        // Function to toggle the project list visibility
        function toggleProjectList() {
            const isOpen = projectList.classList.contains("open");

            // Close all other project lists
            closeAllProjectLists();

            // Toggle the current project list
            projectList.classList.toggle("open", !isOpen);
        }

        // Function to toggle the visibility of the specific project details
        function toggleProjectDetails(event) {
            if (event.target.tagName === "LI") {
                const details = event.target.querySelector("div");
                if (details) {
                    const isVisible = details.style.display === "block";
                    closeAllProjectDetails(projectList); // Close all other project details in the current list
                    details.style.display = isVisible ? "none" : "block";
                }

                // Scroll the clicked item to the top of the viewport minus the offset
                const offsetTop = event.target.offsetTop - 200;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        }

        // Attach click event to the category title
        categoryTitle.addEventListener("click", toggleProjectList);

        // Attach click event to each list item
        projectList.addEventListener("click", toggleProjectDetails);
    });
});




