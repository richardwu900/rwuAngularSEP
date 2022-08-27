
import { Api } from './api.js'

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
const View = (() => {
  const domstr = {
    todoContainer: '#todolist_containter',
    deletebtn: '.deletebtn',
    inputebox: '.todolist__input',
    enrolledContainer: "#enrolledlist_container"
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = '';
    arr.forEach((todo) => {
      if (todo.completed === true) {
        tmp += `
        <li id="${todo.id}" class="credits:${todo.userId}">
          <span>${todo.title}</span>
          <span>Course Type: Compulsory</span>
          <span>Course Credits: ${todo.userId}</span>
        </li>
      `
      } else {
        tmp += `
        <li id="${todo.id}" class="credits:${todo.userId}">
          <span>${todo.title}</span>
          <span>Course Type: Elective</span>
          <span>Course Credits: ${todo.userId}</span>
        </li>
      `
      };
    });
    return tmp;
  };

  return {
    domstr,
    render,
    createTmp,
  };
})();

/* ~~~~~~~~~~~~~~~~ Model ~~~~~~~~~~~~~~~~ */
const Model = ((api, view) => {
  class Todo {
    constructor(wtf, id, title, completed) {
      this.userId = wtf;
      this.id = id;
      this.title = title;
      this.completed = completed;
    }
  }
  class State {
    #todolist = [];
    #selectedlist = [];
    #enrolledList = [];

    get todolist() {
      return this.#todolist;
    }
    set todolist(newtodolist) {
      this.#todolist = [...newtodolist];

      const todoContainer = document.querySelector(view.domstr.todoContainer);
      const tmp = view.createTmp(this.#todolist);
      view.render(todoContainer, tmp);
    }

    get selectedlist() {
      return this.#selectedlist;
    }

    set selectedlist(newselectedlist) {
      this.#selectedlist = [...newselectedlist];
    }

    setselectedlist(newselectedlist) {
      this.#selectedlist = [...newselectedlist];
    }

    get enrolledList() {
      return this.#enrolledList;
    }
    
    set enrolledList(newenrolledlist) {
      this.#enrolledList = [...newenrolledlist];
      const enrolledContainer = document.querySelector(view.domstr.enrolledContainer);
      const tmp = view.createTmp(this.#enrolledList);
      view.render(enrolledContainer, tmp);
    }
  }

  const { getTodos, deleteTodo, addTodo } = api;

  return {
    getTodos,
    deleteTodo,
    addTodo,
    Todo,
    State,
  };
})(Api, View);

/* ~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~ */
const Controller = ((model, view) => {
  const state = new model.State();
  const selectTodo = () => {
    const todoContainer = document.querySelector(view.domstr.todoContainer);
    todoContainer.addEventListener('click', (event) => {
      var target = event.target;
      if (target.parentElement.tagName === "LI"){
        target = target.parentElement
      }
      if (!target.classList.contains("selected")){
        if (+target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML <= 18) {
          target.classList.add("selected");
          document.getElementById("creditCounter").innerHTML = +target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML;
          const { userId, id, title, completed } = (state.todolist.find(x=>+x.id === +target.id));
          const item = new model.Todo(userId, id, title, completed);
          state.selectedlist = ([...state.selectedlist, item]);
        } else {
          alert("You can only choose up to 18 credits in one semester");
        }
      } else {
         target.classList.remove("selected");
         document.getElementById("creditCounter").innerHTML = (+target.classList[0].substring(8) * -1) + +document.getElementById("creditCounter").innerHTML;
         state.selectedlist = state.selectedlist.filter(
          (item) => +item.id !== +target.id
         );
      }
    });
  };

  const confirmButton= () => {
    document.getElementById("selectButton").addEventListener("click", function() {
      var collection = document.getElementsByClassName("selected")
        var creds = document.getElementById('creditCounter').innerHTML;
        let text = "You have chosen " +
          creds +
          " credits for this semester. You cannot change once you submit. Do you want to confirm?";
          if (confirm(text) == true) {
            state.enrolledList = ([...state.enrolledList, ...state.selectedlist]);
            for(var i = 0; i < state.selectedlist.length; i++) {
              state.todolist = state.todolist.filter(
                (item) => (item.id !== state.selectedlist[i].id)
               );
            }
            state.selectedlist = [];
            document.getElementById('selectButton').disabled = true;
          } else {
            text = "You canceled!";
          }
    })
  };

  const init = () => {
    model.getTodos().then((todos) => {
      state.todolist = todos;
    });
  };

  const bootstrap = () => {
    init();
    selectTodo();
    confirmButton();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
