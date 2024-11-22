export const eventAPI = (() => {
  const EVENT_API_URL = "http://localhost:3000/events";

  async function getEvents() {
      const response = await fetch(EVENT_API_URL);
      return await response.json();
  }

  async function postEvent(newEvent) {
      const response = await fetch(EVENT_API_URL, {
          method: "POST",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
      });
      return await response.json();
  }

  async function deleteEvent(id) {
      await fetch(`${EVENT_API_URL}/${id}`, { method: "DELETE" });
      return id;
  }

  async function updateEvent(id, updatedEvent) {
      const response = await fetch(`${EVENT_API_URL}/${id}`, { 
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedEvent),
      });
      return await response.json();
  }

  return {
      getEvents,
      postEvent,
      deleteEvent,
      updateEvent,
  };
})();
