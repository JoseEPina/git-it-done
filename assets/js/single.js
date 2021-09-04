var issueContainerEl = document.querySelector("#issues-container");

// parameter is coming from homepage.js?
var getRepoIssues = function (repo) {
   var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

   fetch(apiUrl).then(function (response) {
      // Request was successful
      if (response.ok) {
         response.json().then(function (data) {
            // Pass response data to DOM function
            displayIssues(data);
         });
      } else {
         // When request did not find anything
         window.alert("There was a problem with your request!");
      }
   });
   console.log(repo);
};

// Build GitHub Issue data into DOM Elements here
var displayIssues = function (issues) {
   // Check if Repo has ANY open issues
   if (issues.length === 0) {
      issueContainerEl.textContent = "This repo has no open issues";
      return;
   }

   for (var i = 0; i < issues.length; i++) {
      // Create an <anchor> link element to take users to the GitHub issue
      var issueEl = document.createElement("a");
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute("href", issues[i].html_url);
      issueEl.setAttribute("target", "_blank");

      // Create <span> to hold issue title
      var titleEl = document.createElement("span");
      titleEl.textContent = issues[i].title;

      // Append to container in DOM
      issueEl.appendChild(titleEl);

      // Create a type element
      var typeEl = document.createElement("span");

      // Check if issue is an actual issue or a pull request
      if (issues[i].pull_request) {
         typeEl.textContent = "(Pull Request)";
      } else {
         typeEl.textContent = "(Issue)";
      }

      // Append new type element to Container in DOM
      issueEl.appendChild(typeEl);
      issueContainerEl.appendChild(issueEl);
   }
};

getRepoIssues("joseepina/bc-project-01");
