console.log("hii");

var form = document.getElementById('my-form');
var remItem = document.getElementById('remItem');
var doneItem = document.getElementById('doneItem');

var todoInput = document.getElementById('todo');
var descInput = document.getElementById('desc');

form.addEventListener('submit',function(e){
    addItems(e);
    fetchData();
});
remItem.addEventListener('click',handleItemClick);
doneItem.addEventListener('click',handleItemClick);
window.addEventListener('load',function(){
    fetchData();
})

function handleItemClick(e){
    if(e.target.classList.contains('delete')){
        removeItem(e);
    }else if(e.target.classList.contains('done')){
        todoDoneItem(e);
        fetchData();
    }
}
var flag = false;


function fetchData(){
    axios
    .get("https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/aboutTodo")
    .then((response)=>{
        
        remItem.innerHTML = "";
        doneItem.innerHTML = "";

        response.data.forEach((item)=>{
            var li = document.createElement('li');
            li.className = "item"
            li.dataset.userId = item._id;

            var deletebtn = document.createElement('button');
            deletebtn.className = 'btn btn-danger btn-sm mx-2 delete';
            deletebtn.appendChild(document.createTextNode('X'));

            

            li.appendChild(document.createTextNode(item.todo));
            li.appendChild(document.createTextNode("-"+item.desc));
            li.appendChild(deletebtn);
            if(item.flag == false){
                let donebtn = document.createElement('button');
                donebtn.className = "btn btn-success btn-sm mx-2 done";
                donebtn.append(document.createTextNode('Done'));

                li.appendChild(donebtn);
                remItem.appendChild(li);
            }
            else{
                doneItem.appendChild(li);
            }
        });
    })
    .catch((error)=>{
        console.log(error);
    })
}
function addItems(e){
    e.preventDefault();

    var li = document.createElement('li');
    li.className = "item mx-3 my-3";

    var deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger btn-sm mx-2 delete';
    deletebtn.appendChild(document.createTextNode('X'));
    
    let donebtn = document.createElement('button');
    donebtn.className = "btn btn-success btn-sm mx-2 done";
    donebtn.append(document.createTextNode('Done'));

    li.appendChild(document.createTextNode(todoInput.value));
    li.appendChild(document.createTextNode("-"+descInput.value));
    li.appendChild(deletebtn);
    li.appendChild(donebtn);

    

    myobj={
        todo : todoInput.value,
        desc : descInput.value,
        flag : false
    }

    axios
    .post("https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/aboutTodo",myobj)
    .then((response)=>{
        remItem.appendChild(li);
        console.log(response);
    })
    .catch((err)=>{
        console.log(err);
    })

    form.reset();


}

function removeItem(e){
    if(confirm("are you confirm?")){
        var li = e.target.parentElement;
        var userId = li.dataset.userId;

        // var desc = li.childNodes[0]
        axios
        .delete(`https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/aboutTodo/${userId}`)
        .then(()=>{
            if (li.parentElement === remItem) {
                remItem.removeChild(li);
              } else if (li.parentElement === doneItem) {
                doneItem.removeChild(li);
              }
            console.log("user successfully deleted");
        })
        .catch((error)=>{
            console.log(error);
        })
    }
}

function todoDoneItem(e){
    // flag = true;
    var li = e.target.parentElement;
    var userId = li.dataset.userId;

    var todo = li.childNodes[0].textContent.substring(0);
    var desc = li.childNodes[1].textContent.substring(1);
    var flag = true;

    var editedItem = document.createElement('li');
    editedItem.className = "item mx-3 my-3";

    var deletebtn = document.createElement('button');
    deletebtn.className = 'btn btn-danger btn-sm mx-2 delete';
    deletebtn.appendChild(document.createTextNode('X'));
    
    editedItem.appendChild(document.createTextNode(todo));
    editedItem.appendChild(document.createTextNode("-"+desc));
    editedItem.appendChild(deletebtn);
    

    mynewObj ={
        todo: todo,
        desc: desc,
        flag: flag
    }

    axios
    .put(`https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/aboutTodo/${userId}`,mynewObj)
    .then((response)=>{
        doneItem.appendChild(editedItem);
        li.parentElement.removeChild(li);
        console.log(response);
    })
    .catch((error)=>{
        console.log(error);
    })


}