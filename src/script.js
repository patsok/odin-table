import './style.scss';

let data = Array.from(document.querySelectorAll('td'));
let footerTds;
let buttonMin = document.querySelector('#min');
let buttonMax = document.querySelector('#max');
let buttonsRow = document.querySelectorAll('.newRow')

function addEmptyFooter(str) {
    let table = document.querySelector('table');
    let checkFoot = document.querySelector('tfoot');
    if (checkFoot != null) {
        table.removeChild(checkFoot);
    }
    let tfoot = document.createElement('tfoot');
    let tr = document.createElement('tr');
    for (let i = 0; i < 10; i++) {
        if (i == 0) {
            let th = document.createElement("th");
            th.textContent = str;
            th.setAttribute('colspan', '3');
            tr.appendChild(th);
        } else {
            let td = document.createElement("td");
            tr.appendChild(td);
        }
    }
    tfoot.appendChild(tr);
    table.appendChild(tfoot);
}


function addRow(str) {
    addEmptyFooter(str);
    footerTds = document.querySelectorAll('tfoot>tr>td');
    addDataValues(str);
}

function countMean(num) {
    return Math.floor(num / 9 * 100) / 100;
}

function countSum(num) {
    let sum = 0;
    for (let i = 0; i < data.length; i++) {
        if (i % 9 == num) {
            sum += Number(data[i].textContent);
        }
    }
    return Math.floor(sum * 100) / 100;
}

function countMedian(num) {
    let arr = [];
    for (let i = 0; i < data.length; i++) {
        if (i % 9 == num) {
            arr.push(Number(data[i].textContent))
        }
        arr.sort((a, b) => a - b);

    }
    for (let i = 0; i < data.length; i++) {
        if (i % 9 == num) {
            if (Number(data[i].textContent) == arr[4]) {
                data[i].classList.add('highlight');
            }
        }
    }

    return arr[4];
}

function addDataValues(str) {
    for (let i = 0; i < 8; i++) {
        let value;
        if (str == "Mean") {
            value = countMean(countSum(i));
        } else if (str == "Sum") {
            value = countSum(i);
        } else {
            value = countMedian(i);
        }
        footerTds[i].textContent = value;
    }
}

window.addEventListener('load', () => {
    for (let i = 0; i < data.length; i++) {
        if (data[i].textContent.includes(',')) {
            if (i % 9 != 8) {
                let [first, second] = data[i].textContent.split(',');
                data[i].textContent = (first + second) / 1000;
            }
        }
    }
})

buttonMax.addEventListener('click', highlightMax);
buttonMin.addEventListener('click', highlightMin);
buttonsRow.forEach(button => {
    button.addEventListener('click', () => {
        removeHighlights();
        addRow(button.textContent)
    });
})

function highlightMax() {
    removeHighlights();
    for (let j = 0; j < 8; j++) {
        let max = -1000;
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if (i % 9 == j) {
                if (Number(data[i].textContent) >= max) {
                    max = Number(data[i].textContent);
                    index = i;

                } else {
                    max;
                }
            }
        }
        data[index].classList.add('highlight');
    }
}

function highlightMin() {
    removeHighlights();
    for (let j = 0; j < 8; j++) {
        let min = 10000;
        let index = 0;
        for (let i = 0; i < data.length; i++) {
            if (i % 9 == j) {
                if (Number(data[i].textContent) <= min) {
                    min = Number(data[i].textContent);
                    index = i;
                } else {
                    min;
                }
            }

        }
        data[index].classList.add('highlight');
    }
}

function removeHighlights() {
    for (let i = 0; i < data.length; i++) {
        data[i].classList.remove('highlight');
    }
}