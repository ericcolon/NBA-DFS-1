let userData = [
  {
    username: "kyle",
    password: "kyle",
    email: "email@email.com"
  },
  {
    username: "eric",
    password: "eric",
    email: "email@email.com"
  },
  {
    username: "will",
    password: "will",
    email: "email@email.com"
  },
  {
    username: "joe",
    password: "joe",
    email: "email@email.com"
  },
  {
    username: "nate",
    password: "nate",
    email: "email@email.com"
  },
  {
    username: "cindy",
    password: "cindy",
    email: "email@email.com"
  },
  {
    username: "test",
    password: "test",
    email: "email@email.com"
  }
];

let out = []

for (let i = 1; i < 101; i++) {
  out.push({
    username: 'user' + i,
    password: 'user' + i,
    email: 'email' + i + '@email.com'
  })
}

userData = out.concat(userData);

module.exports = userData;