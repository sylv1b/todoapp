const todoItemTemplate = (todoItem, category) => {
  //create main container
  const mainContainer = document.createElement("div");
  mainContainer.className = "todo-item-main-container";
  mainContainer.setAttribute("id", `todo-item-main-container-${todoItem.id}`);
  mainContainer.onmouseenter = () => {
    setRemoveButtonVisible(todoItem.id);
  };
  mainContainer.onmouseleave = () => {
    setRemoveButtonHidden(todoItem.id);
  };

  const leftSpaceContainer = document.createElement("div");
  leftSpaceContainer.className = "left-spacer";
  mainContainer.appendChild(leftSpaceContainer);

  const todoContainer = document.createElement("div");
  todoContainer.className = `todo-item-container ${
    todoItem.done ? "todo-item-container-done" : ""
  }`;
  todoContainer.setAttribute("id", `todo-item-container-${todoItem.id}`);

  const doneContainer = document.createElement("div");
  doneContainer.className = "done-container";

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.onchange = () => {
    onToggleDone(todoItem.id);
  };
  checkBox.checked = todoItem.done;

  const todoTextContainer = document.createElement("div");
  todoTextContainer.className = "todo-text-container";

  const todoCategoryText = document.createElement("div");
  todoCategoryText.className = "tiny-text";
  const categoryText = document.createTextNode(category.name);
  todoCategoryText.appendChild(categoryText);

  const todoNameText = document.createElement("div");
  todoNameText.className = "normal-text";
  if (todoItem.done) {
    todoNameText.className = "done";
  }
  const nameText = document.createTextNode(todoItem.name);
  todoNameText.appendChild(nameText);

  todoTextContainer.appendChild(todoCategoryText);
  todoTextContainer.appendChild(todoNameText);

  const dueDateContainer = document.createElement("div");
  dueDateContainer.className = "due-date-container";

  const dueDateTitle = document.createElement("div");
  dueDateTitle.className = "tiny-text";
  const dueDateTitleText = document.createTextNode("Due date");
  dueDateTitle.appendChild(dueDateTitleText);

  const dueDateStatus = document.createElement("div");
  dueDateStatus.className = "normal-text";
  const dueDateStatusText = document.createTextNode(
    todoItem.done ? "Done" : todoItem.dueString
  );
  dueDateStatus.appendChild(dueDateStatusText);

  const closeButtonContainer = document.createElement("div");
  closeButtonContainer.className = "remove-item-button";
  closeButtonContainer.setAttribute("id", `remove-item-button-${todoItem.id}`);
  closeButtonContainer.onclick = () => onRemoveButtonClick(todoItem.id);

  const buttonImage = document.createElement("img");
  buttonImage.src = "./images/remove.png";
  buttonImage.setAttribute("width", "16px");
  buttonImage.setAttribute("height", "16px");
  buttonImage.setAttribute("alt", "Remove item");
  buttonImage.setAttribute("title", "Remove item");
  closeButtonContainer.appendChild(buttonImage);

  /////////////////

  doneContainer.appendChild(checkBox);
  doneContainer.appendChild(todoTextContainer);

  dueDateContainer.appendChild(dueDateTitle);
  dueDateContainer.appendChild(dueDateStatus);

  todoContainer.appendChild(doneContainer);
  todoContainer.appendChild(dueDateContainer);

  mainContainer.appendChild(todoContainer);
  mainContainer.appendChild(closeButtonContainer);
  return mainContainer;
};
