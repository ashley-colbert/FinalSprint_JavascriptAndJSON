//Fetch data from a JSON file and logging details of potential employees into Javascript console on browser.

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((candidate) => {
      console.log(getContact(candidate));
      console.log(getCurrPos(candidate));
      console.log("Days until candidate available: " + getDaysUntil(candidate));
      console.log(getQual(candidate));
      console.log("Target salary: " + candidate.targetSalary);
      console.log();
    });
  });

//Fetch the data from a JSON file and display it into the HTML browser window.

fetch("./data.json")
  .then((response) => response.json())
  .then((data) => { 
    
    data.forEach((candidate) => {
      const candidateContainer = document.createElement("div");
      candidateContainer.classList.add("candidate-container");
      const HTML = `  
        <ul>
          <li> Candidate: ${getContact(candidate)}</li>
          <li> Current position: ${getCurrPos(candidate)}</li>
          <li> Days until availability: ${getDaysUntil(candidate)}</li>
          <li> Qualifications: ${getQual(candidate)}
          <li> Target salary: ${candidate.targetSalary}
        </ul>
        <br>
        `;
      candidateContainer.innerHTML = HTML;
      document.body.appendChild(candidateContainer);
      });
    })

  //To catch any errors

  .catch(error => {
    console.error(error);
  });

//Functions

function getContact(candidate) {
  return `${candidate.fName} ${candidate.lName}, phone number: ${candidate.phoneNum}`;
}

function getCurrPos(candidate) {
  return candidate.curJobTitle + ": " + candidate.topTasks;
}

function getDaysUntil(candidate) {
  const currentDate = new Date();
  const futureDate = new Date(candidate.availDate);
  const timeDiff = futureDate.getTime() - currentDate.getTime();
  const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return daysDiff;
}

function getQual(candidate) {
  return `Qualifactions: ${candidate.highestEdu}, ${candidate.topSkills}`;
}
