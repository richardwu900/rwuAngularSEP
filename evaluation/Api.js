/* ~~~~~~~~~~~~~~~~ Api ~~~~~~~~~~~~~~~~ */
export const Api = (() => {
  // fetch('http://localhost:4232/courseList')
  // .then(response => response.json())
  // .then(json => console.log(json))
//   const baseUrl = 'https://jsonplaceholder.typicode.com';
  const baseUrl = 'http://localhost:4232';
  const todoPath = 'todos';

  const getTodos = () =>
    fetch([baseUrl, todoPath].join('/')).then((response) => response.json());

  const deleteTodo = (id) =>
    fetch([baseUrl, todoPath, id].join('/'), {
      method: 'DELETE',
    });

  return {
    getTodos,
    deleteTodo,
  };
})();