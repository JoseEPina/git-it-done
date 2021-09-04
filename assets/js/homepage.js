// New variables to store a ref to the <form> element and <input> element
// each accompanied with their own IDs
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainterEL = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

var formSubmitHandler = function (event) {
   event.preventDefault(); // To disable <button> "submit/refresh page" behaviour
   // get value from input element
   var username = nameInputEl.value.trim();

   // check for user input and assigns it as a "string"?
   // if username matches a user in Repo then run our function to
   // retrieve the data
   if (username) {
      getUserRepos(username);
      // Then, run this code to clear the form and remove the <input> element's value.
      nameInputEl.value = "";
   } else {
      window.alert("Please enter a GitHub username");
   }
};

// Function to get user repo info/data
var getUserRepos = function (user) {
   // Format the gitHub API url
   var apiUrl = "https://api.github.com/users/" + user + "/repos";

   // Make a request to the url
   fetch(apiUrl) //
      .then(function (response) {
         // Request was successful
         if (response.ok) {
            // .ok is a read-only property of the Response interface
            response.json().then(function (data) {
               displayRepos(data, user);
            });
         } else {
            alert("Error: GitHub User Not Found");
         }
      })
      .catch(function (error) {
         // Notice this '.catch()' method is being chained onto the end
         // of the '.then()' method
         window.alert("Unable to connect to GitHub");
      });
};

// function parameters come from function above (data, user)
// then our displayRepos func will use the data properties from API
// in order to display properly into DOM elements
var displayRepos = function (repos, searchTerm) {
   // To check if API with user entered has any repos
   // If not, then send alert.
   if (repos.length === 0) {
      repoContainterEL.textContent = "No repositories found.";
   }

   // Clear old content from previous search
   repoContainterEL.textContent = "";
   repoSearchTerm.textContent = searchTerm;

   // Loop over Repos
   for (var i = 0; i < repos.length; i++) {
      // Format Repo name
      var repoName = repos[i].owner.login + "/" + repos[i].name;

      // Create a container for each repo with a 'class List'
      // for proper display styling
      var repoEl = document.createElement("a");
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);
      
      // Create a span elements to hold repository name
      var titleEl = document.createElement("span");
      titleEl.textContent = repoName;

      // Append to container
      repoEl.appendChild(titleEl);

      // Create a status element with it's own 'class List'
      var statusEl = document.createElement("span");
      statusEl.classList = "flex-row align-center";

      // Check if current repo has issues or not
      // if found, display the number of issues and a red X icon
      // if none found, display a blue check mark instead
      if (repos[i].open_issues_count > 0) {
         statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
      } else {
         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }

      // Append status element "icon" to container
      repoEl.appendChild(statusEl);

      // Append container to the DOM
      repoContainterEL.appendChild(repoEl);
   }
   console.log(repos);
   console.log(searchTerm);
};

// run formSubmit function on "click submit"
userFormEl.addEventListener("submit", formSubmitHandler);

console.log("outside");
