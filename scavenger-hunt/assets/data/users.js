export let users = [
  {
    name: "Joshua Cleveland",
    descriptor: "Senior",
    type: "individual",
    rank: 1,
    points: 105
  }
];

export let usersTest = [
  {
    name: "John Doe",
    descriptor: "Junior",
    type: "individual",
    rank: 1 /* Calculated from points */,
    points: 75 /* Calculated from completedTasks */,
    completedTasks: ["t99ba8c", "t163891"],
  },
  {
    name: "Jane Doe",
    descriptor: "Sophomore",
    type: "individual",
    rank: 2 /* Calculated from points */,
    points: 20 /* Calculated from completedTasks */,
    completedTasks: ["tbc7950", "t50326b", "t9bfe2e"],
  }
];
