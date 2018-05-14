var createPolitician = function(name, partyColor)//factory function creates object and properties for each candidate
//two parallel objects, one for each politician
{

//politican object and properties
  var politician = {};
  politician.name = name;
  politician.electionResults = null;
  politician.totalVotes = 0;
  politician.partyColor = partyColor;

//algorithm to tally votes/state
  politician.voteTally = function(){
  this.totalVotes = 0;
  for (var i = 0; i < this.electionResults.length; i++){
   this.totalVotes = this.totalVotes + this.electionResults[i];
}
};

//run for each candidate
  return politician;
//end of factory function to create politican objects
};

//candidate, relates back to factory function parameters
var debbie = createPolitician("Debbie Dem", [132, 17, 11]);
var remmi = createPolitician("Remmi Rep", [245, 141, 136]);

//electoral college results from spreadsheet
debbie.electionResults = [5, 1, 7, 2, 33, 6, 4, 2, 1, 14, 8, 3, 1, 11, 11, 0, 5, 3, 3, 3, 7, 4, 8, 9, 3, 7, 2, 2, 4, 2, 8, 3, 15, 15, 2, 12, 0, 4, 13, 1, 3, 2, 8, 21, 3, 2, 11, 1, 3, 7, 2];

remmi.electionResults = [4, 2, 4, 4, 22, 3, 3, 1, 2, 15, 8, 1, 3, 9, 0, 6, 1, 5, 5, 1, 3, 7, 8, 1, 3, 3, 1, 3, 2, 2, 6, 2, 14, 0, 1, 6, 7, 3, 7, 3, 6, 1, 3, 17, 3, 1, 2, 11, 2, 3, 1];

//adjustment to electoral college results
debbie.electionResults[9] = 1;
remmi.electionResults[9] = 28;

debbie.electionResults[4] = 17;
remmi.electionResults[4] = 38;

debbie.electionResults[43] = 11;
remmi.electionResults[43] = 27;

//console.log(remmi.electionResults);
//console.log(debbie.electionResults);

//assign the winner of each state
var setStateResults = function(state){
theStates[state].winner = null; //why set to null first???

  if (remmi.electionResults[state] > debbie.electionResults[state]){theStates[state].winner = remmi;//set winner to the candidate object, not the candidate's name this time
  }else if (remmi.electionResults[state] < debbie.electionResults[state]){theStates[state].winner = debbie;}

//and change the color of each state based on the winner
var stateWinner = theStates[state].winner;
  if (stateWinner !== null){theStates[state].rgbColor = stateWinner.partyColor;}
  else {theStates[state].rgbColor = [11, 32, 57];}

//populate country results table
//if I moved this, voteTally function, & winner function to below remmi.electionResults THE country table would fill in when the page loaded instead of after running the cursor over the first state
var countryInfoTable = document.getElementById("countryResults");
  var row = countryInfoTable.children[0].children[0];

  row.children[0].innerText = debbie.name;
  row.children[1].innerText = debbie.totalVotes;
  row.children[2].innerText = remmi.name;
  row.children[3].innerText = remmi.totalVotes;
  row.children[5].innerText = winner;

//populate state results table
var stateInfoTable = document.getElementById("stateResults");
  var header = stateInfoTable.children[0]; //since second "children" is not populated, could add it in here
  var body = stateInfoTable.children[1];
  var stateName = header.children[0].children[0];
  var abbrev = header.children[0].children[1];
  var candidate1Name = body.children[0].children[0];
  var candidate2Name = body.children[1].children[0];
  var candidate1Results = body.children[0].children[1];
  var candidate2Results = body.children[1].children[1];
  var winnersName = body.children[2].children[1];


  stateName.innerText = theStates[state].nameFull;
  abbrev.innerText = "(" +theStates[state].nameAbbrev +")";
  candidate1Name.innerText = debbie.name;
  candidate2Name.innerText = remmi.name;
  candidate1Results.innerText = debbie.electionResults[state];
  candidate2Results.innerText = remmi.electionResults[state];

  if (theStates[state].winner === null){
    winnersName.innerText = "DRAW";
  } else {
    winnersName.innerText = theStates[state].winner.name;
  }

//end of setStateResults function
}

//call the algorithm to tally votes
//if I moved this, voteTally function, & winner function to below remmi.electionResults THE country table would fill in when the page loaded instead of after running the cursor over the first state
remmi.voteTally();
debbie.voteTally();

console.log(remmi.totalVotes);
console.log(debbie.totalVotes);

//declare winner of electoral college
//if I moved this, voteTally function, & winner function to below remmi.electionResults THE country table would fill in when the page loaded instead of after running the cursor over the first state
var winner = "???"; ///doesn't need ??? to work

      if (remmi.totalVotes > debbie.totalVotes){
        winner = remmi.name;
      }else if (remmi.totalVotes < debbie.totalVotes){
        winner = debbie.name;
      }else{
        winner = "It's a tie!"}

console.log("And the winner is..." + winner + "!!!");

//log to check candidate's color assigned
//should console.logs be commented out in finished code? removed? 
console.log("Remmi's color is " + remmi.partyColor);
console.log("Debbie's color is " + debbie.partyColor);
