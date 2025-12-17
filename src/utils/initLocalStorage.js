export function initializeLocalStorage() {
  // clears local storage
  localStorage.clear();

  // sets up users for demo
  const users = [

    {
      email: "parent@mail.com",
      username: "ParentPat",
      password: "ParentPass1!",
      role: "parent",
      linkedAccounts: ["EcoElla", "GreenGabe", "ZeroHero"],
    },


    {
      email: "teacher@mail.com",
      username: "TeacherTina",
      password: "TeacherPass1!",
      role: "teacher",
      leaderboards: ["Class A", "Class B", "Class C"],
    },

    {
      email: "student1@mail.com",
      username: "EcoElla",
      password: "StudentPass1!",
      role: "student",
      leaderboards: ["Class A", "Class B"],
      achievements: ["Recycle Warrior"],
    },
    {
      email: "student2@mail.com",
      username: "GreenGabe",
      password: "StudentPass2!",
      role: "student",
      leaderboards: ["Class C"],
      achievements: ["Green Thumb"],
    },
    {
      email: "student3@mail.com",
      username: "WasteWiz",
      password: "StudentPass3!",
      role: "student",
      leaderboards: ["Class B"],
      achievements: [],
    },
    {
      email: "student4@mail.com",
      username: "PlanetPenny",
      password: "StudentPass4!",
      role: "student",
      leaderboards: ["Class A", "Class C"],
      achievements: ["Earthsaver"],
    },
    {
      email: "student5@mail.com",
      username: "TrashTamer",
      password: "StudentPass5!",
      role: "student",
      leaderboards: ["Class C"],
      achievements: [],
    },
    {
      email: "student6@mail.com",
      username: "CompostKid",
      password: "StudentPass6!",
      role: "student",
      leaderboards: ["Class B", "Class C"],
      achievements: ["Nature Lover"],
    },
    {
      email: "student7@mail.com",
      username: "ZeroHero",
      password: "StudentPass7!",
      role: "student",
      leaderboards: ["Class B"],
      achievements: [],
    },
    {
      email: "student8@mail.com",
      username: "BinBoss",
      password: "StudentPass8!",
      role: "student",
      leaderboards: ["Class A", "Class B", "Class C"],
      achievements: ["Compost Ranger"],
    },
  ];

  //Sets up leaderboards for demo
  const leaderboards = {
    "Class A": [
      { username: "EcoElla", score: 85 },
      { username: "ZeroHero", score: 78 },
      { username: "PlanetPenny", score: 95 },
      { username: "BinBoss", score: 89 },
    ],
    "Class B": [
      { username: "EcoElla", score: 72 },
      { username: "WasteWiz", score: 91 },
      { username: "CompostKid", score: 88 },
      { username: "BinBoss", score: 94 },
    ],
    "Class C": [
      { username: "GreenGabe", score: 83 },
      { username: "PlanetPenny", score: 87 },
      { username: "TrashTamer", score: 69 },
      { username: "CompostKid", score: 92 },
      { username: "BinBoss", score: 88 },
    ],
    joinCodes: {
      "Class A": "CLA-2715",
      "Class B": "CLA-5804",
      "Class C": "CLA-8921",
    },
  };

  //Adds all data to local storage
  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("leaderboards", JSON.stringify(leaderboards));
  localStorage.setItem("initialized", "true");

}
