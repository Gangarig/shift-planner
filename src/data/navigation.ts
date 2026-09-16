const navLinks = [
  { label: "Dashboard", to: "/",roles: ["worker", "manager", "admin", "owner", "accountant"] },
  { label: "Planner", to: "/planner",roles: ["worker", "manager", "admin", "owner", "accountant"] },
  { label: "Leave & Payroll", to: "/payroll", roles: ["worker", "accountant", "admin", "owner"] },
  { label: "Workers", to: "/workers",roles: ["manager", "admin", "owner"] },
  { label: "Stations", to: "/stations",roles: ["manager", "admin", "owner"] },
  { label: "Team & Access", to: "/team", roles: ["owner"] },
  { label: "Audit history", to: "/audit", roles: ["owner"] },
  { label: "Settings", to: "/settings",roles: ["admin", "owner"] },
];

export default navLinks
