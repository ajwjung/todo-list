# Todo List

* [Live Demo](https://ajwjung.github.io/todo-list/)

## Objective

To create a browser version of a productivity todo list and to further practice the concepts learned so far. Full details can be found on [The Odin Project's page](https://www.theodinproject.com/lessons/node-path-javascript-todo-list).

**Requirements**

1. The "todos" should be objects that are created dynamically

2. The todo list should have `projects` or separate lists of `todos`

3. There should be some sort of "default" project to which all of the user's todos are put
    * Users should be able to create new projects and choose which project their todos go into

4. The UI should be able to:
    * View all projects
    * View all todos in each project
    * Expand a single todo to see/edit its details
    * Delete a todo

5. Try to use Web Storage API to store the data so when the user refreshes, the todos don't disappear

## Built With
* HTML5
* CSS3
* Vanilla JS
* [Webpack](https://webpack.js.org/)

## Using the Todo List

This Todo List page allows you to:
* Create new categories
* Create new tasks in different categories
* Edit or delete existing tasks
* View task notes by expanding the task card
* Navigate across different categories to view respective tasks

To create a new category or add a new task, simply click the boxes to reveal their respective tabs.

This page uses `localStorage` to store data so your tasks will still be there when you refresh.

## Credits

All svg icons used in my webpage were downloaded from [Material Design Icons](https://materialdesignicons.com/).

## Author's Notes

This project was quite a challenge even though it used a lot of topics The Odin Project has taught up to this point. I particularly struggled with refactoring my code to use `localStorage` because it was my first time learning to use it. In the process, I learned about using `JSON.parse()` and `JSON.stringify()` to convert objects and arrays into strings that could be saved in `localStorage`. 
