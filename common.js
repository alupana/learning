
function filterMatchName(event){
    debugger;
    let searchText = event.target.value;
    filteredArray = cricketScores.filter(function(arrayItem){return checkMatchName(arrayItem, searchText)});
    renderData(filteredArray);
}

function checkMatchName(arrayItem, searchText){
    return arrayItem.tournamentLabel.includes(searchText);
}

function filterMatchStatus(event){
    let searchText = event.target.value;
    if(filteredArray.length > 0){
        filteredArray = filteredArray.filter(function(arrayItem){return checkMatchStatus(arrayItem, searchText)});
    }else{
        filteredArray = cricketScores.filter(function(arrayItem){return checkMatchStatus(arrayItem, searchText)});
    }

    renderData(filteredArray);
}

function checkMatchStatus(arrayItem, searchText){
    return arrayItem.scheduleEntry.matchStatus.text.includes(searchText);
}

function displayAdditionalDetails(arrayItem){
    document.getElementById('rowDetails').innerHTML = `
        <p>Venue: ${filteredArray[arrayItem].scheduleEntry.venue.fullName}</p>
        <p>Venue City: ${filteredArray[arrayItem].scheduleEntry.venue.city}</p>
        <p>Venue Country: ${filteredArray[arrayItem].scheduleEntry.venue.country}</p>
    `;
    
}
function renderData(arrayToProcess){
    //Collect the form data
    let cricketScoresHTML = `<table class="table table-hover table-bordered">
      <th>Match Name<br />
        <input type="text" id="txtMatchName" onblur="filterMatchName(event)" /></th>
      <th>Match date<br />
        <input type="text" id="txtMatchDate" /></th>
      <th>Status<br />
        <input type="text" id="txtMatchStatus"  onblur="filterMatchStatus(event)" /></th>
      <th>Team 1<br />
        <input type="text" id="txtTeam1Name" /></th>
      <th>Team 2<br />
        <input type="text" id="txtTeam2Name" /></th>
        <th>Match Type<br />
        <input type="text" id="txtMatchType" /></th>
      `;
    let i=0;  
    for(i=0; i< arrayToProcess.length; i++){
      try{
        let rowHTML = `<tr onclick="displayAdditionalDetails(${i})" data-bs-toggle="offcanvas" data-bs-target="#demo">
        <td class="text-nowrap">${arrayToProcess[i].tournamentLabel}</td>    
        <td class="text-nowrap">${arrayToProcess[i].scheduleEntry.matchDate}</td>    
        <td class="text-nowrap">${arrayToProcess[i].scheduleEntry.matchStatus.text}</td>    
        <td class="text-nowrap">${arrayToProcess[i].scheduleEntry.team1.team.fullName}</td>    
        <td class="text-nowrap">${arrayToProcess[i].scheduleEntry.team2.team.fullName}</td>
        <td class="text-nowrap">${arrayToProcess[i].scheduleEntry.matchType}</td>       
      </tr>`;

      cricketScoresHTML += rowHTML;
      document.getElementById('rowsCounts').innerHTML = `Rows processed: ${i+1}`
      }catch(ex){
        console.log(`exception in row ${i.toString()} \n ${ex.toString()}`);
      }
      
    }
    cricketScoresHTML += `</table>`
    document.getElementById('cricketInfoDiv').innerHTML = cricketScoresHTML;
    
  }