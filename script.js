
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
