var getUserRepos = function (user) {
   // Format the gitHub API url
   var apiUrl = "https://api.github.com/users/" + user + "/repos";

   // Make a request to the url
   fetch(apiUrl).then(function (response) {
      response.json().then(function (data) {
         console.log(data);
      });
   });
};

getUserRepos("joseepina");

// fetch("https://api.github.com/users/octocat/repos") //
//    .then(function (response) {
//       response.json().then(function (data) {
//          console.log(data);
//       });
//    });

console.log("outside");
