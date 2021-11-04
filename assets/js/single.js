var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
var linkEl = document.createElement("a");

var repoNameEl = document.querySelector("#repo-name");


getRepoName = function () {
  //grab name from query string
  var queryString = document.location.search;
  var repoName = queryString.split("=")[1];
  // console.log(repoName);
  if (repoName) {
    //if the repo name exiss ie is TRUE then, display repo Name on the page
    repoNameEl.textContent = repoName;
    getRepoIssues(repoName);
  } else {
    //if not repo was given redirect to the home page
    document.location.replace("./index.html");
  }
};

var displayWarning = function (repo) {
  limitWarningEl.textContent = "To see more than 30 issues, visit "
  linkEl.textContent = "See more Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");
  //append to warning container
  limitWarningEl.appendChild(linkEl);
  console.log(repo);
};

var getRepoIssues = function (repo) {
  //endpoint to hit
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  //now create http request to hit the endpoint using fetch API f

  //make a GET request to the URL
  fetch(apiUrl).then(function(response) {
    //.if request was successful then display the data
    if (response.ok) {
      response.json().then(function (data) {
        // console.log(data);
        displayIssues(data);

        //check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      //if not successful diret o homepage
      document.location.replace("./index.html");
    }
  });
};

var displayIssues = function (issues) {
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues!";
  }

  for (i = 0; i < issues.length; i++) {
    //create empty <a> per issue
    var issueEl = document.createElement("a");
    issueEl.classList = "list-item flex-row justifu-space-between align-center";
    issueEl.setAttribute("href", issues[i].html_url);
    issueEl.setAttribute("target", "_blank");
    // Again, this looks like what we did with repo data in homepage.js. The biggest difference is the data we're working with. Issue objects have an html_url property, which links to the full issue on GitHub. We also added a target="_blank" attribute to each <a> element, to open the link in a new tab instead of replacing the current webpage.

    issueContainerEl.appendChild(issueEl);


    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issues[i].title;

    //append to container
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is issue or pull req
    if (issues[i].pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent = "(Issue)";
    }
    //append to container
    issueEl.appendChild(typeEl);
  };
};

getRepoName()
// getRepoIssues("facebook/react");
