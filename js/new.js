

let tasksArray = [];

if(localStorage.getItem('tasks')) {
   tasksArray = JSON.parse(localStorage.getItem('tasks'));
   
}

tasksArray.forEach(function(task) {

  const todosList = document.getElementById('todos_id');
  const taskHTML = `<li class="${task.category}" 
  id="${task.id}">
  ${task.text}
  <img class="img_delete_task" src="/img/clear.png" alt="delete task">
  </li>`

  const taskHTMLDone = `<li class="${task.category} checked"
  id="${task.id}">
  ${task.text}
  <img class="img_delete_task" src="/img/clear.png" alt="delete task">
  </li>`

  if(task.done === true) {
    todosList.insertAdjacentHTML('beforeend', taskHTMLDone);
  } else {
    todosList.insertAdjacentHTML('beforeend', taskHTML);
  }
})


checkEmptyList ();

function openPopUp () {
     document.getElementById('popup').style.display = "block";
}

function closePopUp () {
    document.getElementById('popup').style.display = "none";
    }

/* Delete task */
let close = document.getElementsByClassName("img_delete_task");
let i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
     var div = this.parentElement;
     let taskId = div.id;
     const index = tasksArray.findIndex(function (task) {
      if (task.id == taskId) {
        return true
      }
     })
     div.remove();
     tasksArray.splice(index, 1);
     checkEmptyList ();
     saveToLocalStorage ();
  }
}

/* Checked Task */
const containerTask = document.querySelector('ul');

containerTask.addEventListener('click', checkTask);


function checkTask (ev) {
  if (ev.target.classList.contains("li_filter")) {
    ev.target.classList.toggle('checked');
  };

  const clickedTask = tasksArray.find(function(task) {
    if(task.id == ev.target.id) {
      return true
    }
  })

  clickedTask.done = !clickedTask.done
  saveToLocalStorage ();
  
};


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

  const categoryName = li.getAttribute('class');
  
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
     let taskId = div.id;
     const index = tasksArray.findIndex(function (task) {
      if (task.id == taskId) {
        return true
      }
     })
     div.remove();
     tasksArray.splice(index, 1);
     checkEmptyList ();

     saveToLocalStorage ();
  }
}


const newTask = {
  id: Date.now(),
  text: inputValue,
  done: false,
  category: categoryName
};

li.setAttribute('id', newTask.id);

tasksArray.push(newTask);

checkEmptyList ();

saveToLocalStorage ();

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

/* Add active class to category button */
const links = document.querySelectorAll('.category_btn');
    
if (links.length) {
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      links.forEach((link) => {
          link.classList.remove('active');
      });
      e.preventDefault();
      link.classList.add('active');
    });
  });
}

/* Empty list image */

function checkEmptyList () {
  let tasksList = document.querySelector('#todos_id');
  let emptyContainer = document.querySelector('.image_empty');
 if(tasksList.children.length > 0) {
emptyContainer.style.display = "none";
} else if (tasksList.children.length === 0) {
  emptyContainer.style.display = "block";
 }
}

/* LocalStorage */

function saveToLocalStorage () {
  localStorage.setItem('tasks', JSON.stringify(tasksArray));
}
