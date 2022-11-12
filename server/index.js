const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
  });

jirafs = [];

// jirafs.push({title: "Important note on pandas", message: "Panda bears are very important to their ecosystems", labels:["All", "Important"], color:"yellow", id:"sam_001"});
// jirafs.push({title: "School note", message: "Don't forget to do your math homework", labels:["All", "School", "Today"], color:"red", id:"sam002"});
// jirafs.push({title: "Random note", message: "This is a drawing", labels:["All"], color:"lightblue", id:"sam003"});

app.get("/data", (req, res) => {
    res.json({
      labels: [{label: "All", selected: true}, {label: "Important", selected: false}, {label: "Today", selected: false}],
      jirafItems: jirafs,
      currentLabel: "All"
    });
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});