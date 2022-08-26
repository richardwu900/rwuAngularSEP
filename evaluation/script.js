
import { Api } from './api.js'

/* ~~~~~~~~~~~~~~~~ View ~~~~~~~~~~~~~~~~ */
const View = (() => {
  const domstr = {
    todoContainer: '#todolist_containter',
    deletebtn: '.deletebtn',
    inputebox: '.todolist__input',
  };

  const render = (ele, tmp) => {
    ele.innerHTML = tmp;
  };

  const createTmp = (arr) => {
    let tmp = '';
    arr.forEach((todo) => {
      tmp += `
        <li>
          <span>${todo.id}-${todo.title}</span>
          <button class="deletebtn" id="${todo.id}">X</button>
        </li>
      `;
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
    constructor(title) {
      this.userId = 1;
      this.title = title;
      this.completed = false;
    }
  }
  class State {
    #todolist = [];

    get todolist() {
      console.log("get depressed loser");
      return this.#todolist;
    }
    set todolist(newtodolist) {
      console.log("set deez nuts in ur mouth");
      this.#todolist = [...newtodolist];

      const todoContainer = document.querySelector(view.domstr.todoContainer);
      const tmp = view.createTmp(this.#todolist);
      view.render(todoContainer, tmp);
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

  const deleteTodo = () => {
    console.log("egg");
    const todoContainer = document.querySelector(view.domstr.todoContainer);
    todoContainer.addEventListener('click', (event) => {
      if (event.target.className === 'deletebtn') {
        state.todolist = state.todolist.filter(
          (todo) => +todo.id !== +event.target.id
        );
      }
      model.deleteTodo(+event.target.id);
    });
  };

  const addTodo = () => {
    const inputbox = document.querySelector(view.domstr.inputebox);
    inputbox.addEventListener('keyup', (event) => {
      if (event.key === 'Enter' && event.target.value.trim()) {
        const newTodo = new model.Todo(event.target.value);
        model.addTodo(newTodo).then(todo => {
          state.todolist = [todo, ...state.todolist];
        });
        event.target.value = '';
      }
    });
  };

  const init = () => {
    model.getTodos().then((todos) => {
      state.todolist = [...todos.reverse()];
    });
  };

  const bootstrap = () => {
    init();
    deleteTodo();
    addTodo();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
