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
    const projectItems = document.querySelectorAll(".project-list li");
    function displayProjectDetails(projectName) {
        alert(`Viewing project: ${projectName}`);
    }
    projectItems.forEach(item => {
        item.addEventListener("click", () => {
            const projectName = item.innerText;
            displayProjectDetails(projectName);
        });
    });

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
    const projectCategories = document.querySelectorAll(".project-category");
    projectCategories.forEach(category => {
        const categoryTitle = category.querySelector("h3");
        const projectList = category.querySelector(".project-list");
        categoryTitle.addEventListener("click", function() {
            projectCategories.forEach(cat => {
                if (cat !== category && cat.classList.contains("open")) {
                    cat.classList.remove("open");
                    cat.querySelector("h3").style.backgroundColor = "#f0f0f0";
                    cat.querySelector(".project-list").style.maxHeight = "0";
                }
            });
            category.classList.toggle("open");
            if (category.classList.contains("open")) {
                categoryTitle.style.backgroundColor = "#dcdcdc";
            } else {
                categoryTitle.style.backgroundColor = "#f0f0f0";
            }
            if (category.classList.contains("open")) {
                projectList.style.maxHeight = projectList.scrollHeight + "px";
            } else {
                projectList.style.maxHeight = "0";
            }
        });
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










//MESSAGE CONSOLE OUTPUT
