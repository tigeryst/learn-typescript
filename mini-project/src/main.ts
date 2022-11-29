import "./style.css";

import { v4 as uuidv4 } from "uuid";

interface ToDoItem {
  id: string;
  text: string;
  completed: boolean;
}

const form = document.querySelector("#to-do-form")! as HTMLFormElement;
const input = document.querySelector("#to-do-form__input")! as HTMLInputElement;
// const button = document.querySelector("#to-do-form__submit")! as HTMLButtonElement;
const list = document.querySelector("#to-do-list")! as HTMLUListElement;
const toDoItemTemplate = document.querySelector(
  "#to-do-item__template"
)! as HTMLTemplateElement;

const readToDoList = (): ToDoItem[] => {
  const toDoListJSON = localStorage.getItem("toDoList");
  if (toDoListJSON) {
    return JSON.parse(toDoListJSON);
  } else {
    return [];
  }
};

const saveToDoList = (): void => {
  localStorage.setItem("toDoList", JSON.stringify(toDoList));
};

const setCompletedClass = (
  toDoItemEl: HTMLLIElement,
  checked: boolean
): void => {
  if (checked) {
    toDoItemEl.classList.add("completed");
  } else {
    toDoItemEl.classList.remove("completed");
  }
};

const createToDoItemEl = (toDoItem: ToDoItem): HTMLLIElement => {
  const templateFragment = toDoItemTemplate.content.cloneNode(
    true
  ) as DocumentFragment;
  const newToDoItem = templateFragment.querySelector(
    ".to-do-item"
  ) as HTMLLIElement;
  newToDoItem.id = toDoItem.id;
  setCompletedClass(newToDoItem, toDoItem.completed);

  const toDoItemCheckbox = newToDoItem.querySelector(
    ".to-do-item__checkbox"
  )! as HTMLInputElement;
  toDoItemCheckbox.checked = toDoItem.completed;

  toDoItemCheckbox.addEventListener("click", () => {
    toDoItem.completed = toDoItemCheckbox.checked;
    setCompletedClass(newToDoItem, toDoItem.completed);
    saveToDoList();
  });

  const toDoItemText = newToDoItem.querySelector(
    ".to-do-item__text"
  )! as HTMLParagraphElement;
  toDoItemText.innerHTML = toDoItem.text;

  return newToDoItem;
};

const toDoList: ToDoItem[] = readToDoList();

toDoList.map((toDoItem) => {
  list.appendChild(createToDoItemEl(toDoItem));
});

const handleSubmit = (e: SubmitEvent): void => {
  e.preventDefault();

  const toDoItem: ToDoItem = {
    id: uuidv4(),
    text: input.value,
    completed: false,
  };
  toDoList.push(toDoItem);

  saveToDoList();

  const newToDoItem = createToDoItemEl(toDoItem);

  list.appendChild(newToDoItem);

  input.value = "";
};

form.addEventListener("submit", handleSubmit);