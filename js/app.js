const formTask = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const btn = formTask.querySelector('button');
const input = formTask.querySelector('input');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function addTask() {
   const name = input.value.trim();
   if (!name) {
      alert("Please enter a task.");
      return;
   }

   const index = tasks.length;
   const html = `<li class="list" data-index="${index}">
            ${name}
            <div class="btn-box">
               <button class="complete-button">Complete</button>
               <button class="delete-button">Delete</button>
            </div>
            </li>`;

   tasks.push(html);
   localStorage.setItem('tasks', JSON.stringify(tasks));

   input.value = '';
   render();
}

function render() {
   taskList.innerHTML = tasks.join('');
   completeBtn();
   deleteBtn();
}

function completeBtn() {
   const btnCompleted = taskList.querySelectorAll('.complete-button');
   btnCompleted.forEach((button) => {
      button.addEventListener('click', function () {
         const result = this.closest('li');
         result.classList.toggle('completed');

         const index = result.getAttribute('data-index');
         tasks[index] = result.outerHTML;
         localStorage.setItem('tasks', JSON.stringify(tasks));
      });
   });
}

function deleteBtn() {
   const btnDelete = taskList.querySelectorAll('.delete-button');
   btnDelete.forEach((button) => {
      button.addEventListener('click', function () {
         const result = this.closest('li');
         const index = result.getAttribute('data-index');

         result.remove();
         tasks.splice(index, 1);

         tasks.forEach((task, i) => {
            const updatedTask = task.replace(`data-index="${index}"`, `data-index="${i}"`);
            tasks[i] = updatedTask;
         });

         localStorage.setItem('tasks', JSON.stringify(tasks));

         render();
      });
   });
}

btn.addEventListener('click', (e) => {
   e.preventDefault();
   addTask();
});


input.addEventListener('keydown', (e) => {
   if (e.key === 'Enter') {
      addTask();
   }
});

render();
