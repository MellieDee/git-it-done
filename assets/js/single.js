var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
  
  //endpoint to hit

  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
  //now create http request to hit the endpoint using fetch API f

  fetch(apiUrl).then(function(response) {
    if(response.ok) {
      response.json().then(function(data) {
      console.log(data);
      displayIssues(data); 
      });
    } else {
      alert("There was a probblem wiht your request!");
    }
  });
};

var displayIssues = function(issues) {
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

getRepoIssues("melliedee/portfolio");
