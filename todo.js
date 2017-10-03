//object oriented implementation

//todo list is implemented here
class Todo {

    constructor (task) {
        this.task=task;
        this.id=0;
        this.done=false;
    }
    set setGameId (id) {
        this.id=id;
    }
}

//the list where every task gets appended
let todoLIST=document.getElementById('list');
todoLIST.style.listStyleType='none';

//array of objects of class TODO
let todoArray=[];

//deletes striked off items together
let delBtn=document.getElementById('del-btn');
delBtn.onclick=delTogether;//5

//button through which elements are added
let addBtn=document.getElementById('add-btn');
addBtn.onclick=function () {
    let p=new Todo(input.value);
    todoArray.push(p);
    showTodo();
};

//input which comes through the task bar input
let input=document.getElementById('add-new-todo');
input.setAttribute('placeholder','Enter your next task here');

//button to select all and strike all elements
let allBtn=document.getElementById('all-select');
allBtn.onchange=strikeAll;//6

//display function
function showTodo () {
    todoLIST.innerText="";
    for (let i in todoArray) {
        todoArray[i].setGameId=i;
        addToList(todoArray[i].task,todoArray[i].done,i);
    }
}

//main function which does the display work
function addToList (task,done,id) {
    //the row which is to be appended to the list of elements

    let taskRow=document.createElement('li');
    taskRow.setAttribute('class','row');
    taskRow.style.color='#000000';
    taskRow.style.width='80%';
    taskRow.style.position='relative';
    taskRow.style.left='12%';
    taskRow.style.top='5vh';
    taskRow.style.height='50px';
    taskRow.setAttribute('data-id',id);
    taskRow.style.lineHeight='50px';

    if(parseInt(id)===0) {
        taskRow.className='row rounded-top';
    }

    if(parseInt(id)===todoArray.length-1) {
        taskRow.className='row rounded-bottom';
    }

    let span=document.createElement('span');
    span.append(task);
    span.setAttribute('class','col-8');

    let checkBox=document.createElement('input');
    checkBox.setAttribute('class','align-self-center col-1');
    checkBox.setAttribute('type','checkbox');
    checkBox.onchange=strikeTask;//4

    let deleteBtn=document.createElement('i');
    deleteBtn.setAttribute('class','align-self-center col-1 fa fa-times');
    deleteBtn.onclick=deleteTask;//1

    let moveUpBtn=document.createElement('i');
    moveUpBtn.setAttribute('class','align-self-center col-1 fa fa-arrow-up');
    moveUpBtn.onclick=moveUp;//2

    let moveDownBtn=document.createElement('i');
    moveDownBtn.setAttribute('class','align-self-center col-1 fa fa-arrow-down');
    moveDownBtn.onclick=moveDown;//3

    if(parseInt(id%2)===1) {
        taskRow.style.backgroundColor='#a9a9a9';
    }
    else {
        taskRow.style.backgroundColor='#d3d3d3';
    }

    taskRow.appendChild(checkBox);
    taskRow.appendChild(span);
    taskRow.appendChild(moveUpBtn);
    taskRow.appendChild(moveDownBtn);
    taskRow.appendChild(deleteBtn);
    todoLIST.appendChild(taskRow);

    if(done) {
        checkBox.checked=true;
        taskRow.style.opacity='0.5';
    }

}

//1
function deleteTask (event) {
    let index=parseInt(event.target.parentElement.getAttribute('data-id'));
    todoArray.splice(index,1);
    showTodo();
}

//2
function moveUp(event) {
    let index=parseInt(event.target.parentElement.getAttribute('data-id'));
    let temp=todoArray[index];
    todoArray[index]=todoArray[index-1];
    todoArray[index-1]=temp;
    showTodo();


}

//3
function moveDown(event) {
    let index=parseInt(event.target.parentElement.getAttribute('data-id'));
    let temp=todoArray[index];
    todoArray[index]=todoArray[index+1];
    todoArray[index+1]=temp;
    showTodo();
}

//4
function strikeTask(event) {
    let index=parseInt(event.target.parentElement.getAttribute('data-id'));
    if(todoArray[index].done)
        todoArray[index].done=false;
    else
        todoArray[index].done=true;
    showTodo();
}

//5
function delTogether() {
    let temp=[];
    for (let i in todoArray) {
        if(!todoArray[i].done) {
            temp.push(todoArray[i]);
        }
    }
    todoArray=temp;
    allBtn.checked=false;
    showTodo();
}

//6
function strikeAll() {
    if(allBtn.checked) {
        for (let i in todoArray) {
            todoArray[i].done=true;
        }
    }
    else
    {
        for (let i in todoArray) {
            todoArray[i].done = false;
        }
    }
    showTodo();
}