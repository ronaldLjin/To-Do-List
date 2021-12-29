const content = document.getElementById('content');
const toDoListArea = document.createElement('div');
toDoListArea.classList.add('to-do-list-area');

let today = new Date()
let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

let toDoList1 = { title: 'To-do list 1', list: [] };
let dueTodayList = { title: 'Due Today', list: [], type: 'today' }

const listFactory = (title) => {
    let list = []
    return { title, list };
}

let toDoLists = [dueTodayList, toDoList1];


function sideBar() {
    const sideBar = document.createElement('div');
    const hamburger = document.createElement('i');
    hamburger.classList.add('fas', 'fa-bars');
    hamburger.id = 'hamburger'
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
    today.id = 'today'
    today.addEventListener('click', displayToday)
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
    newListBtn.classList.add('new-list-button')

    newListBtn.addEventListener('click', () => {
        const newListTitle = prompt('Enter a name')
        if (newListTitle === null) {
            return
        } else if (newListTitle === '') {
            alert('Please include a title.')
        } else {
            const newList = listFactory(newListTitle)
            toDoLists.push(newList)
            load()
            displayListList(newList)
        }
    })

    function displayListList(whatList) {
        const blank = document.createElement('th')
        const newListRow = document.createElement('tr')
        blank.classList.add('fas', 'fa-times', 'delete-list')
        blank.addEventListener('click', () => {
            if (toDoLists.length === 2) {
                alert('You cannot delete every list!')
            } else {
                toDoLists = toDoLists.filter(function (u) {
                    return u !== whatList;
                })
                sideBarTable.removeChild(newListRow)
                load()
            }
        })
        const newListCell = document.createElement('th')
        newListCell.textContent = whatList.title
        newListCell.classList.add('list')
        newListCell.addEventListener('click', () => {
            displayList(whatList)
        })
        newListCell.style.fontWeight = '400'
        newListRow.appendChild(blank)
        newListRow.appendChild(newListCell)
        sideBarTable.insertBefore(newListRow, sideBarTable.children[sideBarTable.children.length - 1])
    }

    function displayToday() {
        for (let i = 1; i < toDoLists.length; i++) {
            for (let e = 0; e < toDoLists[i].list.length; e++)
                if (toDoLists[i].list[e].duedate === date) {
                    if (dueTodayList.list.indexOf(toDoLists[i].list[e]) !== -1) {
                        continue;
                    } else {
                        dueTodayList.list.push(toDoLists[i].list[e])
                    }
                } else {
                    continue;
                }
        }
        displayList(dueTodayList)
    }

    newListRow.appendChild(emptyCell)
    newListRow.appendChild(newListBtn)
    sideBarTable.appendChild(tableRowTwo)
    sideBarTable.appendChild(newListRow)
    sideBarText.appendChild(sideBarTitle)
    sideBarText.appendChild(sideBarTable)

    for (let i = 1; i < toDoLists.length; i++) {
        displayListList(toDoLists[i])
    }
    function openMenu() {
        mask.style.zIndex = '998'
        content.appendChild(mask)
        mask.addEventListener('click', closeMenu)
        sideBar.animate([
            { left: '-250px', textAlign: 'center' },
            { left: '0px', textAlign: 'right' },
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
            { left: '0px', textAlign: 'right' },
            { left: '-250px', textAlign: 'right' },
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
    content.innerHTML = ''
    content.appendChild(sideBar())
    toDoListArea.textContent = '';

    function displayItem(item) {
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
            for (let i = 1; i < toDoLists.length; i++) {
                for (let e = 0; e < toDoLists[i].list.length; e++)
                    if (toDoLists[i].list[e] === item) {
                        toDoLists[i].list = toDoLists[i].list.filter(function (todo) {
                            return todo !== item;
                        })
                    } else {
                        continue;
                    }
            }
            toDoListArea.removeChild(listItem)
            load()
        })
        const itemTitle = document.createElement('div')
        itemTitle.id = 'item-title';
        itemTitle.textContent = item.title;
        const dueDate = document.createElement('div')
        dueDate.textContent = item.duedate;
        const edit = document.createElement('i')
        edit.classList.add('fas', 'fa-edit', 'edit')
        edit.addEventListener('click', () => {
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
            formTitle.textContent = 'Edit Item';
            const titleField = document.createElement('input')
            const titleFieldLabel = document.createElement('label');
            titleFieldLabel.htmlFor = 'titlefield';
            titleFieldLabel.textContent = 'Title: '
            titleField.value = item.title
            titleField.type = 'text';
            titleField.id = 'titlefield';
            titleField.name = 'titlefield';

            const lineBreak = document.createElement('br');

            const dueDate2 = document.createElement('input')
            const dueDateLabel = document.createElement('label');
            dueDateLabel.htmlFor = 'duedate';
            dueDateLabel.textContent = 'Due date: '
            dueDate2.type = 'date';
            dueDate2.id = 'duedate';
            dueDate2.value = item.duedate;
            dueDate2.name = 'duedate';

            const description = document.createElement('textarea')
            const descriptionLabel = document.createElement('label');
            descriptionLabel.htmlFor = 'description';
            descriptionLabel.textContent = 'Description: '
            description.id = 'description';
            description.name = 'description';
            description.rows = '8'
            description.value = item.desc
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
            prioritySelector.value = item.priority

            const submitButton = document.createElement('input');
            submitButton.id = 'submit-button'
            submitButton.type = 'submit';
            submitButton.value = 'Submit';

            newItemForm.onsubmit = function () {
                if (titleField.value === '') {
                    alert('You must at least include a title')
                    return false;
                } else {
                    item.title = titleField.value
                    item.duedate = dueDate2.value
                    item.desc = description.value
                    item.priority = prioritySelector.value
                    itemTitle.textContent = titleField.value
                    dueDate.textContent = dueDate2.value
                    if (item.priority == 'high') {
                        listItem.style.backgroundColor = '#DD5353'
                    } else if (item.priority == 'medium') {
                        listItem.style.backgroundColor = '#DD9553'
                    } else if (item.priority == 'low') {
                        listItem.style.backgroundColor = '#7BA36C'
                    }
                    content.removeChild(newItemFormContainer)
                    content.removeChild(mask)
                    load()
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
            newItemForm.appendChild(dueDate2)
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
        const info = document.createElement('i')
        info.classList.add('fa', 'fa-info-circle', 'info')
        info.addEventListener('click', () => {
            const mask = document.createElement('div')
            mask.id = 'mask'
            const infoBox = document.createElement('div')
            infoBox.id = 'info-box'
            if (item.desc === '') {
                infoBox.textContent = 'No description provided'
            } else {
                infoBox.textContent = item.desc
            }
            const closeBoxBtn = document.createElement('i')
            closeBoxBtn.classList.add('fas', 'fa-times')
            closeBoxBtn.id = 'close-form-button'
            closeBoxBtn.addEventListener('click', () => {
                content.removeChild(infoBox)
                content.removeChild(mask)
            })
            infoBox.appendChild(closeBoxBtn)
            content.appendChild(mask)
            content.appendChild(infoBox)
        })

        miniContainer1.appendChild(checkbox)
        miniContainer1.appendChild(itemTitle)
        miniContainer2.appendChild(dueDate)
        if (whatList !== dueTodayList) {
            miniContainer2.appendChild(edit)
        }
        miniContainer2.appendChild(info)
        listItem.appendChild(miniContainer1);
        listItem.appendChild(miniContainer2);
        return listItem
    }

    for (let i = 0; i < whatList.list.length; i++) {
        toDoListArea.appendChild(displayItem(whatList.list[i]))
    }

    function title() {
        const titleArea = document.createElement('div');
        titleArea.classList.add('list-title-area');
        titleArea.textContent = whatList.title;
        content.appendChild(titleArea)
        toDoListArea.style.top = titleArea.clientHeight + 'px'
    }

    function newItem(title, duedate, priority, desc) {
        const thisItem = listItemFactory(title, duedate, priority, desc);
        whatList.list.push(thisItem);
        load()
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
        if (whatList === dueTodayList) { return } else { content.appendChild(newItemBtn) }
    }
    title()
    content.appendChild(toDoListArea)
    newItemBtn()
}


function load(e) {
    localStorage.setItem('toDoLists', JSON.stringify(toDoLists))
}

window.onload = function () {
    if (localStorage.getItem('toDoLists') !== null) {
        toDoLists = JSON.parse(localStorage.getItem('toDoLists'))
        displayList(toDoLists[1])
    }
}
displayList(toDoLists[1])

function loadUi() {
    content.appendChild(sideBar())
}

export default loadUi;