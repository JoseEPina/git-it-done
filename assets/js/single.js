var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var repoNameEl = document.querySelector("#repo-name");

// parameter is coming from homepage.js?
var getRepoIssues = function (repo) {
   var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

   fetch(apiUrl).then(function (response) {
      // Request was successful
      if (response.ok) {
         response.json().then(function (data) {
            // Pass response data to DOM function
            displayIssues(data);

            // Check if API has paginated issues (a.k.a 'more than 30')
            if (response.headers.get("Link")) {
               displayWarning(repo);
            }
         });
      } else {
         // When request did not find anything, redirect to homepage
         document.location.replace("./index.html");
      }
   });
   console.log(repo);
};

// F
var getRepoName = function () {
   // Retrieve Repo name from url Query String
   var queryString = document.location.search;
   var repoName = queryString.split("=")[1];

   if (repoName) {
      // Display Repo name on the page
      repoNameEl.textContent = repoName;
      console.log(repoName);
      
      getRepoIssues(repoName);
   } else {
      // If no repo was given by user, redirect them to the homepage
      document.location.replace("./index.html");
   }
   // repoNameEl.textContent = repoName;
};

// Build GitHub Issue data into DOM Elements here
var displayIssues = function (issues) {
   // Check if Repo has ANY open issues
   if (issues.length === 0) {
      issueContainerEl.textContent = "This repo has no open issues.";
      return;
   }
   // Loop over given issues
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

// Display warning in DOM to indicate if repo has more than 30 issues
var displayWarning = function (repo) {
   // Add text to warning container
   limitWarningEl.textContent = "To see more than 30 issues, visit ";

   var linkEl = document.createElement("a");
   linkEl.textContent = "See More Issues on GitHub.com";
   linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
   linkEl.setAttribute("target", "_blank");

   // Append to warning container
   limitWarningEl.appendChild(linkEl);
};

// getRepoIssues("facebook/react");
getRepoName();
