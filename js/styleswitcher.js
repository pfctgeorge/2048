var dict;
if (typeof math4ever2048_stringDictionary != "undefined") {
    dict = math4ever2048_stringDictionary
}

StyleModule = (function(dictionary){
    var defaultDictionary = {
        "strings": [
        {
            "id": "default",
            "2048": "2048",
            "Title": "",
            "Subtitle": "",
            "Join the numbers and get to the 2048 tile!": "Join the numbers and get the 2048 tile!",
            "When two tiles with the same number touch": "When two tiles with the same number touch, they merge into one!",
            "you join tiles to score high!": "you join tiles to score high!",
            "You win!": "You win!",
            "Game over!": "Game over!",
            "http://marumichannel.github.io/2048/": "http://marumichannel.github.io/2048/"
        }
    ]};
    var currentStrings = defaultDictionary.strings[0];
    var currentStyle = "default"

    function init() {
        if (top.location!= self.location) { 
            top.location = self.location.href
        } //break out of iframes
        if (typeof dictionary == "undefined") {
            dictionary = defaultDictionary;
        }
        if (typeof getStrings(location.hash.replace("#", ""), dictionary) != "undefined") {
            style = location.hash.replace("#", "");
            currentStrings = getStrings(style);
            updateHtml();
            if (typeof ga !== "undefined") {
              ga("send", "pageview", "/2048/#" + style);
            }
        } else {
            changeStyle(dictionary.strings[0].id)
        };
    }

    function getString(key) {
        return currentStrings[key]
    }

    function changeStyle(style) {
        location.hash = style;
        location.reload();
    }

    function getStrings(style) {
        for (var index = 0; index < dictionary.strings.length; index++) {
            if (style == dictionary.strings[index].id) {
                return dictionary.strings[index]
            }
        }
        return undefined
    }

    function updateHtml() {
        document.title = getString("2048");
        document.querySelector(".title").textContent = getString("2048");
        document.querySelector(".game-intro").textContent = getString("Join the numbers and get to the 2048 tile!");
        document.querySelector(".game-explanation").innerHTML = '<strong class="important">How to play:</strong> Use your <strong>arrow keys</strong> to move the tiles. ' + getString("When two tiles with the same number touch") + ', they <strong>merge into one!</strong>';
        tweet = tweetButton()
        document.querySelector(".sharing").replaceChild(tweet, document.querySelector(".sharing").firstElementChild)
        createButtons();
        document.querySelector("#theme").href = 'style/' + getString("id") + '.css';
    }

    function tweetButton() {
        var tweet = document.createElement("a");
        tweet.classList.add("twitter-share-button");
        tweet.setAttribute("href", "https://twitter.com/share");
        tweet.setAttribute("data-via", "marumichannel");
        tweet.setAttribute("data-url", getString("http://marumichannel.github.io/2048/"));
        tweet.setAttribute("data-counturl", getString("http://marumichannel.github.io/2048/"));
        tweet.textContent = "Tweet";

        var text = "Check out " + getString("2048") + ", a game where " +
            getString("you join tiles to score high!") + " #井口2048";
        tweet.setAttribute("data-text", text);

        return tweet;
    }

    function buildButton(buttonStrings) {
      var button = document.createElement("a")
      button.innerHTML = "<strong>" + buttonStrings["Title"] + "</strong><br>" +
        buttonStrings["Subtitle"]
      button.setAttribute("onclick","StyleModule.changeStyle('" + buttonStrings["id"] + "')")
      button.setAttribute("type","button")
      button.setAttribute("class","style-button")
      return button
    }

    function createButtons() {
        var switcherContainer = document.querySelector(".style-switcher")
        if (dictionary.strings.length > 1) {
            switcherContainer.setAttribute("style","display:block;");
            for (var index = 0; index < dictionary.strings.length; index++) {
              var strings = dictionary.strings[index]
              var button = buildButton(strings)
              switcherContainer.firstElementChild.appendChild(button)
            }
        }
    }

    return {
        init: init,
        getString: getString,
        changeStyle: changeStyle
    };

})(dict);

StyleModule.init()

