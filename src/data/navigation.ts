const navLinks = [
  { label: "Dashboard", to: "/",roles: ["worker", "manager", "admin", "owner"] },
  { label: "Planner", to: "/planner",roles: ["worker", "manager", "admin", "owner"] },
  { label: "Workers", to: "/workers",roles: ["manager", "admin", "owner"] },
  { label: "Stations", to: "/stations",roles: ["manager", "admin", "owner"] },
  { label: "Settings", to: "/settings",roles: ["admin", "owner"] },
];

export default navLinks