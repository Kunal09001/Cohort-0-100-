/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(){
    this.toDoList = []
  }
  
  add(todo){
    this.toDoList.push(todo);
  }
  remove(indexOfTodo){
    this.toDoList.splice(indexOfTodo,1);
  }
  update(index,updatedTodo){
    for(let i=0;i<this.toDoList.length;i++){
      if(i == index){
        this.toDoList[i] = updatedTodo;
      }
    }
  }
  getAll(){
    return this.toDoList;
  }
  get(indexOfTodo){
    const getValue = this.toDoList[indexOfTodo];
    if(typeof getValue == 'undefined'){
      return null;
    }return getValue
  }
  clear(){
    this.toDoList = []
  }
}

module.exports = Todo;
