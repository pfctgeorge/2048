var currentStrings
var stringDictionary = { strings: [
    {
        "id": "yukachi",
        "2048": "井口 2048",
        "Title": "井口",
        "Subtitle": "(Iguchi Yuka)",
        "Join the numbers and get to the 2048 tile!": "Join the 井口 and get the 井口 2048 tile!",
        "When two tiles with the same number touch": "When two tiles with the same 井口 touch, they merge into one!",
        "you join tiles to score high!": "you join 井口 to score high!",
        "You win!": "You win! ⊂（＿＾ω＾）⊃",
        "Game over!": "Game over!",
        "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/#yukachi"
    },
    {
        "id": "rieshon",
        "2048": "りえしょん 2048",
        "Title": "りえしょん",
        "Subtitle": "(Murakawa Rie)",
        "Join the numbers and get to the 2048 tile!": "Join the りえしょん and get the りえしょん 2048 tile!",
        "When two tiles with the same number touch": "When two tiles with the same りえしょん touch",
        "you join tiles to score high!": "you join りえしょん to score high!",
        "You win!": "You win! (*´ω`*三*´ω`*)",
        "Game over!": "Game over!",
        "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/#rieshon"
    },
    {
        "id": "ayaneru",
        "2048": "あやねる 2048",
        "Title": "あやねる",
        "Subtitle": "(Sakura Ayane)",
        "Join the numbers and get to the 2048 tile!": "Join the あやねる and get the あやねる 2048 tile!",
        "When two tiles with the same number touch": "When two tiles with the same あやねる touch",
        "you join tiles to score high!": "you join あやねる to score high!",
        "You win!": "You win!",
        "Game over!": "Game over!",
        "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/#ayaneru"
    },
    {
        "id": "ucchii",
        "2048": "うっちー 2048",
        "Title": "うっちー",
        "Subtitle": "(Uchida Aya)",
        "Join the numbers and get to the 2048 tile!": "Join the うっちー and get the うっちー 2048 tile!",
        "When two tiles with the same number touch": "When two tiles with the same うっちー touch",
        "you join tiles to score high!": "you join うっちー score high!",
        "You win!": "You win!　（・８・）",
        "Game over!": "Game over!",
        "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/#ucchii"
    },
    {
        "id": "sugar",
        "2048": "しゅがぁ 2048",
        "Title": "しゅがぁ",
        "Subtitle": "(Satou Satomi)",
        "Join the numbers and get to the 2048 tile!": "Join the しゅがぁ and get the しゅがぁ 2048 tile!",
        "When two tiles with the same number touch": "When two tiles with the same しゅがぁ touch",
        "you join tiles to score high!": "you join しゅがぁ to score high!",
        "You win!": "You win!",
        "Game over!": "Game over!",
        "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/#sugar"
    }
]}

function getStrings(style) {
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

function initStyle(style) {
    currentStrings = getStrings(style);
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

if (typeof getStrings(location.hash.replace("#", "")) != "undefined") {
    initStyle(location.hash.replace("#", ""))
    createButtons(stringDictionary);
} else {
    changeStyle(stringDictionary.strings[0].id)
};

