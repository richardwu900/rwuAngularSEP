
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
      if (todo.completed === true) {
        tmp += `
        <li>
          <span id="${todo.id}" class="credits:${todo.userId}">compulsory-creds:${todo.userId}-id:${todo.id}-${todo.title}-</span>
        </li>
      `
      } else {
        tmp += `
        <li>
          <span id="${todo.id}" class="credits:${todo.userId}">elective-creds:${todo.userId}-id:${todo.id}-${todo.title}-</span>
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
    constructor(title) {
      this.userId = 1;
      this.title = title;
      this.completed = completed;
    }
  }
  class State {
    #todolist = [];
    // #selectedlist = [];

    get todolist() {
      // console.log("get depressed loser");
      return this.#todolist;
    }
    set todolist(newtodolist) {
      // console.log("set deez nuts in ur mouth");
      this.#todolist = [...newtodolist];

      const todoContainer = document.querySelector(view.domstr.todoContainer);
      const tmp = view.createTmp(this.#todolist);
      view.render(todoContainer, tmp);
    }

    // get selectedlist() {
    //   // console.log("get depressed loser");
    //   return this.#selectedlist;
    // }
    // set selectedlist(newselectedlist) {
    //   // console.log("set deez nuts in ur mouth");
    //   this.#selectedlist = [...selectedlist];

    //   // const todoContainer = document.querySelector(view.domstr.todoContainer);
    //   // const tmp = view.createTmp(this.#todolist);
    //   // view.render(todoContainer, tmp);
    // }
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
      console.log("egg");
      console.log(event.target.className);
      // state.todolist = state.todolist.forEach((element) => {
      //   console.log(element.selected);
      //   // if (element.selected === false) {

      //   // } else {

      //   // };
      // });
      if (!event.target.classList.contains("selected")){
        if (+event.target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML <= 18) {
          event.target.classList.add("selected");
          document.getElementById("creditCounter").innerHTML = +event.target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML;
          // console.log(document.getElementById ('creditCounter'));
        } else {
          alert("You can only choose up to 18 credits in one semester");
        }
      } else {
         event.target.classList.remove("selected");
        document.getElementById("creditCounter").innerHTML = (+event.target.classList[0].substring(8) * -1) + +document.getElementById("creditCounter").innerHTML;
        // state.todolist = state.todolist.filter(
        //   (todo) => +todo.id !== +event.target.id
        // );
        // model.deleteTodo(event.target.id);
      }
      // console.log(event.target.classList);
      // console.log(event.target.id);
      // console.log("egg");
      // if (event.target.className === 'deletebtn') {
      //   state.todolist = state.todolist.filter(
      //     (todo) => +todo.id !== +event.target.id
      //   );
      // }
      // model.deleteTodo(+event.target.id);
    });
  };

  // const selectTodo = () => {
  //   console.log("egg");
  //   const todoContainer = document.querySelector(view.domstr.todoContainer);
  //   todoContainer.addEventListener('click', (event) => {
  //     if (event.target.className === "unselected") {
  //       event.target.className = "selected";
  //       console.log("urmum");
  //     }
  //   });
  // };

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

  const confirmButton= () => {
    document.getElementById("selectButton").addEventListener("click", function() {
      var collection = document.getElementsByClassName("selected")
      // console.log("wow I got pressed");
      if (collection.length === 0) {
        console.log("lol blank selections lmao");
      } else {
        var creds = document.getElementById('creditCounter');
        alert('You have chosen ${creds} credits for this semester. You cannot change once you submit. Do you want to confirm?')
       
        console.log("h:");
          console.log(collection);
          console.log("h:");
        var ids= [];
        for(var i = 0; i < collection.length; i++) {
          // console.log(document.getElementsByClassName(courses).innerHTML);
          document.getElementById("courses").innerHTML = document.getElementById(collection[i]).innerHTML;
          ids[i] = collection[i].id;
        }
        console.log(ids);
        for(var i = 0; i < ids.length; i++) {
          console.log(ids[i]);
          state.todolist = state.todolist.filter(
            (todo) => +todo.id !== ids[i]
          );
          model.deleteTodo(ids[i]);
          const element = document.getElementById(ids[i]);
          element.remove();
        }
      }
    })
  };

  const init = () => {
    model.getTodos().then((todos) => {
      state.todolist = [...todos];
    });
  };

  const bootstrap = () => {
    init();
    // deleteTodo();
    addTodo();
    selectTodo();
    confirmButton();
  };

  return {
    bootstrap,
  };
})(Model, View);

Controller.bootstrap();
