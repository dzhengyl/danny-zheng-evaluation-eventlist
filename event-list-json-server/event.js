import { eventAPI } from "./eventAPI.js";

function createEventElement(event) {
  const eventItemElem = document.createElement("tr");

  const nameElem = document.createElement("td");
  nameElem.textContent = event.eventName;

  const startElem = document.createElement("td");
  startElem.textContent = event.startDate;

  const endElem = document.createElement("td");
  endElem.textContent = event.endDate;

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", async () => {
    await eventAPI.deleteEvent(event.id);
    eventItemElem.remove();
  });

  const editButton = document.createElement("button");
  editButton.textContent = "Edit";

  const nameInputElem = document.createElement("input");
  nameInputElem.type = "text";
  nameInputElem.value = event.eventName;

  const startInputElem = document.createElement("input");
  startInputElem.type = "date";
  startInputElem.value = event.startDate;

  const endInputElem = document.createElement("input");
  endInputElem.type = "date";
  endInputElem.value = event.endDate;

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";

  editButton.addEventListener("click", () => {
    nameElem.replaceWith(nameInputElem);
    startElem.replaceWith(startInputElem);
    endElem.replaceWith(endInputElem);
    editButton.replaceWith(saveButton);
    deleteButton.replaceWith(cancelButton);
  });

  saveButton.addEventListener("click", async () => {
    const updatedEvent = await eventAPI.updateEvent(event.id, {
      eventName: nameInputElem.value,
      startDate: startInputElem.value,
      endDate: endInputElem.value,
    });

    nameElem.textContent = updatedEvent.eventName;
    startElem.textContent = updatedEvent.startDate;
    endElem.textContent = updatedEvent.endDate;

    nameInputElem.replaceWith(nameElem);
    startInputElem.replaceWith(startElem);
    endInputElem.replaceWith(endElem);
    saveButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);
  });

  cancelButton.addEventListener("click", () => {
    nameInputElem.replaceWith(nameElem);
    startInputElem.replaceWith(startElem);
    endInputElem.replaceWith(endElem);
    saveButton.replaceWith(editButton);
    cancelButton.replaceWith(deleteButton);
  });

  const actionElem = document.createElement("td");
  actionElem.append(editButton, deleteButton);

  eventItemElem.append(nameElem, startElem, endElem, actionElem);

  return eventItemElem;
}

function createNewEventRow() {
  const eventTableBody = document.getElementById("event-table-body");
  const newRow = document.createElement("tr");

  const nameInputElem = document.createElement("input");
  nameInputElem.type = "text";
  nameInputElem.placeholder = "Event Name";

  const startInputElem = document.createElement("input");
  startInputElem.type = "date";

  const endInputElem = document.createElement("input");
  endInputElem.type = "date";

  const saveButton = document.createElement("button");
  saveButton.textContent = "Add";

  const cancelButton = document.createElement("button");
  cancelButton.textContent = "Cancel";

  const nameCell = document.createElement("td");
  const startCell = document.createElement("td");
  const endCell = document.createElement("td");
  const actionCell = document.createElement("td");

  nameCell.appendChild(nameInputElem);
  startCell.appendChild(startInputElem);
  endCell.appendChild(endInputElem);
  actionCell.appendChild(saveButton);
  actionCell.appendChild(cancelButton);

  newRow.append(nameCell, startCell, endCell, actionCell);
  eventTableBody.appendChild(newRow);

  saveButton.addEventListener("click", async () => {
    const newEvent = await eventAPI.postEvent({
      eventName: nameInputElem.value,
      startDate: startInputElem.value,
      endDate: endInputElem.value,
    });

    const eventElem = createEventElement(newEvent);
    newRow.replaceWith(eventElem);
  });

  cancelButton.addEventListener("click", () => {
    newRow.remove();
  });
}

function renderEvents(events) {
  const eventTableBody = document.getElementById("event-table-body");
  eventTableBody.innerHTML = "";

  for (const event of events) {
    const eventElem = createEventElement(event);
    eventTableBody.appendChild(eventElem);
  }
}

function setUpAddEventButton() {
  const addEventButton = document.getElementById("add-event-button");
  addEventButton.addEventListener("click", createNewEventRow);
}

(function initApp() {
  setUpAddEventButton();

  eventAPI.getEvents().then((events) => {
    renderEvents(events);
  });
})();
