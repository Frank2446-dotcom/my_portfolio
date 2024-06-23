
//READ MORE ABOUT ME SECTION
document.addEventListener('DOMContentLoaded', function() {
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

    // Add click event listener to logo
    logo.addEventListener('click', function() {
        // Redirect to homepage
        window.location.href = 'index.html'; // Replace 'index.html' with the URL of your homepage
    });
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

