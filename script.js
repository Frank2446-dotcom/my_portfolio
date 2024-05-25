
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
