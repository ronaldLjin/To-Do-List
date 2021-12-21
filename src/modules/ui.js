const content = document.getElementById('content');
const toDoListArea = document.createElement('div');
toDoListArea.classList.add('to-do-list-area');

let toDoList1 = {title: 'To-do list 1', list: []};

const listFactory = (title) => {
    let list = []
    return {title, list};
}

let toDoLists = [toDoList1];


function sideBar() {
    const sideBar = document.createElement('div');
    const hamburger = document.createElement('i');
    hamburger.classList.add('fas', 'fa-bars');
    hamburger.style.color = "white";
    hamburger.style.margin = "18px";
    hamburger.addEventListener('click', openMenu)
    const mask = document.createElement('div');
    mask.id = 'mask';
    const sideBarText = document.createElement('div')
    sideBarText.classList.add('side-bar-text')
    const sideBarTitle = document.createElement('h1')
    sideBarTitle.textContent = 'Menu'
    const sideBarTable = document.createElement('table')
    const tableRowOne = document.createElement('tr')
    const todayIcon = document.createElement('th')
    todayIcon.classList.add('fas', 'fa-calendar-day', 'table-icon')
    const today = document.createElement('th')
    today.textContent = 'Today'
    tableRowOne.appendChild(todayIcon)
    tableRowOne.appendChild(today)
    sideBarTable.appendChild(tableRowOne)
    const listIcon = document.createElement('th')
    listIcon.classList.add('fas', 'fa-list-alt', 'table-icon')
    const lists = document.createElement('th')
    lists.textContent = 'Lists'
    const tableRowTwo = document.createElement('tr')
    tableRowTwo.appendChild(listIcon)
    tableRowTwo.appendChild(lists)
    const newListRow = document.createElement('tr')
    const emptyCell = document.createElement('th')
    const newListBtn = document.createElement('th')
    newListBtn.textContent = '+ New List'
    newListBtn.style.fontSize = '10pt'
    newListBtn.style.fontWeight = '400'

    newListBtn.addEventListener('click', () => {
        const newListTitle = prompt('Enter a name')
        const newList = listFactory(newListTitle)
        toDoLists.push(newList)
        displayListList(newList)
    })

    function displayListList(whatList) {
    const blank = document.createElement('th')
        const newListCell = document.createElement('th')
        newListCell.textContent = whatList.title
        newListCell.addEventListener('click', () => {
            displayList(whatList)
        })
        newListCell.style.fontWeight = '400'
        const newListRow = document.createElement('tr')
        newListRow.appendChild(blank)
        newListRow.appendChild(newListCell)
        sideBarTable.insertBefore(newListRow, sideBarTable.children[sideBarTable.children.length - 1])
    }


    newListRow.appendChild(emptyCell)
    newListRow.appendChild(newListBtn)
    sideBarTable.appendChild(tableRowTwo)
    sideBarTable.appendChild(newListRow)
    sideBarText.appendChild(sideBarTitle)
    sideBarText.appendChild(sideBarTable)

    for (let i=0; i<toDoLists.length; i++) {
        displayListList(toDoLists[i])
    }
    function openMenu() {
        content.appendChild(mask)
        mask.addEventListener('click', closeMenu)
        sideBar.animate([
            {left: '-250px', textAlign: 'center'},
            {left: '0px', textAlign: 'right'},
        ], {
            duration: 100,
            iterations: 1,
            fill: 'forwards'
        })
        sideBar.appendChild(sideBarText)
        hamburger.removeEventListener('click', openMenu);
        hamburger.addEventListener('click', closeMenu)
    }
    function closeMenu() {
        content.removeChild(mask)
        sideBar.animate([
            {left: '0px', textAlign: 'right'},
            {left: '-250px', textAlign: 'right'},
        ], {
            duration: 100,
            iterations: 1,
            fill: 'forwards'
        })
        sideBar.removeChild(sideBarText)
        hamburger.removeEventListener('click', closeMenu);
        hamburger.addEventListener('click', openMenu)
    }
    sideBar.classList.add('sidebar');
    sideBar.appendChild(hamburger);
    return sideBar;
}

const listItemFactory = (title, duedate, priority, desc) => {
    return { title, duedate, priority, desc };
}

function displayList(whatList) {
    toDoListArea.textContent = '';

    function  displayItem (item) {
        const listItem = document.createElement('div');
        listItem.classList.add('list-item');
        if (item.priority == 'high') {
            listItem.style.backgroundColor = '#DD5353'
        } else if (item.priority == 'medium') {
            listItem.style.backgroundColor = '#DD9553'
        }
        const miniContainer1 = document.createElement('div');
        miniContainer1.classList.add('mini-container');
        const miniContainer2 = document.createElement('div');
        miniContainer2.classList.add('mini-container');
        const checkbox = document.createElement('div');
        checkbox.id = 'checkbox';
        checkbox.addEventListener('click', () => {
            whatList.list = whatList.list.filter(function (todo) {
                return todo !== item;
            })
            toDoListArea.removeChild(listItem)
        })
        const itemTitle = document.createElement('div')
        itemTitle.id = 'item-title';
        itemTitle.textContent = item.title;
        const dueDate = document.createElement('div')
        dueDate.id = 'duedate'
        dueDate.textContent = item.duedate;
        const edit = document.createElement('i')
        edit.classList.add('fas', 'fa-edit', 'edit')
        const info = document.createElement('i')
        info.classList.add('fa', 'fa-info-circle')
    
        miniContainer1.appendChild(checkbox)
        miniContainer1.appendChild(itemTitle)
        miniContainer2.appendChild(dueDate)
        miniContainer2.appendChild(edit)
        miniContainer2.appendChild(info)
        listItem.appendChild(miniContainer1);
        listItem.appendChild(miniContainer2);
        return listItem
    }

    for (let i=0; i<whatList.list.length; i++) {
        toDoListArea.appendChild(displayItem(whatList.list[i]))
    }

    function title() {
        const titleArea = document.createElement('div');
        titleArea.classList.add('list-title-area');
        titleArea.textContent = whatList.title;
        content.appendChild(titleArea)
    }

    function newItem(title, duedate, priority, desc) {
        const thisItem = listItemFactory(title, duedate, priority, desc);
        whatList.list.push(thisItem);
        return displayItem(thisItem)
    }
    
    
    function newItemBtn() {
        const newItemBtn = document.createElement('button')
        newItemBtn.id = 'new-item-btn'
        newItemBtn.textContent = 'New Item';

        newItemBtn.addEventListener('click', () => {
            const mask = document.createElement('div');
            mask.id = 'mask';
            mask.addEventListener('click', closeForm)
            const newItemFormContainer = document.createElement('div')
            newItemFormContainer.id = 'new-item-form-container'
            const newItemForm = document.createElement('form');
            newItemForm.id = 'new-item-form';
            const closeFormBtn = document.createElement('i')
            closeFormBtn.classList.add('fas', 'fa-times')
            closeFormBtn.id = 'close-form-button'
            closeFormBtn.addEventListener('click', closeForm)
            const formTitle = document.createElement('h1');
            formTitle.textContent = 'New Item';
            const titleField = document.createElement('input')
            const titleFieldLabel = document.createElement('label');
            titleFieldLabel.htmlFor = 'titlefield';
            titleFieldLabel.textContent = 'Title: '
            titleField.type = 'text';
            titleField.id = 'titlefield';
            titleField.name = 'titlefield';
    
            const lineBreak = document.createElement('br');
    
            const dueDate = document.createElement('input')
            const dueDateLabel = document.createElement('label');
            dueDateLabel.htmlFor = 'duedate';
            dueDateLabel.textContent = 'Due date: '
            dueDate.type = 'date';
            dueDate.id = 'duedate';
            dueDate.name = 'duedate';
    
            const description = document.createElement('textarea')
            const descriptionLabel = document.createElement('label');
            descriptionLabel.htmlFor = 'description';
            descriptionLabel.textContent = 'Description: '
            description.id = 'description';
            description.name = 'description';
            description.rows = '8'
            description.cols = '40'
    
            const prioritySelector = document.createElement('select');
            const prioritySelectorLabel = document.createElement('label')
            prioritySelectorLabel.htmlFor = 'prioritySelector'
            prioritySelectorLabel.textContent = 'Priority: '
            prioritySelector.id = 'priority-selector'
            prioritySelector.name = 'prioritySelector';
            const high = document.createElement('option')
            high.value = 'high'
            high.textContent = 'High'
            const medium = document.createElement('option')
            medium.value = 'medium'
            medium.textContent = 'Medium'
            const low = document.createElement('option')
            low.value = 'low'
            low.textContent = 'Low'
            prioritySelector.appendChild(high)
            prioritySelector.appendChild(medium)
            prioritySelector.appendChild(low)
    
            const submitButton = document.createElement('input');
            submitButton.id = 'submit-button'
            submitButton.type = 'submit';
            submitButton.value = 'Submit';
    
            newItemForm.onsubmit = function () {
                if (titleField.value === '') {
                    alert('You must at least include a title')
                    return false;
                } else {
                toDoListArea.appendChild(newItem(titleField.value, dueDate.value, prioritySelector.value, description.value))
                content.removeChild(newItemFormContainer)
                content.removeChild(mask)
                    return false;
                }
            }
            newItemForm.appendChild(closeFormBtn)
            newItemForm.appendChild(formTitle)
            newItemForm.appendChild(titleFieldLabel)
            newItemForm.appendChild(titleField)
            newItemForm.appendChild(lineBreak)
            newItemForm.appendChild(dueDateLabel)
            const lineBreak2 = document.createElement('br')
            newItemForm.appendChild(dueDate)
            newItemForm.appendChild(lineBreak2)
            newItemForm.appendChild(descriptionLabel)
            const lineBreak3 = document.createElement('br')
            newItemForm.appendChild(lineBreak3)
            newItemForm.appendChild(description)
            const lineBreak4 = document.createElement('br')
            newItemForm.appendChild(lineBreak4)
            newItemForm.appendChild(prioritySelectorLabel)
            newItemForm.appendChild(prioritySelector)
            const lineBreak5 = document.createElement('br')
            newItemForm.appendChild(lineBreak5)
            newItemForm.appendChild(submitButton)
            newItemFormContainer.appendChild(newItemForm)
            content.appendChild(newItemFormContainer)
            content.appendChild(mask);
            function closeForm() {
                content.removeChild(mask)
                content.removeChild(newItemFormContainer)
            }
        })
        content.appendChild(newItemBtn)
    }   
    title()
    content.appendChild(toDoListArea) 
    newItemBtn()
}

displayList(toDoList1)

function loadUi() {
    content.appendChild(sideBar())
}

export default loadUi;