const qBank = [
  {
    question: "What the current viral disease this year ?",
    options: ["CONVIRUS", "AIDS", "EBOLA", "HIV"],
    correct: "convirus",
    id: 1
  },
  {
    question: "What the small bone of humans located ?",
    options: ["Leg", "Hand", "Ear", "Brain"],
    correct: "ear",
    id: 2
  },

  {
    question: "What is the roman number of letter C ?",
    options: ["None of the options", "1000", "90", "100"],
    correct: "100",
    id: 3
  },
  {
    question: "Who is the founder of Microsoft ?",
    options: ["Steve Ellen", "Elon Musk", "Bill Gates", "Donald Trump"],
    correct: "Bill Gates",
    id: 4
  },
  {
    question: "Who is the president of US ?",
    options: ["Donald Trump", "Barrack Obama", "Bill Gates", "Joe Biden"],
    correct: "Donald Trump",
    id: 5
  }
];

export default () => Promise.resolve(qBank);
// console.log(qBank.sort(() => 0.4 - Math.random()));
