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
  var ul = document.getElementById('lst');
  ul.innerHTML = '';
  for (let entry of response.entries) {
    var li = `<li class="${entry['.tag']}"`;
    if (entry['.tag'] == 'folder') {
      li += ` onclick="requestFolderContents('${entry.path_display}')"`;
    }
    li += `>${entry.name}</li>`;
    ul.innerHTML += li;
  }
}
