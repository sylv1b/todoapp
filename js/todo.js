var myStorage = window.localStorage;

//Todo class
class Todo {
  constructor({ name, dueDate, categoryId, id, done }) {
    this.id = id ? id : new Date().getUTCMilliseconds();
    this.name = name;
    this.dueDate = dueDate;
    this.categoryId = categoryId;
    this.done = !!done;
    this.dueString =
      moment(dueDate).format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")
        ? "Today"
        : moment(moment(dueDate).format("YYYY-MM-DD")).fromNow();
  }
}

//todo list
class TodoList {
  constructor() {
    try {
      this.storedTodos = myStorage.getItem("toDoItems");

      this.storedTodos =
        this.storedTodos && this.storedTodos !== "undefined"
          ? JSON.parse(this.storedTodos)
          : [];

      this.sortedStoredTodo = !!this.storedTodos.length
        ? this.storedTodos.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          })
        : [];
    } catch (error) {
      console.error(error);
      this.storedTodos = [];
      this.sortedStoredTodo = [];
    }
  }

  getList() {
    return !!this.sortedStoredTodo.length
      ? this.sortedStoredTodo.map((todo) => new Todo(todo))
      : [];
  }

  async add(todo) {
    let errors = {};
    errors.name = todo.name === "" ? "Write a name!" : null;
    errors.dueDate = todo.dueDate === "" ? "Choose a due date!" : null;

    if (errors.name || errors.dueDate) {
      throw errors;
    } else {
      this.storedTodos.push(todo);

      return await this.save()
        .then(() => this.refresh())
        .then((result) => result)
        .catch((err) => console.log(err));
    }
  }

  async delete(todo) {
    let todoIndex = this.storedTodos.findIndex((item) => {
      return item.id === todo.id;
    });

    if (todoIndex !== -1) {
      this.storedTodos.splice(todoIndex, 1);
      if (this.storedTodos.length > 0) {
        return await this.save()
          .then(() => this.refresh())
          .then((result) => result)
          .catch((err) => console.log(err));
      } else {
        return await this.empty();
      }
    } else {
      throw "Error: todo item not found";
    }
  }

  async updateItem(todo) {
    let todoIndex = this.storedTodos.findIndex((item) => {
      return item.id === todo.id;
    });

    this.storedTodos[todoIndex] = {
      ...todo,
    };

    return await this.save()
      .then(() => this.refresh())
      .then((result) => result)
      .catch((err) => console.log(err));
  }

  async save() {
    return await myStorage.setItem(
      "toDoItems",
      JSON.stringify(this.storedTodos)
    );
  }

  async refresh() {
    try {
      this.storedTodos = await myStorage.getItem("toDoItems");

      this.storedTodos =
        this.storedTodos && this.storedTodos !== "undefined"
          ? JSON.parse(this.storedTodos)
          : [];

      this.sortedStoredTodo = !!this.storedTodos.length
        ? this.storedTodos.sort((a, b) => {
            return new Date(a.dueDate) - new Date(b.dueDate);
          })
        : [];
      return "done";
    } catch (error) {
      console.error(error);
      this.storedTodos = [];
      this.sortedStoredTodo = [];
      return error;
    }
  }

  async empty() {
    await myStorage.setItem("toDoItems", JSON.stringify([]));
    return await this.refresh();
  }
}
