var currentStrings

function getStrings(style, stringDictionary) {
    for (var index = 0; index < stringDictionary.strings.length; index++) {
        if (style == stringDictionary.strings[index].id) {
            return stringDictionary.strings[index]
        }
    }
    return undefined
}

function changeStrings(str) {
    document.title = str["2048"];
    document.querySelector(".title").textContent = str["2048"];
    document.querySelector(".game-intro").textContent = str["Join the numbers and get to the 2048 tile!"];
    document.querySelector(".game-explanation").innerHTML = '<strong class="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. ' + str["When two tiles with the same number touch"] + ', they <strong>merge into one!</strong>';
    tweet = tweetButton()
    document.querySelector(".sharing").replaceChild(tweet, document.querySelector(".sharing").firstElementChild)
}

function tweetButton() {
    var tweet = document.createElement("a");
    tweet.classList.add("twitter-share-button");
    tweet.setAttribute("href", "https://twitter.com/share");
    tweet.setAttribute("data-via", "marumichannel");
    tweet.setAttribute("data-url", currentStrings["http://marumichannel.github.io/2048/"]);
    tweet.setAttribute("data-counturl", currentStrings["http://marumichannel.github.io/2048/"]);
    tweet.textContent = "Tweet";

    var text = "Check out " + currentStrings["2048"] + ", a game where " +
        currentStrings["you join tiles to score high!"] + " #井口2048";
    tweet.setAttribute("data-text", text);

    return tweet;
}

function initStyle(style, stringDictionary) {
    currentStrings = getStrings(style, stringDictionary);
    changeStrings(currentStrings);
    document.querySelector("#theme").href = 'style/' + style + '.css';
    if (typeof ga !== "undefined") {
      ga("send", "pageview", "/2048/#" + style);
    }
}

function changeStyle(style) {
    location.hash = style;
    location.reload();
}

function buildButton(strings)
{
  var button = document.createElement("a")
  button.innerHTML = "<strong>" + strings["Title"] + "</strong><br>" +
    strings["Subtitle"]
  button.setAttribute("onclick","changeStyle('" + strings["id"] + "')")
  button.setAttribute("type","button")
  button.setAttribute("class","style-button")
  return button
}

function createButtons(stringDictionary) {
    var switcherContainer = document.querySelector(".style-switcher")
    if (stringDictionary.strings.length > 1) {
        for (var index = 0; index < stringDictionary.strings.length; index++) {
          var strings = stringDictionary.strings[index]
          var button = buildButton(strings)
          switcherContainer.firstElementChild.appendChild(button)
        }
    } else {
        switcherContainer.parentElement.removeChild(switcherContainer)
    }
}

var stringDict = iguchi2048_stringDictionary
if (typeof getStrings(location.hash.replace("#", ""), stringDict) != "undefined") {
    initStyle(location.hash.replace("#", ""), stringDict)
    createButtons(stringDict);
} else {
    changeStyle(stringDict.strings[0].id)
};

