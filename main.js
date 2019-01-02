var countHelpCard = false;
var countHelpCardNow;
var sortDeck = ["2C",  "2D",  "2H",  "2S",
                "3C",  "3D",  "3H",  "3S",
                "4C",  "4D",  "4H",  "4S",
                "5C",  "5D",  "5H",  "5S",
                "6C",  "6D",  "6H",  "6S",
                "7C",  "7D",  "7H",  "7S",
                "8C",  "8D",  "8H",  "8S",
                "9C",  "9D",  "9H",  "9S",
                "10C", "10D", "10H", "10S",
                "11C", "11D", "11H", "11S",
                "12C", "12D", "12H", "12S",
                "13C", "13D", "13H", "13S",
                "1C",  "1D",  "1H",  "1S"];
var mixDeck, helpDeck, levelNow;
var mainDeck = new Array(new Array(), new Array(), new Array(), new Array(), new Array(), new Array(), new Array());
var countMainDeck = [1,2,3,4,5,6,7];
//var backStep = ["E", "E", "E", "E", "E", "E", "E", "E", "0C", "0D", "0H", "0S"];
//var steps = 0;
var accessToMainDeck = [["H", "S", "C"], ["D", "S", "C"], ["S", "H", "D"], ["C", "H", "D"]];

var debug;

//Start or restart new game
function startNewGame(flagLevel)
{
  countHelpCardNow = 3;
  document.getElementById("panelWin").style.display = "none";
  document.getElementById("hiddenCards").src = "./imgs/0B.svg";
  levelNow = flagLevel;
  if (levelNow)
  {
    document.getElementById("oottrue").classList.add('buttonOn');
    document.getElementById("ootfalse").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/0E.svg" /><img src="./imgs/0E.svg" /><img id="helpCard" src="./imgs/0E.svg" />';
  }
  else
  {
    document.getElementById("ootfalse").classList.add('buttonOn');
    document.getElementById("oottrue").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img id="helpCard" src="./imgs/0E.svg" />';
  }
  document.getElementById("deckHome").innerHTML = '<img class="homeArea" src="./imgs/0H.svg" /><img class="homeArea" src="./imgs/0C.svg" /><img class="homeArea" src="./imgs/0D.svg" /><img class="homeArea" src="./imgs/0S.svg" />';
  mixSortDeck();
  getMainDeck();
  setMainDeck();
  countHelpCard = mixDeck.length - 1;
  initDragAndDropMain();
  initDragAndDropHome();
  timerStart(true);
}

//Mixing begin sort deck cards
function mixSortDeck()
{
  mixDeck = sortDeck.slice();
  for (var i = mixDeck.length - 1; i > 0; i--)
  {
    randomCard = Math.floor(Math.random() * (mixDeck.length - 1));
    var tmpCard = mixDeck[randomCard];
    mixDeck[randomCard] = mixDeck[i];
    mixDeck[i] = tmpCard;
  }
}

//Getting main decks with 1..7 cards
function getMainDeck()
{
  for (var i = 0; i < mainDeck.length; i++)
  {
    for (var j = 0; j < i + 1; j++)
    {
      randomCard = Math.floor(Math.random() * (mixDeck.length - 1));
      mainDeck[i][j] = mixDeck.splice(randomCard, 1)[0];
    }
  }
  mixDeck.unshift("0E");
}

//setMainDeck
function setMainDeck()
{
  divMainDeck = document.querySelectorAll('#deckMain div');
  for (var i = 0; mainDeck.length > i; i++)
  {
    var imgMainDeck = "";
    for (var j = mainDeck[i].length - 1; j >= 0; j--)
    {
      if (j == 0)
      {
        imgMainDeck += '<img class="mainArea" src="./imgs/' + mainDeck[i][j] + '.svg" />';
      }
      else imgMainDeck += '<img src="./imgs/0B.svg" />';
    }
    divMainDeck[i].innerHTML = imgMainDeck;
  }
}

//Getting the next card or cards
function getNextHelpCard()
{
  if (countHelpCard !== false)
  {
    if (countHelpCard == 0)
    {
      document.getElementById("hiddenCards").src = "./imgs/0B.svg";
      [].forEach.call(playCardsHelp, function(playCardsEvent) {
        playCardsEvent.removeEventListener('dragstart', dragAllStart, false);
        playCardsEvent.removeEventListener('dragend', dragAllEnd, false);
      });
    }
    if (countHelpCard < 0) countHelpCard = mixDeck.length - 1;
    if (levelNow)
    {
      document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/' + mixDeck[countHelpCard - 2] + '.svg" /><img src="./imgs/' + mixDeck[countHelpCard - 1] + '.svg" /><img class="helpArea" id="helpCard" src="./imgs/' + mixDeck[countHelpCard] + '.svg" />';
      countHelpCard -= 3;
    }
    else
    {
      document.getElementById("hiddenBG").innerHTML = '<img class="helpArea" id="helpCard" src="./imgs/' + mixDeck[countHelpCard] + '.svg" />';
      countHelpCard--;
    }
    if (countHelpCard == 0) document.getElementById("hiddenCards").src = "./imgs/0E.svg";
    if (countHelpCard != -1) initDragAndDropHelp();
  }
}

//Timer
var s, m, timerId;
function timerStart(flag)
{
  if (flag)
  {
    if (timerId != null) clearTimeout(timerId);
    s = -1;
    m = 0;
    document.getElementById("minutes").innerHTML = "00";
  }
  s++;
  if (s > 59)
  {
    s = 0;
    m++;
    if (m < 10) document.getElementById("minutes").innerHTML = "0" + m;
    else document.getElementById("minutes").innerHTML = m;
  }
  if (s < 10) document.getElementById("seconds").innerHTML = "0" + s;
  else document.getElementById("seconds").innerHTML = s;
  timerId = setTimeout(timerStart, 1000);
}