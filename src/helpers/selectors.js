export function getAppointmentsForDay(state, day) {
  const results = [];
  const dayObj = state.days.find((d) => d.name === day);
  if (!dayObj) {
    return [];
  }
  for (const appointmentId of dayObj.appointments) {
    results.push(state.appointments[appointmentId]);
  }
  return results;
}
