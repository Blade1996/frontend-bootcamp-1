
const URL = 'https://jsonplaceholder.typicode.com/todos/';

if(localStorage.getItem('dataJson') == null){
    localStorage.setItem('dataJson', JSON.stringify([]));
}

let dataTeachers = JSON.parse(localStorage.getItem('dataJson'));

let tabla = document.getElementById('tableTeachers');
let tableBody = tabla.getElementsByTagName('tbody')[0];


const loadTable = (source) => {
    tableBody.innerHTML = "";
    source.forEach((element, index) => {
        let row = document.createElement('tr');
        let updBtn = document.createElement('button');
        let delBtn = document.createElement('button');
        delBtn.setAttribute('id', `increase`);
        updBtn.setAttribute('id', 'decrease');
        delBtn.setAttribute('record-id', index);
        updBtn.setAttribute('record-id', index);
        delBtn.innerHTML = "+"
        updBtn.innerHTML = "-"
        for (const property in element) {
            let cell = document.createElement('td');
            cell.innerHTML = element[property];
            row.appendChild(cell);
        }
        let cellActions = row.insertCell();
        cellActions.appendChild(updBtn);
        cellActions.appendChild(delBtn);
        tableBody.appendChild(row);
    })
}

function dataFromForm() {
    const name = document.getElementById('name');
    const age = document.getElementById('age');
    const job = document.getElementById('job');
    const salary = document.getElementById('salary');
    const job = document.getElementById('job');
    return {name: name.value, age: age.value, job: job.value, salary: salary.value};
}



const createTeacher = (data) => {
    let { data } =  sendRequest(data);
    console.log(data);
    localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
    form.reset();
}

const increase = (index, data) => {
    dataFromDB[index] = data;
    localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
    form.reset();
}

const decrease = (index, data) => {
    dataFromDB[index] = data;
    localStorage.setItem('dataJson', JSON.stringify(dataFromDB));
    form.reset();
}

document.querySelector('#createBtn').addEventListener('click', (e) => {
    e.preventDefault();
    create(dataFromForm());
    loadTable(dataFromDB);
});

document.querySelector('#updateBtn').addEventListener('click', (e) => {
    e.preventDefault();
    let record = document.querySelector('#updateBtn').getAttribute('record');
    update(record, dataFromForm());
    loadTable(dataFromDB);
})

tabla.addEventListener('click', function(e){
    let event = e.target;
    let record = event.getAttribute('record-id');
    let action = event.getAttribute('id')
    if(event.nodeName === 'BUTTON'){
        if(action === 'delete'){
            erase(record);
        }else if (action === 'update'){
            getData(record);
            document.querySelector('#updateBtn').setAttribute('record', record);
        }
    };
    loadTable(dataFromDB);
})


const sendRequest = (data) => {
    axios.post(URL, data)
    .then(response => response)
    .catch(error => console.error(error));
};


//sendTeacher();