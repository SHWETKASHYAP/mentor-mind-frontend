import api from "./api";

export const fetchPlans = () =>
  api.get("/plans").then(res => res.data);
