
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
          <span>compulsory</span>
          <span>creds:${todo.userId}</span>
          <span>id:${todo.id}-${todo.title}-</span>
        </li>
      `
      } else {
        tmp += `
        <li id="${todo.id}" class="credits:${todo.userId}">
          <span>elective</span>
          <span>creds:${todo.userId}</span>
          <span>id:${todo.id}-${todo.title}-</span>
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
  console.log("hUHHH");
  console.log(state.todolist);
  console.log(state.enrolledList);

  console.log("hUHHH");

  const selectTodo = () => {
    const todoContainer = document.querySelector(view.domstr.todoContainer);
    todoContainer.addEventListener('click', (event) => {
      console.log("situational therapy");
      console.log(state.todolist);
      console.log("situational therapy");
      // console.log(event.target.className);
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
          // const { userId, id, title, completed } = state.todolist.find(x=>x.id === event.target.id);
          console.log(state.todolist)
          console.log(+event.target.id)
          console.log(state.todolist.find(x=>+x.id === +event.target.id));
          const { userId, id, title, completed } = (state.todolist.find(x=>+x.id === +event.target.id));
          console.log(userId);
          const item = new model.Todo(userId, id, title, completed);
          console.log(userId);
          console.log("gonna select");
          console.log(item);
          console.log("selected");
          state.selectedlist = ([...state.selectedlist, item]);
          console.log(state.selectedlist);
          console.log("selected");
          // state.selectedList([course, ...state.tempCourses]);
        } else {
          alert("You can only choose up to 18 credits in one semester");
        }
      } else {
         event.target.classList.remove("selected");
         document.getElementById("creditCounter").innerHTML = (+event.target.classList[0].substring(8) * -1) + +document.getElementById("creditCounter").innerHTML;
         state.selectedlist = state.selectedlist.filter(
          (item) => +item.id !== +event.target.id
         );
         console.log(event.target.id)
         console.log("removed hopefully")
         console.log(state.selectedlist)
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
    // const inputbox = document.querySelector(view.domstr.inputebox);
    // inputbox.addEventListener('keyup', (event) => {
    //   if (event.key === 'Enter' && event.target.value.trim()) {
    //     const newTodo = new model.Todo(event.target.value);
    //     model.addTodo(newTodo).then(todo => {
    //       state.todolist = [todo, ...state.todolist];
    //     });
    //     event.target.value = '';
    //   }
    // });
  };

  const confirmButton= () => {
    document.getElementById("selectButton").addEventListener("click", function() {
      // console.log("if it works here then why-")
      // console.log(state.enrolledList)
      var collection = document.getElementsByClassName("selected")
      // console.log("wow I got pressed");
      if (collection.length === 0) {
        console.log(state.enrolledList)
        console.log("lol blank selections lmao");
      } else {
        console.log(state.enrolledList)
        var creds = document.getElementById('creditCounter').innerHTML;
        let text = "You have chosen " +
          creds +
          " credits for this semester. You cannot change once you submit. Do you want to confirm?";
          if (confirm(text) == true) {
            state.enrolledList = ([...state.enrolledList, ...state.selectedlist]);
            for(var i = 0; i < state.selectedlist.length; i++) {
              console.log(state.selectedlist[i]);
              state.todolist = state.todolist.filter(
                (item) => (item.id !== state.selectedlist[i].id)
               );
            }
            state.selectedlist = [];
          } else {
            text = "You canceled!";
          }
        // alert('You have chosen ${creds} credits for this semester. You cannot change once you submit. Do you want to confirm?')
        // const coursesToAdd = state.selectedlist;
        // state.setSelectedCourses(coursesToAdd);
        // console.log("enrowo");
        // console.log(state.enrolledList);
        // state.enrolledList = ([...state.enrolledList, ...state.selectedlist]);
        // // console.log(state.todolist.filter(
        // //   todo => (!state.selectedlist.includes(todo))
        // // ));
        // // console.log(enrolledList);
       
        // // console.log("h:");
        // //   console.log(collection);
        // //   console.log("h:");
        // // var ids= [];
        // // console.log(state.todolist);
        // for(var i = 0; i < state.selectedlist.length; i++) {
        //   console.log(state.selectedlist[i]);
        //   state.todolist = state.todolist.filter(
        //     (item) => (item.id !== state.selectedlist[i].id)
        //    );
        // }
        // state.selectedlist = [];
        // console.log(ids);
        // for (var i = 0; i < ids.length; i++){
        //   state.todolist = state.todolist.filter(
        //     (item) => +item.id !== +ids[i]
        //    );
        // }
        // console.log(state.todolist);
        // console.log(ids);
        // for(var i = 0; i < ids.length; i++) {
        //   console.log(ids[i]);
        //   state.todolist = state.todolist.filter(
        //     (todo) => +todo.id !== ids[i]
        //   );
        //   model.deleteTodo(ids[i]);
        //   const element = document.getElementById(ids[i]);
        //   element.remove();
        // }
      }
    })
  };

  const init = () => {
    model.getTodos().then((todos) => {
      // state.todolist = [...todos];
      state.todolist = todos;
      // console.log(state.todolist)
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
