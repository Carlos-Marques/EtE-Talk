window.addEventListener("load", buttonAppend, false);

function buttonAppend(evt) {
    let buttonlist = document.getElementsByClassName("_39bj")[0];
    let li_button = document.createElement("li");
    let a_button = document.createElement("a");
    let i_button = document.createElement("i");
    let i_class = document.createAttribute("class");
    
    i_class.value = "encrypt_button";
    i_button.setAttributeNode(i_class);
    a_button.appendChild(i_button);
    li_button.appendChild(a_button);
    buttonlist.insertBefore(li_button, buttonlist.childNodes[0]);
}