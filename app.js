let order = 1;

function addNewItem (parent,order,content,add) {
    let innerHtmlItem = "<p>1. Task1</p>\n<img src=\"./images/cancel.svg\" alt=\"cancel\" class=\"cancel\">";
    let item = document.createElement("div");
    item.classList.add("list-added");
    item.classList.add("list-item");
    item.innerHTML = innerHtmlItem;
    let contentElement = item.children[0];
    contentElement.textContent = String(order) + ". " + content;
    item.children[1].addEventListener("mouseover", event => {
            event.target.src = "./images/cancel_hover.svg"
    })
    item.children[1].addEventListener("mouseleave", event => {
        event.target.src = "./images/cancel.svg"
    })
    item.children[1].addEventListener("click", event => {
        event.target.parentElement.remove();
    })
    if (add) {
        parent.insertBefore(item,parent.children[parent.children.length - 1]);
    }
    return item;
}

let listFooter = document.querySelector(".list-footer");

console.log(listFooter);


let container = document.querySelector(".container").children[3];
addNewItem(container,order++,"Task3",true);
addNewItem(container,order++,"Task3",true);
