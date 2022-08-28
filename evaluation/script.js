
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
    arr.forEach((course) => {
      if (course.required === true) {
        tmp += `
        <li id="${course.courseId}" class="credits:${course.credit}">
          <span>${course.courseName}</span>
          <span>Course Type : Compulsory</span>
          <span>Course Credit : ${course.credit}</span>
        </li>
      `
      } else {
        tmp += `
        <li id="${course.courseId}" class="credits:${course.credit}">
          <span>${course.courseName}</span>
          <span>Course Type : Elective</span>
          <span>Course Credit : ${course.credit}</span>
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
  // class Todo {
  //   constructor(wtf, id, title, completed) {
  //     this.userId = wtf; //credits
  //     this.id = id; //courseId
  //     this.title = title; //courseName
  //     this.completed = completed; //required
  //   }
  // }
  class Course {
    constructor(courseId, courseName, required, credit) {
      this.courseId = courseId; //courseId
      this.courseName = courseName; //courseName
      this.required = required; //required
      this.credit = credit; //credits
    }
  }
  class State {
    #todolist = [];  //The "Available Courses"
    #selectedlist = []; // Keeps track of highlighted courses in "available"
    #enrolledList = []; // The "Selected Courses" (that were confirmed)

    // returns todolist
    get todolist() {
      return this.#todolist;
    }

    // sets todolist to parameter, updates "Available Courses"
    set todolist(newtodolist) {
      this.#todolist = [...newtodolist];

      const todoContainer = document.querySelector(view.domstr.todoContainer);
      const tmp = view.createTmp(this.#todolist);
      view.render(todoContainer, tmp);
    }

    // returns selectedlist
    get selectedlist() {
      return this.#selectedlist;
    }

    // sets selectedlist to parameter. (setting background color is done in selectTodo)
    set selectedlist(newselectedlist) {
      this.#selectedlist = [...newselectedlist];
    }

    // returns enrolledlist
    get enrolledList() {
      return this.#enrolledList;
    }

    // sets enrolledList to parameter, updates "Selected Courses"
    set enrolledList(newenrolledlist) {
      this.#enrolledList = [...newenrolledlist];
      const enrolledContainer = document.querySelector(view.domstr.enrolledContainer);
      const tmp = view.createTmp(this.#enrolledList);
      view.render(enrolledContainer, tmp);
    }
  }

  const { getTodos } = api;

  return {
    getTodos,
    Course,
    State,
  };
})(Api, View);

/* ~~~~~~~~~~~~~~~~ Controller ~~~~~~~~~~~~~~~~ */
const Controller = ((model, view) => {
  // I love having a state to control in the controller part of this mcv model
  const state = new model.State();

  // Selecting or deselecting an available course!
  const selectTodo = () => {
    const todoContainer = document.querySelector(view.domstr.todoContainer);
    todoContainer.addEventListener('click', (event) => {
      var target = event.target;
      // Allows selecting an LI by clicking the blank part of the LI, or text of the span within the LI
      if (target.parentElement.tagName === "LI") {
        target = target.parentElement
      }
      // See if the selected element is selected already. If not...
      if (!target.classList.contains("selected")) {
        // Check if adding the target  will put the total credit over the max 18. If not...
        if (+target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML <= 18) {
          // Give target LI the "selected" class for blue background & identifying purposes.
          target.classList.add("selected");
          // Increase the total credit by the target's credit value
          document.getElementById("creditCounter").innerHTML = +target.classList[0].substring(8) + +document.getElementById("creditCounter").innerHTML;
          // Map the values of target to these keys, and make a new model.Todo out of it to add to "selected list" (& add it)
          const { courseId, courseName, required, credit } = (state.todolist.find(x => +x.courseId === +target.id));
          const item = new model.Course(courseId, courseName, required, credit );
          state.selectedlist = ([...state.selectedlist, item]);
        } else { // ... and if the target will put it over the max 18:
          alert("You can only choose up to 18 credits in one semester");
        }
      } else { // ...and if the element was selected already:
        // remove the target's "selected" class
        target.classList.remove("selected");
        // & remove target from selectedlist
        document.getElementById("creditCounter").innerHTML = (+target.classList[0].substring(8) * -1) + +document.getElementById("creditCounter").innerHTML;
        state.selectedlist = state.selectedlist.filter(
          (item) => +item.id !== +target.id
        );
      }
    });
  };

  // Selected all you wanted from Available Courses? Let's get those enrolled!
  const confirmButton = () => {
    // I love it when the one button does what it's supposed to
    document.getElementById("selectButton").addEventListener("click", function () {
      // Get the number of credits from Total Credit:, and ask the user to confirm being ready
      var creds = document.getElementById('creditCounter').innerHTML;
      let text = "You have chosen " +
        creds +
        " credits for this semester. You cannot change once you submit. Do you want to confirm?";
      if (confirm(text) == true) {
        // Add the selectedlist to the enrolled list
        state.enrolledList = ([...state.enrolledList, ...state.selectedlist]);
        // Remove the selectedlists from "Available Courses"
        for (var i = 0; i < state.selectedlist.length; i++) {
          state.todolist = state.todolist.filter(
            (item) => (item.courseId !== state.selectedlist[i].courseId)
          );
        }
        // Empty selectedlist
        state.selectedlist = [];
        // Disable button
        document.getElementById('selectButton').disabled = true;
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
