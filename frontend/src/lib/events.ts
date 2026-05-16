import { api } from "./api";

export const getEvents = async () => {
  const res = await api.get("/events");

  return res.data.events;
};