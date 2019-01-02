/*
New DragAndDropEngine
Когда последняя карта с классом андерАреа остаётся в главной колоде, то ИнитАндер не запускается!
*/

var playCardsHelp;
var playCardsMain;
var playCardsHome;
var playCardsUnder;


var dragCard = null;
var dragCardOver = null;

//initDragAndDropHelp
function initDragAndDropHelp()
{
  playCardsHelp = document.getElementsByClassName("helpArea");
  [].forEach.call(playCardsHelp, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragAllStart, false);
    playCardsEvent.addEventListener('dragend', dragAllEnd, false);
  });
}

//initDragAndDropUnder
function initDragAndDropUnder()
{
  playCardsUnder = document.getElementsByClassName("underArea");
  [].forEach.call(playCardsUnder, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragAllStart, false);
    playCardsEvent.addEventListener('dragend', dragAllEnd, false);
  });
}

//All function for all Event Area
function dragAllStart(e)
{
  dragCard = this;
}
function dragAllEnd(e)
{
  dragCard = null;
  dragCardOver = null;
}


//initDragAndDropMain
function initDragAndDropMain()
{
  playCardsMain = document.getElementsByClassName("mainArea");
  [].forEach.call(playCardsMain, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragAllStart, false);
    playCardsEvent.addEventListener('dragenter', dragMainEnter, false);
    playCardsEvent.addEventListener('dragover', dragMainOver, false);
    playCardsEvent.addEventListener('dragleave', dragMainLeave, false);
    playCardsEvent.addEventListener('drop', dragMainDrop, false);
    playCardsEvent.addEventListener('dragend', dragAllEnd, false);
  });
}
function dragMainEnter(e)
{
  if (dragCard != null)
  {
    var tmpCard = getCardInfo(dragCard);
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
    var cardAboveNow = getCardInfo(dragCard);
    var cardUnderNow = getCardInfo(this);
    var tmpCard = getCardInfo(dragCard);
    var flagAccessMainDeck = false;
    for (var i = 0; i < accessToMainDeck.length; i++)
    {
      if (cardAboveNow[1] == accessToMainDeck[i][0])
      {
        if (cardUnderNow[1] == accessToMainDeck[i][1] || cardUnderNow[1] == accessToMainDeck[i][2]) flagAccessMainDeck = true;
      }
    }
    if (cardAboveNow[0] + 1 == cardUnderNow[0] && tmpCard[0] > 1 && dragCard.parentElement.id != dragCardOver.parentElement.id && flagAccessMainDeck)
    {
      if (dragCard.classList[0] == "underArea")
      {
        aa = dragCard;
        bb = aa.parentElement;
        cc = bb.childElementCount;
        dragCardOver.className = "underArea";
        for (var i = cc - 1; i >= 0; i--)
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
        if (dragCard.classList[0] == "mainArea") dragCard.remove();
        else if (dragCard.classList[0] == "homeArea") dragCard.src = "./imgs/" + (cardAboveNow[0] - 1) + cardAboveNow[0] + ".svg";
      }
      dryThisFunction();
    }
    else if (cardUnderNow[1] == "E" && cardAboveNow[0] == 13)
    {
      if (dragCard.classList[0] == "underArea")
      {
        aa = dragCard;
        bb = aa.parentElement;
        cc = bb.childElementCount;
        dragCardOver.className = "underArea";
        for (var i = cc - 1; i >= 0; i--)
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
        bb.children[0].remove();
      }
      else
      {
        this.src = dragCard.src;
        if (dragCard.classList[0] == "mainArea") dragCard.remove();
        else if (dragCard.classList[0] == "homeArea") dragCard.src = "./imgs/" + (cardAboveNow[0] - 1) + cardAboveNow[0] + ".svg";
      }
      dryThisFunction();
    }
    var listOverElements = document.getElementsByClassName("over");
    for (var i = 0; listOverElements.length > i; i++)
    {
      listOverElements[i].classList.remove("over");
    }
    dragCard = null;
    dragCardOver = null;
  }
  
//Don't repeat yourself function for this function
  function dryThisFunction()
  {
    if (dragCard.classList[0] == "helpArea") dryHelpDeck();
    else if (dragCard.classList[0] == "homeArea")
    {
      dragCard.src = "./imgs/" + (tmpCard[0] - 1) + tmpCard[1] + ".svg";
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
//initDragAndDropHome
function initDragAndDropHome()
{
  playCardsHome = document.getElementsByClassName("homeArea");
  [].forEach.call(playCardsHome, function(playCardsEvent) {
    playCardsEvent.addEventListener('dragstart', dragAllStart, false);
    playCardsEvent.addEventListener('dragenter', dragHomeEnter, false);
    playCardsEvent.addEventListener('dragover', dragHomeOver, false);
    playCardsEvent.addEventListener('dragleave', dragHomeLeave, false);
    playCardsEvent.addEventListener('drop', dragHomeDrop, false);
    playCardsEvent.addEventListener('dragend', dragAllEnd, false);
  });
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
    checkWin();
  }
  
  function checkWin()
  {
    var hearts   = getCardInfo(document.getElementsByClassName("homeArea")[0]);
    var clubs    = getCardInfo(document.getElementsByClassName("homeArea")[1]);
    var diamonds = getCardInfo(document.getElementsByClassName("homeArea")[2]);
    var spades   = getCardInfo(document.getElementsByClassName("homeArea")[3]);
    if (diamonds[0] == 13 && hearts[0] == 13 && spades[0] == 13 && clubs[0] == 13)
    {
      document.getElementById("panelWin").style.display = "block";
      document.getElementById("result").innerHTML = "YOU WIN!<br />Game over from " + document.getElementById("minutes").innerHTML + ":" + document.getElementById("seconds").innerHTML + "<br />Select level to play again";
      clearTimeout(timerId);
    }
  }
}

//Get card information. Example "11H" -> [11, "H"]
function getCardInfo(card)
{
  var cardInfo = new Array();
  var cardSrc = card.src.split("/");
  var cardName = cardSrc[cardSrc.length - 1];
  cardInfo[0] = parseInt(cardName);
  cardInfo[1] = cardName[cardName.length - 5];
  return cardInfo;
}

//Don't repeat yourself function for helpDeck
function dryHelpDeck()
{
  if (levelNow)
  {
    countHelpCardNow -= 1;
    if (countHelpCardNow == 0)
    {
      dragCard.src = "./imgs/0E.svg";
      countHelpCardNow = 3;
    }
    else
    {
      document.getElementsByClassName("helpArea")[0].remove();
      document.getElementById("hiddenBG").children[countHelpCardNow - 1].classList.add("helpArea");
      initDragAndDropHelp();
      mixDeck.splice(countHelpCard + countHelpCardNow + 1, 1);
    }
  }
  else
  {
    if (countHelpCard != mixDeck.length - 2) dragCard.src = "./imgs/" + mixDeck[countHelpCard + 2] + ".svg";
    else dragCard.src = "./imgs/0E.svg";
    mixDeck.splice(countHelpCard + 1, 1);
    if (mixDeck.length == 1)
    {
      document.getElementById("hiddenCards").src = "./imgs/0E.svg";
      document.getElementById("helpCard").src = "./imgs/0E.svg";
      countHelpCard = false;
      [].forEach.call(playCardsHelp, function(playCardsEvent) {
        playCardsEvent.removeEventListener('dragstart', dragAllStart, false);
        playCardsEvent.removeEventListener('dragend', dragAllEnd, false);
      });
    }
  }
}

//Don't repeat yourself function for mainDeck
function dryMainDeck(id)
{
  a = document.getElementById(id);
  b = a.childElementCount;
  f = parseInt(id[1]);
  if (b == 0) document.getElementById(id).innerHTML = '<img class="mainArea" src="./imgs/0E.svg" />';
  else
  {
    if (b + 1 == countMainDeck[f])
    {
      c = document.getElementById(id).children[b - 1];
      d = mainDeck[parseInt(id[1])].length;
      e = d - b;
      c.src = "./imgs/" + mainDeck[parseInt(id[1])][e] + ".svg";
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