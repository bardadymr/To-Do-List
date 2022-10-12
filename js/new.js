function openPopUp () {
     document.getElementById('popup').style.display = "block";
}

function closePopUp () {
    document.getElementById('popup').style.display = "none";
    }

/* Close task */
let close = document.getElementsByClassName("img_delete_task");
let i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
     var div = this.parentElement;
     div.style.display = "none";
  }
}

/* Checked Task */

let container = document.querySelector('ul');
container.addEventListener('click', (e) => {
  if (e.target.tagName === 'LI') {
    e.target.classList.toggle('checked');
  }
}, false);

/* Add new task */

function newElement () {
  let li = document.createElement("li");
  let inputValue = document.getElementById('input_text').value;
  let textValue = document.createTextNode(inputValue);
  let selectValue = document.getElementById('select_category').value;


  if(selectValue === "Work") {
    li.setAttribute('class', 'li_filter filter_work');
  } else if (selectValue === "Personal") {
      li.setAttribute('class', 'li_filter filter_personal');
  } else {
    li.setAttribute('class', 'li_filter filter_shopping');
  };

  li.appendChild(textValue);

  if(inputValue === '') {
    alert("Please, add your task!")
  } else {
    document.getElementById('todos_id').appendChild(li);
  }
  document.getElementById('input_text').value = "";

  let image = document.createElement("img");
  image.setAttribute('class', 'img_delete_task');
  image.setAttribute('src', '/img/clear.png');
  image.setAttribute('alt', 'delete task');
  li.appendChild(image);

let close = document.getElementsByClassName("img_delete_task");
let i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
     var div = this.parentElement;
     div.style.display = "none";
  }
}
}

/* Filter */ 

const filterButton = document.querySelectorAll('.category_btn');
const tasks = document.getElementsByClassName('li_filter');

function filter (category, items) {
   Array.from(items).forEach((item)=> {
    const isItemFiltred = !item.classList.contains(category);
    const isShowAll = category.toLowerCase() === "filter_all";
    if (isItemFiltred && !isShowAll) {
      item.classList.add('hide')
    } else {
      item.classList.remove('hide')
    }

   })
}


filterButton.forEach((button) => {
   button.addEventListener('click', () => {
    const currentCategory = button.dataset.filter;
    filter(currentCategory, tasks);
   });
});


