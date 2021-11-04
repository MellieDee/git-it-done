//  FIRST VERSION AS a test to see if can get data - 
// var getUserRepos = function() {
//   //make the request - server responds iwht data, then we need to translate data so we can read it and that is what JSON does
//   fetch("https://api.github.com/users/octocat/repos").then(function(response)  {
//     response.json().then(function(data){  
//     console.log(data)
//     });
//   });
//}

var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");


/******       FUNCTIONS START ********/
var formSubmitHandler = function(event) {
  event.preventDefault();
  // get value from input element
  console.log(event);

  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  };
};

var getUserRepos = function (user) {
  //format github api url

  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make a request to the URL
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function(data) {
      displayRepos(data, user);
    });
  } else {
    alert("Error: GitHub User Not Found");
  }
  }).catch(function(error) {
    //notice this ` .catch()` getting chained on to end of `.then()` method
    alert("Unable to connexct to Github");
  });
};




var displayRepos = function(repos, searchTerm) {
  //check if api returned any repos
  if (repos.length === 0) {
    repoContainerEl.textContent = "No repositories found.";
    return;
  }
  
  // repoContainerEl.textContent = "";
  repoSearchTerm.textContent = searchTerm;

  //loop over repos
  for (var i =0; i <repos.length; i++) {
    //format repo name
    var repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    var repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center";
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    //create span el to hold repo name
    var titleEl =  document.createElement("span");
    titleEl.textContent= repoName;

    //append to container
    repoEl.appendChild(titleEl);

    //create status el
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (repos[i].open_issues_count > 0) {
      statusEl.innerHTML =
      "<i class='fas fa-times status-icon icon-danger'><i>" + repos[i].open_issues_count + " issues(s)";  
      } else {
        statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
      }
      //append to container
      repoEl.appendChild(statusEl);

    //append container to dom
    repoContainerEl.appendChild(repoEl);
  }

  console.log(repos);
  console.log(searchTerm);
}

userFormEl.addEventListener("submit", formSubmitHandler);