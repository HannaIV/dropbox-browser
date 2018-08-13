"use strict";

function init() {
  requestFolderContents('');
}
window.onload = init;

function requestFolderContents(path) {
  fetch("https://api.dropboxapi.com/2/files/list_folder", {
    body: JSON.stringify({
      "path": path,
    }),
    headers: {
      Authorization: "Bearer YS1x4kZ9tZcAAAAAAAAY3UCJt8tYrE1iwS7F7LKqVYQVZG3BHwRFio1YKMmENyCp",
      "Content-Type": "application/json"
    },
    method: "POST"
  }).then(
    function (response) {
      if (response.status == 200) {
        document.getElementById('currentPath').innerText = path ? path : '/';
        response.json().then(process);
      }
    }
  );
}

function process(response) {
  var ulElement = document.getElementById('lst');
  ulElement.innerHTML = '';

  for (let entry of response.entries) {
    var liElement = document.createElement("li");
    if (entry['.tag'] == 'folder') {
      liElement.setAttribute('onclick', `requestFolderContents('${entry.path_display}')`);
      liElement.setAttribute('class', 'folder');

      var iElement = document.createElement('i');
      iElement.setAttribute('class', 'fa-li far fa-folder')
      liElement.appendChild(iElement);
    } else {
      var iElement = document.createElement('i');
      iElement.setAttribute('class', 'fa-li far fa-file')
      liElement.appendChild(iElement);
    }
    liElement.appendChild(document.createTextNode(entry.name))
    ulElement.appendChild(liElement);
  }
}
