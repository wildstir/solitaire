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
var changeDeck = ["E", "E", "E", "E", "E", "E", "E", "E", "0C", "0D", "0H", "0S"];
//var steps = 0;
var playCards, dragSrcEl, dragSrcElOver;

var debug;

//Start or restart new game
function startNewGame(flagLevel)
{
  levelNow = flagLevel;
  if (levelNow)
  {
    document.getElementById("oottrue").classList.add('buttonOn');
    document.getElementById("ootfalse").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/0E.png" id="firstHelpCard" /><img src="./imgs/0E.png" id="secondHelpCard" /><img id="oneOrThreeCards" src="./imgs/0E.png" />';
  }
  else
  {
    document.getElementById("ootfalse").classList.add('buttonOn');
    document.getElementById("oottrue").classList.remove('buttonOn');
    document.getElementById("hiddenBG").innerHTML = '<img id="oneOrThreeCards" src="./imgs/0E.png" />';
  }
  mixSortDeck();
  getMainDeck();
  setMainDeck();
  countHelpCard = mixDeck.length - 1;
  DragAndDropEngine(true);
  timerStart(true);
}

//Mixing begin sort deck cards
function mixSortDeck()
{
  mixDeck = sortDeck.slice();
  for (var i = mixDeck.length - 1; i > 0; i--)
  {
    randomCard = Math.floor(Math.random() * (mixDeck.length - 1));
    tmpCard = mixDeck[randomCard];
    mixDeck[randomCard] = mixDeck[i];
    mixDeck[i] = tmpCard;
  }
}

//Getting main decks wuth 1..7 cards 
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
}

//
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
        changeDeck[i + 1] = mainDeck[i][j];
        imgMainDeck += '<img class="playCard" src="./imgs/' + mainDeck[i][j] + '.png" />';
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
    var a = document.getElementById("oneOrThreeCards").src.split("/");
    var aa = a[a.length - 1];
    if ( aa == "0E.png")
    {
      if (levelNow) document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/0E.png" id="firstHelpCard" /><img src="./imgs/0E.png" id="secondHelpCard" /><img class="playCard helpArea" id="oneOrThreeCards" src="./imgs/0E.png" />';
      else document.getElementById("hiddenBG").innerHTML = '<img class="playCard helpArea" id="oneOrThreeCards" src="./imgs/0E.png" />';
      DragAndDropEngine(true);
    }
    if (countHelpCard < 0) countHelpCard = mixDeck.length - 1;
    if (levelNow)
    {
      document.getElementById("firstHelpCard").src = "./imgs/" + mixDeck[countHelpCard - 2] + ".png";
      document.getElementById("secondHelpCard").src = "./imgs/" + mixDeck[countHelpCard - 1] + ".png";
      document.getElementById("oneOrThreeCards").src = "./imgs/" + mixDeck[countHelpCard] + ".png";
      countHelpCard -= 3;
    }
    else
    {
      document.getElementById("oneOrThreeCards").src = "./imgs/" + mixDeck[countHelpCard] + ".png";
      countHelpCard--;
    }
  }
}

//Drag and Drop
function DragAndDropEngine(runInit)
{
  if (runInit) initDragAndDropsCards();
  dragSrcEl = null;
  dragSrcElOver = null;
  
  function handleDragStart(e) {
    dragSrcEl = this;
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.src);
  }

  function handleDragOver(e) {
    
    if (dragSrcEl != null && dragSrcElOver != null)
    {
      if (e.preventDefault) {
        e.preventDefault();
      }
      e.dataTransfer.dropEffect = 'move';
    }
    return false;
  }

  function handleDragEnter(e) {
    if (dragSrcEl != null)
    {
      dragSrcElOver = this;
      if (dragSrcElOver.id != "oneOrThreeCards")
      {
        this.classList.add('over');
      }
      else dragSrcElOver = null;
    }
  }

  function handleDragLeave(e) {
    if (dragSrcEl != null)
    {
      this.classList.remove('over');
    }
  }

  function handleDrop(e) {
    var flagAccess = false;
    if (dragSrcEl != null && dragSrcElOver != null)
    {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      if (dragSrcEl != this)
      {
        //console.log("Drag: " + dragSrcEl.src);
        //console.log("This: " + this.src);
        //debug = this;
        var a = dragSrcEl.src.split("/");
        var aa = a[a.length - 1];
        var aa1 = parseInt(aa);
        var aa2 = aa[aa.length - 5];
        var b = this.src.split("/");
        var bb = b[b.length - 1];
        var bb1 = parseInt(bb);
        var bb2 = bb[bb.length - 5];
        //console.log(aa1);
        //console.log(bb1);
        if (aa1 && (bb1 || bb1 == 0)) {
          console.log("as");
          if (this.classList[1] == "homeArea")
          {
            if (aa1 == bb1 + 1 && aa2 == bb2)
            {
              this.src = e.dataTransfer.getData('text/html');
              flagAccess = true;
            }
          }
          else
          {
            
            if (aa1 + 1 == bb1)
            {
              newimg = document.createElement("img");
              newimg.className = "playCard";
              newimg.src = dragSrcElOver.src;
              this.src = e.dataTransfer.getData('text/html');
              this.before(newimg);
              initDragAndDropsCards();
              flagAccess = true;
            }
          }
        }
        if (flagAccess)
        {
          if (dragSrcEl.classList[1] == "helpArea")
          {
            if (levelNow) document.getElementById("hiddenBG").innerHTML = '<img src="./imgs/0E.png" id="firstHelpCard" /><img src="./imgs/0E.png" id="secondHelpCard" /><img id="oneOrThreeCards" src="./imgs/0E.png" />';
            else document.getElementById("hiddenBG").innerHTML = '<img id="oneOrThreeCards" src="./imgs/0E.png" />';
            mixDeck.splice(countHelpCard + 1, 1);
            if (mixDeck.length == 0)
            {
              document.getElementById("hiddenCards").src = "./imgs/0E.png";
              countHelpCard = false;
            }
            initDragAndDropsCards();
          }
        }
        //this.after(document.createElement("img"))//this.src = e.dataTransfer.getData('text/html');
        //dragSrcEl.src = this.src;
        //this.src = e.dataTransfer.getData('text/html');
      }
    }
    return false;
  }

  function handleDragEnd(e) {
    if (dragSrcElOver != null) dragSrcElOver.classList.remove('over');
    dragSrcEl = null;
    dragSrcElOver = null;
    //steps += 1;
    //document.getElementById("steps").innerHTML = steps;
  }
  
  function initDragAndDropsCards()
  {
    playCards = document.getElementsByClassName("playCard");
    [].forEach.call(playCards, function(playCardsEvent) {
      playCardsEvent.addEventListener('dragstart', handleDragStart, false);
      playCardsEvent.addEventListener('dragenter', handleDragEnter, false)
      playCardsEvent.addEventListener('dragover', handleDragOver, false);
      playCardsEvent.addEventListener('dragleave', handleDragLeave, false);
      playCardsEvent.addEventListener('drop', handleDrop, false);
      playCardsEvent.addEventListener('dragend', handleDragEnd, false);
    });
  }
  
  function getNumberAndColor()
  {
    return 0;
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