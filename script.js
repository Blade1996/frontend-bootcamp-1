
const URL = 'https://jsonplaceholder.typicode.com/todos/';

if(localStorage.getItem('dataJson') == null){
    localStorage.setItem('dataJson', JSON.stringify([]));
}

let dataTeachers = JSON.parse(localStorage.getItem('dataJson'));

let form = document.getElementById('myForm');

let tabla = document.getElementById('tableTeachers');
let tableBody = tabla.getElementsByTagName('tbody')[0];

let selectSpecialty = document.getElementById('specialty');


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
            cell.innerHTML = element[property].name || element[property]  || '';
            row.appendChild(cell);
        }
        let cellActions = row.insertCell();
        cellActions.appendChild(updBtn);
        cellActions.appendChild(delBtn);
        tableBody.appendChild(row);
    })
}

function dataFromForm() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const age = document.getElementById('age').value;
    const specialty = selectSpecialty.value;
    var specialtyName = selectSpecialty.options[selectSpecialty.selectedIndex].text;
    const exp = document.getElementById('exp').value;
    const linkedin = document.getElementById('linkedin').value || '';
    return { name, lastName, age, specialty: {
        name: specialtyName,
        value: Number(specialty),
    }, exp, linkedin};
}

loadTable(dataTeachers);



const createTeacher = (data) => {
   let response = sendRequest(data);
   dataTeachers.push(data);
   localStorage.setItem('dataJson', JSON.stringify(dataTeachers));
   return response
    form.reset();
}

const increase = (index) => {
    dataTeachers[index].specialty.value += (dataTeachers[index].specialty.value * 0.10);
    localStorage.setItem('dataJson', JSON.stringify(dataTeachers));
    form.reset();
}

const decrease = (index) => {
    dataTeachers[index].specialty.value -= (dataTeachers[index].specialty.value * 0.10);
    localStorage.setItem('dataJson', JSON.stringify(dataTeachers));
    form.reset();
}

document.querySelector('#createBtn').addEventListener('click', (e) => {
    e.preventDefault();
    createTeacher(dataFromForm());
    loadTable(dataTeachers);
});

tabla.addEventListener('click', function(e){
    let event = e.target;
    let record = event.getAttribute('record-id');
    let action = event.getAttribute('id')
    if(event.nodeName === 'BUTTON'){
        if(action === 'increase'){
            increase(record);
        }else if (action === 'decrease'){
            decrease(record);
        }
    };
    loadTable(dataTeachers);
})


const sendRequest = (data) => {
    axios.post(URL, data)
    .then(response =>
        { const addedUser = response.data;
        return addedUser;
    })
    .catch(error => console.error(error));
};


//sendTeacher();