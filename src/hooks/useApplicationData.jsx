import { useState, useEffect, useReducer } from "react";
import Axios from "axios";

export default function useApplicationData() {
  const SET_DAY = "SET_DAY";
  const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
  const SET_INTERVIEW = "SET_INTERVIEW";
  const SET_DAYS = "SET_DAYS";

  const reducer = function (state, action) {
    // console.log(state, action);
    const actionHandlers = {
      [SET_DAY]: () => {
        const { day } = action;
        return { ...state, day };
      },
      [SET_DAYS]: () => {
        const { days } = action;
        return { ...state, days };
      },
      [SET_APPLICATION_DATA]: () => {
        const { days, appointments, interviewers } = action;
        return {
          ...state,
          days,
          appointments,
          interviewers,
        };
      },
      [SET_INTERVIEW]: () => {
        const { id, interview } = action;
        const appointment = {
          ...state.appointments[id],
          interview,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        return {
          ...state,
          appointments,
        };
      },
    };
    if (!actionHandlers[action.type]) {
      throw new Error(
        `Tried to reduce with unsupported action type: ${action.type}`
      );
    }
    return actionHandlers[action.type]();
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  const setDay = (day) => {
    dispatch({ type: SET_DAY, day });
  };

  const bookInterview = function (id, interview) {
    // console.log(id, interview);

    return Axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        return Axios.get("/api/days");
      })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, id, interview });
        dispatch({ type: SET_DAYS, days: response.data });
      });
  };

  const deleteInterview = function (id) {
    return Axios.delete(`/api/appointments/${id}`)
      .then(() => {
        return Axios.get("/api/days");
      })
      .then((response) => {
        dispatch({ type: SET_INTERVIEW, id, interview: null });
        dispatch({ type: SET_DAYS, days: response.data });
      });
  };

  useEffect(() => {
    Promise.all([
      Axios.get("/api/days"),
      Axios.get("/api/appointments"),
      Axios.get("/api/interviewers"),
    ]).then((responses) => {
      dispatch({
        type: SET_APPLICATION_DATA,
        days: responses[0].data,
        appointments: responses[1].data,
        interviewers: responses[2].data,
      });
      // console.log(responses);
    });
  }, []);

  return {
    state,
    setDay,
    bookInterview,
    deleteInterview,
  };
}
