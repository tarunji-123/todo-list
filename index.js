
console.log("hii");

var form = document.getElementById('my-form');
var items = document.getElementById('items');

form.addEventListener('submit', addItems);
items.addEventListener('click', removeItem);

function addItems(e) {
    e.preventDefault();

    var amountInput = document.getElementById('amount').value;
    var categoryInput = document.getElementById('category').value;
    var category_tableInput = document.getElementById('category_table').value;

    var li = document.createElement('li');
    li.className = "item mx-2 fs-6 ml-4 pl-4";

    var delBtn = document.createElement('input');
    delBtn.type = 'button';
    delBtn.value = "delete";
    delBtn.className = "delete mx-2";

    li.appendChild(document.createTextNode(amountInput));
    li.appendChild(document.createTextNode("-" + categoryInput));
    li.appendChild(delBtn);

    var myobj = {
        amount: amountInput,
        category: categoryInput
    };

    axios
        .post("https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/booktable", myobj)
        .then(() => {
            var table = document.querySelector("." + category_tableInput);
            var itemsChildren = items.querySelectorAll('h1');
            for (var i = 0; i < itemsChildren.length; i++) {
                if (itemsChildren[i].classList.contains(table.className)) {
                    itemsChildren[i].appendChild(li);
                    break;
                }
            }
        })
        .catch((error) => {
            console.log(error);
        });

}

function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        var listItem = e.target.parentElement;
        var table = listItem.parentElement;
        table.removeChild(listItem);

        var amountText = listItem.childNodes[0].textContent;
        var categoryText = listItem.childNodes[1].textContent.substring(1);

        var myobj = {
            amount: amountText,
            category: categoryText
        };

        axios
            .delete("https://crudcrud.com/api/04ebed79233a47de8aa8579fd4f8d74e/booktable", { data: myobj })
            .then(() => {
                console.log("Item removed successfully!");
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

