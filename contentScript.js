window.addEventListener("load", listen, false);

function changePassword(passkeys, id, password) {
    passkeys[id].password = password;
    chrome.storage.sync.set({ passkeys: passkeys });
    console.log("Changed " + passkeys[id].name + " " + passkeys[id].password);
}

function checkName(conversation, passkeys) {
    let id = passkeys.findIndex(function (element) {
        if (element.name == conversation.name) {
            return element;
        }
    });
    id == -1 ? savePassword(conversation, passkeys) : changePassword(passkeys, id, conversation.password);
}

function savePassword(conversation, passkeys) {
    passkeys.push(conversation);
    chrome.storage.sync.set({ passkeys: passkeys });
    console.log("Saved " + conversation.name + " " + conversation.password);
}

function initPasskeys(conversation) {
    chrome.storage.sync.set({ passkeys: [conversation] });
    console.log("Inited " + conversation.name + " " + conversation.password);
}

function passwordPopup() {
    let password = prompt("Please enter your password");
    let name = window.location.href;
    let conversation = { name: name, password: password };

    chrome.storage.sync.get(['passkeys'], function (result) {
        result.passkeys == undefined ? initPasskeys(conversation) : checkName(conversation, result.passkeys)
    });
}

function buttonAppend(evt) {
    console.log("Button Append");
    let buttonlist = document.getElementsByClassName("_39bj")[0];
    let li_button = document.createElement("li");
    let a_button = document.createElement("a");
    let i_button = document.createElement("i");
    let i_class = document.createAttribute("class");

    i_class.value = "encrypt_button";
    i_button.setAttributeNode(i_class);
    a_button.appendChild(i_button);
    a_button.addEventListener("click", passwordPopup);
    li_button.appendChild(a_button);
    buttonlist.insertBefore(li_button, buttonlist.childNodes[0]);
}

function listen() {
    let targetNode = document.getElementById('js_6');
    let config = { attributes: true, childList: true, subtree: true };
    let href_number = 0;

    let callback = function (mutationsList, observer) {
        for (var mutation of mutationsList) {
            if (mutation.attributeName == "href") {
                href_number++;
                if (href_number == 2) {
                    buttonAppend();
                    href_number = 0;
                }
            }
        }
    };

    let observer = new MutationObserver(callback);

    buttonAppend();
    observer.observe(targetNode, config);
}