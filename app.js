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
        event.target.value = "";
    }
    return item;
}

function getInputContent() {
    return document.querySelector(".list-footer input").value;
}

document.querySelector(".list-footer input").addEventListener("keyup", event => {
    if (getInputContent().split(" ").length - 1 != getInputContent().length && event.key == "Enter") {
        addNewItem(document.querySelector(".container").children[3],order++,event.target.value,true);
        event.target.parentElement.classList.add("display-none");
    }
})

document.querySelector(".list-footer img").addEventListener("mouseover", event => {
    event.target.src = "./images/cancel_hover.svg"
})

document.querySelector(".list-footer img").addEventListener("mouseleave", event => {
    event.target.src = "./images/cancel.svg"
})

document.querySelector(".list-footer img").addEventListener("click", event => {
    event.target.parentElement.children[0].value = "";
})

document.querySelector(".add-button").addEventListener("click", event => {
    let listFooter = document.querySelector(".list-footer");
    let input = listFooter.children[0];
    let isDisplayNone = listFooter.classList.contains("display-none");
    if (isDisplayNone) {
        listFooter.classList.remove("display-none")
    }
    else if (input.value.split(" ").length - 1 != input.value.length) {
        addNewItem(document.querySelector(".container").children[3],order++,input.value,true);
        input.parentElement.classList.add("display-none");
        input.value = "";
    }
})