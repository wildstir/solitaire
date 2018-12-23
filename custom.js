var countHelpCard = false;
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
//var changeDeck = ["E", "E", "E", "E", "E", "E", "E", "E", "0C", "0D", "0H", "0S"];
var playCardsHelp;
var playCardsMain;
var playCardsHome;
var playCardsUnder;

var debug;

//Start or restart new game
function startNewGame(flagLevel)
{
  levelNow = flagLevel;
  if (levelNow)
  {
    document.getElementById("oottrue").classList.add('buttonOn');
    document.getElementById("ootfalse").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/0E.png" /><img src="./imgs/0E.png" /><img id="helpCard" src="./imgs/0E.png" />';
  }
  else
  {
    document.getElementById("ootfalse").classList.add('buttonOn');
    document.getElementById("oottrue").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img id="helpCard" src="./imgs/0E.png" />';
  }
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
        //changeDeck[i + 1] = mainDeck[i][j];
        imgMainDeck += '<img class="mainArea" src="./imgs/' + mainDeck[i][j] + '.png" />';
      }
      else imgMainDeck += '<img src="./imgs/0B.png" />';
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
      document.getElementById("hiddenCards").src = "./imgs/0B.png";
      [].forEach.call(playCardsHelp, function(playCardsEvent) {
        playCardsEvent.removeEventListener('dragstart', dragHelpStart, false);
        playCardsEvent.removeEventListener('dragend', dragHelpEnd, false);
      });
    }
    if (countHelpCard < 0) countHelpCard = mixDeck.length - 1;
    if (levelNow)
    {
      document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/' + mixDeck[countHelpCard - 2] + '.png" /><img src="./imgs/' + mixDeck[countHelpCard - 1] + '.png" /><img class="helpArea" id="helpCard" src="./imgs/' + mixDeck[countHelpCard] + '.png" />';
      countHelpCard -= 3;
    }
    else
    {
      document.getElementById("hiddenBG").innerHTML = '<img class="helpArea" id="helpCard" src="./imgs/' + mixDeck[countHelpCard] + '.png" />';
      countHelpCard--;
    }
    if (countHelpCard == 0) document.getElementById("hiddenCards").src = "./imgs/0E.png";
    if (countHelpCard != -1) initDragAndDropHelp();
  }
}

//Don't repeat yourself function for helpDeck
function dryHelpDeck()
{
  if (countHelpCard != mixDeck.length - 2) dragCard.src = "./imgs/" + mixDeck[countHelpCard + 2] + ".png";
  else dragCard.src = "./imgs/0E.png";
  mixDeck.splice(countHelpCard + 1, 1);
  if (mixDeck.length == 1)
  {
    document.getElementById("hiddenCards").src = "./imgs/0E.png";
    document.getElementById("helpCard").src = "./imgs/0E.png";
    countHelpCard = false;
    [].forEach.call(playCardsHelp, function(playCardsEvent) {
      playCardsEvent.removeEventListener('dragstart', dragHelpStart, false);
      playCardsEvent.removeEventListener('dragend', dragHelpEnd, false);
    });
  }
}

//Don't repeat yourself function for mainDeck
function dryMainDeck(id)
{
  a = document.getElementById(id);
  b = a.childElementCount;
  f = parseInt(id[1]);
  if (b == 0) document.getElementById(id).innerHTML = '<img class="mainArea" src="./imgs/0E.png">';
  else
  {
    if (b + 1 == countMainDeck[f])
    {
      c = document.getElementById(id).children[b - 1];
      d = mainDeck[parseInt(id[1])].length;
      e = d - b;
      c.src = "./imgs/" + mainDeck[parseInt(id[1])][e] + ".png";
      c.classList.add("mainArea");
      countMainDeck[f] -= 1;
    }
    else
    {
      document.getElementById(id).children[b - 1].className = "mainArea";
    }
  }
  initDragAndDropMain();
  initDragAndDropUnder();
}

//New DragAndDropEngine
var dragCard = null;
var dragCardOver = null;

//initDragAndDropHelp
function initDragAndDropHelp()
{
  playCardsHelp = document.getElementsByClassName("helpArea");
  [].forEach.call(playCardsHelp, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragHelpStart, false);
    playCardsEvent.addEventListener('dragend', dragHelpEnd, false);
  });
}
function dragHelpStart(e)
{
  dragCard = this;
}
function dragHelpEnd(e)
{
  dragCard = null;
  dragCardOver = null;
}

//initDragAndDropMain
function initDragAndDropMain()
{
  playCardsMain = document.getElementsByClassName("mainArea");
  [].forEach.call(playCardsMain, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragMainStart, false);
    playCardsEvent.addEventListener('dragenter', dragMainEnter, false);
    playCardsEvent.addEventListener('dragover', dragMainOver, false);
    playCardsEvent.addEventListener('dragleave', dragMainLeave, false);
    playCardsEvent.addEventListener('drop', dragMainDrop, false);
    playCardsEvent.addEventListener('dragend', dragMainEnd, false);
  });
}
function dragMainStart(e)
{
  dragCard = this;
}
function dragMainEnter(e)
{
  if (dragCard != null)
  {
    var tmpCard = new Array();
    tmpCard = getCardInfo(dragCard);
    if (tmpCard[0] > 1)
    {
      this.classList.add("over");
      dragCardOver = this;
    }
  }
}
function dragMainOver(e)
{
  if (e.preventDefault) {
    e.preventDefault();
  }
}
function dragMainLeave(e)
{
  if (dragCard != null)
  {
    this.classList.remove("over");
  }
}
function dragMainDrop(e)
{
  if (dragCard != null)
  {
    var deckMainId = dragCard.parentElement.id;
    var cardAboveNow = cardUnderNow = tmpCard = new Array();
    cardAboveNow = getCardInfo(dragCard);
    cardUnderNow = getCardInfo(this);
    tmpCard = getCardInfo(dragCard);
    if (cardAboveNow[0] + 1 == cardUnderNow[0] && tmpCard[0] > 1)
    {
      if (dragCard.classList[0] == "underArea")
      {
        aa = dragCard;
        bb = aa.parentElement;
        cc = bb.childElementCount;
        dragCardOver.className = "underArea";
        for (var i = cc - 1; i > 0; i--)
        {
          tmptmp = getCardInfo(bb.children[i])
          if (cardAboveNow[0] >= tmptmp[0] && tmptmp[1] != "B")
          {
            var newCard = document.createElement("img");
            newCard.className = "underArea";
            newCard.src = bb.children[i].src;
            this.after(newCard);
            bb.children[i].remove();
          }
        }
        aa = dragCardOver;
        bb = aa.parentElement;
        cc = bb.childElementCount;
        bb.children[cc - 1].className = "mainArea";
      }
      else
      {
        var newCard = document.createElement("img");
        newCard.className = "underArea";
        newCard.src = dragCardOver.src;
        this.src = dragCard.src;
        this.before(newCard);
        dragCard.remove();
      }
      dryThisFunction();
    }
    else if (cardUnderNow[1] == "E" && cardAboveNow[0] == 13)
    {
      this.src = dragCard.src;
      dryThisFunction();
    }
    var tmpCard = new Array();
    tmpCard = getCardInfo(dragCard);
    if (tmpCard[0] > 1) dragCardOver.classList.remove("over");
    dragCard = null;
    dragCardOver = null;
  }
  
//Don't repeat yourself function for this function
  function dryThisFunction()
  {
    if (dragCard.classList[0] == "helpArea") dryHelpDeck();
    else if (dragCard.classList[0] == "homeArea")
    {
      dragCard.src = "./imgs/" + (tmpCard[0] - 1) + tmpCard[1] + ".png";
    }
    else if (dragCard.classList[0] == "mainArea")
    {
      dryMainDeck(deckMainId);
    }
    else if (dragCard.classList[0] == "underArea")
    {
      dryMainDeck(deckMainId);
    }
  }
}
function dragMainEnd(e)
{
  dragCard = null;
  dragCardOver = null;
}
//initDragAndDropHome
function initDragAndDropHome()
{
  playCardsHome = document.getElementsByClassName("homeArea");
  [].forEach.call(playCardsHome, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragHomeStart, false);
    playCardsEvent.addEventListener('dragenter', dragHomeEnter, false);
    playCardsEvent.addEventListener('dragover', dragHomeOver, false);
    playCardsEvent.addEventListener('dragleave', dragHomeLeave, false);
    playCardsEvent.addEventListener('drop', dragHomeDrop, false);
    playCardsEvent.addEventListener('dragend', dragHomeEnd, false);
  });
}
function dragHomeStart(e)
{
  dragCard = this;
}
function dragHomeEnter(e)
{
  if (dragCard != null && dragCard.classList[0] != "homeArea")
  {
    this.classList.add("over");
    dragCardOver = this;
  }
}
function dragHomeOver(e)
{
  if (e.preventDefault) {
    e.preventDefault();
  }
}
function dragHomeLeave(e)
{ 
  if (dragCard != null && dragCardOver != null)
  {
    this.classList.remove("over");
  }
}
function dragHomeDrop(e)
{
  if (dragCard != null && dragCardOver != null)
  {
    var deckMainId = dragCard.parentElement.id;
    var cardAboveNow = cardUnderNow = new Array();
    cardAboveNow = getCardInfo(dragCard);
    cardUnderNow = getCardInfo(this);
    if ((cardAboveNow[0] == cardUnderNow[0] + 1) && (cardAboveNow[1] == cardUnderNow[1]))
    {
      this.src = dragCard.src;
      if (dragCard.classList[0] == "helpArea") dryHelpDeck();
      else if (dragCard.classList[0] == "mainArea") 
      {
        dragCard.remove();
        dryMainDeck(deckMainId);
      }
    }
    dragCard = null;
    dragCardOver.classList.remove("over");
    dragCardOver = null;
  }
}
function dragHomeEnd(e)
{
  dragCard = null;
  dragCardOver = null;
}

//initDragAndDropUnder
function initDragAndDropUnder()
{
  playCardsUnder = document.getElementsByClassName("underArea");
  [].forEach.call(playCardsUnder, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragUnderStart, false);
    playCardsEvent.addEventListener('dragend', dragUnderEnd, false);
  });
}
function dragUnderStart(e)
{
  console.log("UnderStart");
  dragCard = this;
}
function dragUnderEnd(e)
{
    console.log("UnderEnd");
  dragCard = null;
  dragCardOver = null;
}

//
function getCardInfo(card)
{
  var cardInfo = new Array();
  var cardSrc = card.src.split("/");
  var cardName = cardSrc[cardSrc.length - 1];
  cardInfo[0] = parseInt(cardName);
  cardInfo[1] = cardName[cardName.length - 5];
  return cardInfo;
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