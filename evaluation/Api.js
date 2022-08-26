/* ~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~ */
export const Api = (() => {
  // fetch('http://localhost:4232/courseList')
  // .then(response => response.json())
  // .then(json => console.log(json))
//   const baseUrl = 'https://jsonplaceholder.typicode.com';
  const baseUrl = 'http://localhost:4232';
  const todoPath = 'todos';
  // wait wtf, so if that works.... WHY IS IT ONYL DISPLAYING UNDEFINED!??!!?

  const getTodos = () =>
    fetch([baseUrl, todoPath].join('/')).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todoPath, id].join('/'), {
      method: 'DELETE',
    });

  const addTodo = (todo) =>
    // console.log(todo);
    fetch([baseUrl, todoPath].join('/'), {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
  return {
    getTodos,
    deleteTodo,
    addTodo
  };
})();