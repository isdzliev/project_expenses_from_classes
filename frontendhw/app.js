const inputNameofExpense = document.getElementById('name');
const labelofExpense = document.getElementById('name-label');
const addElement = document.getElementById('add');
const inputAmount = document.getElementById('amount');
const labelofAmount = document.getElementById('amount-label');
const expenseElement = document.getElementById('expense');
const totalElement = document.getElementById('total');
let TotalAmount = 0;
const serverUrl = 'http://localhost:7786/v1'; // FIXME: меняйте, если у вас другой порт


// установить обработчик события click для кнопки
addElement.addEventListener('click', function (event) {
    event.preventDefault(); // отменяем поведение по умолчанию

    const valueExpense = inputNameofExpense.value.trim();
    if (valueExpense === '') { // проверка с учётом типа
        inputNameofExpense.classList.add('invalid');
        labelofExpense.textContent = 'Expense name required';
        return; // вернётся undefined
    }

    inputNameofExpense.classList.remove('invalid');
    labelofExpense.textContent = 'Expense name';
    inputNameofExpense.value = ''; // очищаем поле ввода

    const valueAmount = inputAmount.value;
    if (valueAmount === '') { // проверка с учётом типа
        inputAmount.classList.add('invalid');
        labelofAmount.textContent = 'Amount required';
        return; // вернётся undefined
    }

    inputAmount.classList.remove('invalid');
    labelofAmount.textContent = 'Amount';
    inputAmount.value = ''; // очищаем поле ввода

    createExpenseElement(valueExpense, valueAmount);
    //addExpenseToServer(value);
});


function createExpenseElement(valueExpense, valueAmount, id) {
    const liElement = document.createElement('li');
    liElement.classList.add('collection-item');
    // заставляем сам браузер из строки сделать html
    liElement.innerHTML = `
    ${valueExpense} ${valueAmount}
    <a href="#" class="remove-expense secondary-content">
      <i class="material-icons right red-text">delete</i>
    </a>
  `; // на клавише ё - аналог f'{value}...' в python

    const removeElement = liElement.querySelector('.remove-expense');
    // сразу настраиваем обработчик события клика на ссылке для удаления
    removeElement.addEventListener('click', function (event) {
        event.preventDefault();
        expenseElement.removeChild(liElement);
        deleteExpenseFromServer(id);
        if(expenseElement.childElementCount = 0) {
            totalElement.textContent = 0;
        }
        totalElement.textContent = TotalAmount -= valueAmount;
    });

    expenseElement.appendChild(liElement); // добавляем элемент в родителя
    //totalElement.textContent = expensesElement.children.length; // вообще, конечно, есть свойство childrenElementCount :)
    totalElement.textContent = TotalAmount += Number(valueAmount);
}

function getExpensesFromServer() {
    const xhr = new XMLHttpRequest(); // ClassName()
    xhr.open('GET', `${serverUrl}/expenses`); // настройка запроса

    xhr.addEventListener('load', function (event) {
        const response = event.target.response; // ответ приходит в виде строки
        const data = JSON.parse(response); // превращаем в JavaScript объект
        expenseElement.innerHTML = '';

        for (const item of data) {
            createExpenseElement(item.name, item.expense, item.id);
        }
    });

    xhr.send(); // отправка
}




function deleteExpenseFromServer(id) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', `${serverUrl}/expenses/${id}`);
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.addEventListener('load', function (event) {
        getExpensesFromServer();
    });

    xhr.send(); // отправка
}

getExpensesFromServer();