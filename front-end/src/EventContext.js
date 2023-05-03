import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const EventContext = createContext()
let baseUrl = "https://churcheventsapi.ddns.net/"

export const EventProvider = (props) => {
  const [events, setEvent] = useState()

  useEffect(() => {
    async function getEvents() {
      await refreshEvents()
    }
    getEvents()
  }, []);

  function refreshEvents() {
    return axios.get(baseUrl + "api/scheduledevents?_sort=day")
      .then(response => {
        setEvent(response.data)
      })
  }

  function getEvents(id) {
    return axios.get(baseUrl + `api/scheduledevents/${id}`)
      .then(response =>
        new Promise((resolve) => resolve(response.data))
      )
      .catch((error) =>
        new Promise((_, reject) => reject(error.response.statusText))
      )
  }

  function addEvent(product) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.post(baseUrl + "api/scheduledevents", product, {headers: myHeaders})
      .then(response => {
        refreshEvents()
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function updateEvent(event) {
    return axios.put(baseUrl + `api/scheduledevents/${event.id}`, event)
      .then(response => {
        return new Promise((resolve) => resolve(response.data))
      })
  }

  function deleteEvent(id) {
    let myHeaders = {
      Authorization: `Bearer ${localStorage.getItem('GroupPostLoginToken')}`
    };
    return axios.delete(baseUrl + `api/scheduledevents/${id}`, {headers: myHeaders})
      .then(refreshEvents())
  }
  
  function searchEvents(query) {
    return axios.get(baseUrl + `api/scheduledevents/search/${query}`)
    .then(response => {
      return new Promise((resolve) => resolve(response.data))
      })
  }

  return (
    <EventContext.Provider
      value={{
        events,
        getEvents,
        addEvent,
        updateEvent,
        deleteEvent,
        refreshEvents,
        searchEvents
      }}
    >
      {props.children}
    </EventContext.Provider>
  )
};