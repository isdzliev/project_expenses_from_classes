function createExpensesElements(expenses) {
    expensesElement.innerHTML = ''; // удаляем все старые задачи
    for (const item of tasks) {
        createExpenseElement(item);
    }
}

function getExpensesFromServer() {
    const xhr = new XMLHttpRequest(); // ClassName()
    xhr.open('GET', `${serverUrl}/expenses`); // настройка запроса

    xhr.addEventListener('load', function (event) {
        const response = event.target.response; // ответ приходит в виде строки
        const data = JSON.parse(response); // превращаем в JavaScript объект

        createExpensesElements(data);
    });

    xhr.send(); // отправка
}

function addExpenseToServer(name) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${serverUrl}/expenses`);
    xhr.setRequestHeader('Content-Type', 'backend(hw_expenses_lec16)/json');

    xhr.addEventListener('load', function (event) {
        getExpensesFromServer();
    });

    xhr.send(JSON.stringify({name: name})); // отправка