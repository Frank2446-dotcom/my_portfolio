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





//CONTACT FORM - LEAVE A MESSAGE
// Contact Form Submission
const form = document.querySelector("#contactForm");
const statusTxt = form.querySelector(".button-area span");

form.onsubmit = (e) => {
    e.preventDefault(); // Prevent form from submitting the traditional way
    statusTxt.style.color = "#0D6EFD";
    statusTxt.style.display = "block";

    // Create a new AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "message.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onload = () => {
        if (xhr.status === 200) {
            let response = xhr.responseText;
            if (response.includes("Sorry") || response.includes("Enter a valid")) {
                statusTxt.style.color = "red";
            } else {
                form.reset();
                setTimeout(() => statusTxt.style.display = "none", 3000);
            }
            statusTxt.innerText = response;
        }
    };

    // Prepare form data
    let formData = new FormData(form);
    let encodedData = new URLSearchParams(formData).toString(); // Encode data

    // Send the form data
    xhr.send(encodedData);
};







//HIRE ME SPECIFY TEXT AREA
document.addEventListener('DOMContentLoaded', () => {
    const clientTypeSelect = document.getElementById('client-type');
    const clientOtherInput = document.getElementById('client-other');
    const jobTypeSelect = document.getElementById('job-type');
    const jobTypeOtherInput = document.getElementById('job-type-other');
    const jobTitleSelect = document.getElementById('job-title');
    const jobTitleOtherInput = document.getElementById('job-title-other');
    const serviceSelect = document.getElementById('service');
    const serviceOtherInput = document.getElementById('service-other');
    const writingTypeSelect = document.getElementById('writing-type');
    const writingTypeOtherInput = document.getElementById('writing-type-other');
    const numSourcesSelect = document.getElementById('num-sources');
    const numSourcesOtherInput = document.getElementById('num-sources-type');
    const citationStyleSelect = document.getElementById('citation-style');
    const citationStyleOtherInput = document.getElementById('citation-style-other');
    const languageSelect = document.getElementById('language');
    const languageOtherInput = document.getElementById('lan-other');

     // Get elements by ID
    const techTypeSelect = document.getElementById('tech-type');
    const techTypeOtherInput = document.getElementById('tech-type-other');
    const nonTechTypeSelect = document.getElementById('non-tech-type');
    const nonTechTypeOtherInput = document.getElementById('non-tech-other');
    

    // Helper function to toggle visibility
    function toggleVisibility(select, input, value) {
        input.classList.toggle('hidden', select.value !== value);
    }

    // Event listeners for dropdowns
    clientTypeSelect.addEventListener('change', () => {
        toggleVisibility(clientTypeSelect, clientOtherInput, 'others');
    });
    
    jobTypeSelect.addEventListener('change', () => {
        toggleVisibility(jobTypeSelect, jobTypeOtherInput, 'others');
    });

    jobTitleSelect.addEventListener('change', () => {
        toggleVisibility(jobTitleSelect, jobTitleOtherInput, 'others');
    });

    
    // Add event listeners
    techTypeSelect.addEventListener('change', () => {
        toggleVisibility(techTypeSelect, techTypeOtherInput, 'other-tech');
    });
    
    nonTechTypeSelect.addEventListener('change', () => {
        toggleVisibility(nonTechTypeSelect, nonTechTypeOtherInput, 'other-non-tech');
    });

    serviceSelect.addEventListener('change', () => {
        toggleVisibility(serviceSelect, serviceOtherInput, 'others');
    });

    writingTypeSelect.addEventListener('change', () => {
        toggleVisibility(writingTypeSelect, writingTypeOtherInput, 'others');
    });

    numSourcesSelect.addEventListener('change', () => {
        toggleVisibility(numSourcesSelect, numSourcesOtherInput, 'type');
    });

    citationStyleSelect.addEventListener('change', () => {
        toggleVisibility(citationStyleSelect, citationStyleOtherInput, 'other');
    });

    languageSelect.addEventListener('change', () => {
        toggleVisibility(languageSelect, languageOtherInput, 'others');
    });
});



//HIRE ME DEADLINE
document.addEventListener('DOMContentLoaded', () => {
    const deadlineInput = document.getElementById('deadline');
    const remainingDaysEl = document.getElementById('remaining-days');
    const remainingHoursEl = document.getElementById('remaining-hours');
    const remainingMinutesEl = document.getElementById('remaining-minutes');
    const remainingSecondsEl = document.getElementById('remaining-seconds');

    function updateRemainingTime() {
        const deadlineValue = new Date(deadlineInput.value);
        const now = new Date();
        
        if (isNaN(deadlineValue.getTime())) {
            remainingDaysEl.textContent = 'Days: N/A';
            remainingHoursEl.textContent = 'Hours: N/A';
            remainingMinutesEl.textContent = 'Minutes: N/A';
            remainingSecondsEl.textContent = 'Seconds: N/A';
            return;
        }
        
        const timeDiff = deadlineValue - now;

        if (timeDiff <= 0) {
            remainingDaysEl.textContent = 'Days: 0';
            remainingHoursEl.textContent = 'Hours: 0';
            remainingMinutesEl.textContent = 'Minutes: 0';
            remainingSecondsEl.textContent = 'Seconds: 0';
            return;
        }
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);
        
        remainingDaysEl.textContent = `Days: ${days}`;
        remainingHoursEl.textContent = `Hours: ${hours}`;
        remainingMinutesEl.textContent = `Minutes: ${minutes}`;
        remainingSecondsEl.textContent = `Seconds: ${seconds}`;
    }
    
    // Update remaining time when the deadline input changes
    deadlineInput.addEventListener('change', updateRemainingTime);
    
    // Initial call to set up remaining time display
    updateRemainingTime();
    
    // Update the remaining time every second
    setInterval(updateRemainingTime, 1000);
});


//SPECIFY REMAINS SELECTED



//sources text area
function toggleOtherStyle() {
    const citationStyleSelect = document.getElementById('citation-style');
    const otherStyleContainer = document.getElementById('other-style-container');

    if (citationStyleSelect.value === 'other') {
        otherStyleContainer.classList.remove('hidden');
    } else {
        otherStyleContainer.classList.add('hidden');
    }
}


//Hire me upload files

let fileArray = []; // Array to keep track of selected files

function displayFiles() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = ''; // Clear previous file list

    const files = fileInput.files;
    fileArray = Array.from(files); // Update fileArray with selected files

    if (fileArray.length > 0) {
        fileArray.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');

            const fileName = document.createElement('span');
            fileName.textContent = file.name;

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.classList.add('remove-button');
            removeButton.onclick = () => removeFile(index);

            fileItem.appendChild(fileName);
            fileItem.appendChild(removeButton);
            fileList.appendChild(fileItem);
        });
    }
}

function removeFile(index) {
    fileArray.splice(index, 1); // Remove file from array
    const dataTransfer = new DataTransfer();
    fileArray.forEach(file => dataTransfer.items.add(file));
    document.getElementById('file-upload').files = dataTransfer.files;
    displayFiles(); // Refresh file list display
}






//REVIEW SECTION
document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.querySelector(".load-more-btn");
    const filters = document.querySelectorAll(".filter-btn");
    const reviewCategories = document.querySelectorAll(".review-category");
    let visibleReviews = {}; // Track how many reviews are visible per category

    // Initialize the visible reviews count for all categories
    reviewCategories.forEach(category => {
    const reviews = category.querySelectorAll(".review");
    reviews.forEach((review, index) => {
        review.classList.add("hidden"); // Initially hide all
    });
    visibleReviews[category.classList[1]] = 0; // Start with 0 visible
    });

    // Show 5 reviews for the "All" category by default
    showReviewsInBatches('all', 5);

    // Filter reviews based on category button click
    filters.forEach(filter => {
    filter.addEventListener("click", (e) => {
        const category = e.target.dataset.category;
        handleFilter(category);
    });
    });

    function handleFilter(category) {
    reviewCategories.forEach(cat => {
        if (category === "all") {
        cat.classList.remove("hidden"); // Show all categories
        showReviewsInBatches(category, 5); // Show first 5 reviews
        } else if (cat.classList.contains(category)) {
        cat.classList.remove("hidden"); // Show the selected category
        showReviewsInBatches(category, 5); // Show first 5 reviews for the category
        } else {
        cat.classList.add("hidden"); // Hide other categories
        }
    });
    }

    // Show reviews in batches of 5 for the selected category
    function showReviewsInBatches(category, count) {
    if (category === 'all') {
        reviewCategories.forEach(category => {
        const reviews = category.querySelectorAll(".review");
        reviews.forEach((review, index) => {
            if (index < count) {
            review.classList.remove("hidden"); // Show review
            } else {
            review.classList.add("hidden"); // Hide review
            }
        });
        });
    } else {
        const selectedCategory = document.querySelector(`.review-category.${category}`);
        const reviews = selectedCategory.querySelectorAll(".review");
        reviews.forEach((review, index) => {
        if (index < count) {
            review.classList.remove("hidden"); // Show review
        } else {
            review.classList.add("hidden"); // Hide review
        }
        });
    }
    }

    // Load more reviews when clicking the "Load More" button
    loadMoreBtn.addEventListener("click", () => {
    reviewCategories.forEach(category => {
        if (!category.classList.contains("hidden")) {
        const reviews = category.querySelectorAll(".review");
        const currentVisible = visibleReviews[category.classList[1]] || 0;

        // Show 5 more reviews or all remaining reviews
        const newVisible = Math.min(currentVisible + 5, reviews.length);
        visibleReviews[category.classList[1]] = newVisible;
        showReviewsInBatches(category.classList[1], newVisible);
        }
    });
    });
});
