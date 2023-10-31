let order = 1;

function addNewItem (parent,order,content,add) {
    let innerHtmlItem = "<p></p>\n<img src=\"./images/cancel.svg\" alt=\"cancel\" class=\"cancel\">";
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
        if (getList().length == 0 && document.querySelector(".list-footer").classList.contains("display-none")) {
            document.querySelector(".list-footer").classList.remove("display-none"); //bu setri sorus
        }
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

function getList() {
    let rtr = [];

    document.querySelectorAll(".list-added").forEach(item => {
        rtr.push(item.children[0].textContent);
    })
    return rtr;
}

function getListWithoutNumber() {
    return getList().map(item => {
        return item.substring(item.indexOf(".") + 2,item.length);
    })
}

function getSortedList() {
    let rtr = []; 
    let sortedWithoutNumber = getListWithoutNumber().sort();
    let unsorted = getList();
    sortedWithoutNumber.forEach(item => {
        unsorted.forEach((item1,index) => {
            if (item1.substring(item1.indexOf(".") + 2,item1.length) == item) {
                rtr.push(item1);
                unsorted.splice(index,1);
            }
        })
    })

    return rtr;
}

function getSortedReversedList() {
    return getSortedList().reverse();
}

document.querySelector(".sort img").addEventListener("mouseover", event => {
    if (event.target.classList.contains("reverse")) {
        event.target.src = "./images/sort_reverse_hover.svg";
    }
    else {
        event.target.src = "./images/sort_hover.svg";
    }
})

document.querySelector(".sort img").addEventListener("mouseleave", event => {
    if (event.target.classList.contains("reverse")) {
        event.target.src = "./images/sort_reverse.svg";
    }
    else {
        event.target.src = "./images/sort.svg";
    }
})

document.querySelector(".sort img").addEventListener("click", event => {
    let arrray;
    if (event.target.classList.contains("reverse")) {
        event.target.src = "./images/sort_hover.svg";
        arrray  = getSortedReversedList();
        event.target.classList.remove("reverse");
    }
    else {
        event.target.src = "./images/sort_reverse_hover.svg";
        arrray = getSortedList();
        event.target.classList.add("reverse");
    }
    document.querySelectorAll(".list-added").forEach(item => {
        item.remove();
    })
    arrray.forEach(item => {
        addNewItem(document.querySelector(".container").children[3],item.substring(0,item.indexOf(".")),item.substring(item.indexOf(".") + 1,item.length),true);
    })
})