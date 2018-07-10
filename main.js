let bugForm = document.querySelector('#bugInput');
bugForm.addEventListener('submit', saveBug);

function saveBug(e) {
    e.preventDefault();
    let bugId = chance.guid();
    let bugStatus = 'Open';
    let bugDesc = document.querySelector('#bugDesc').value;
    let bugAssigned = document.querySelector('#bugAssigned').value;
    let bugSev = document.querySelector('#bugSev').value;

    let bug = {
        id: bugId,
        description: bugDesc,
        severity: bugSev,
        assignedTo: bugAssigned,
        status: bugStatus
    }

    if (localStorage.getItem('bugs') == null) {
        var bugs = [];
        bugs.push(bug);
        localStorage.setItem('bugs', JSON.stringify(bugs));
    } else {
        var bugs = JSON.parse(localStorage.getItem('bugs'));
        bugs.push(bug);
        localStorage.setItem('bugs', JSON.stringify(bugs));
    }

    fetchBugs();
    bugForm.reset();
}

function setStatus(e) {
    var bugs = JSON.parse(localStorage.getItem('bugs'));

    for (var i = 0; i < bugs.length; i++) {
        if(bugs[i].id == e) bugs[i].status = 'Closed';  
    }

    localStorage.setItem('bugs', JSON.stringify(bugs));
    fetchBugs();
}

function deleteBug(e) {
    var bugs = JSON.parse(localStorage.getItem('bugs'));

    for (var i = 0; i < bugs.length; i++) {
      if (bugs[i].id == e) {
        bugs.splice(i, 1);
      }
    }
  
    localStorage.setItem('bugs', JSON.stringify(bugs));
    fetchBugs();
}


function fetchBugs() {
    var bugs = JSON.parse(localStorage.getItem('bugs'));
    let bugListe = document.querySelector('#bugList');

    bugList.innerHTML = '';

    for(var i = 0; i < bugs.length; i++) {
        var id = bugs[i].id;
        let desc = bugs[i].description;
        let sev = bugs[i].severity;
        let assigned = bugs[i].assignedTo;
        let status = bugs[i].status;

        bugList.innerHTML +=   '<div class="card text-center bg-light p-3">'+
        '<h6>Bug ID: ' + id + '</h6>'+
        '<p><span class="badge badge-info">' + status + '</span></p>'+
        '<h3>' + desc + '</h3>'+
        '<p><span class="fa fa-clock-o"></span> ' + sev + '</p>'+
        '<p><span class="fa fa-user"></span> ' + assigned + '</p>'+
         '<div class="btn-group text-center" id="buttons">'+
            '<a href="#/" onclick="setStatus(\''+id+'\')" class="btn btn-warning">Close</a> '+
            '<a href="#/" onclick="deleteBug(\''+id+'\')" class="btn btn-danger">Delete</a>'+
          '</div>'
        '</div>';

        // bugList.innerHTML += `
        //     <div class="card text-center bg-light p-3">
        //         <h6>Bug ID: ${id}</h6>
        //         <p><span class="badge badge-info">${status}</span></p>
        //         <h3>${desc}</h3>
        //         <p><span class="fa fa-clock-o"></span> ${sev}</p>
        //         <p><span class="fa fa-user"></span> ${assigned}</p>
        //         <div class="btn-group text-center" id="buttons">
        //             <a href="#/" class="btn btn-warning" id="closeBtn">Close</a>
        //             <a href="#/" class="btn btn-danger" id="deleteBtn">Delete</a>
        //         </div>
        //     </div>
        //     `;

         //   document.querySelector('#closeBtn').addEventListener('click', () => setStatus(id));
         //   document.querySelector('#deleteBtn').addEventListener('click', () => deleteBug(id));
    }

}

window.onload = () => fetchBugs();
