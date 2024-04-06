const express = require("express");
const app = express();
const connectDB = require("./config/db");
const Hero = require("./models/heroModel");

connectDB();

// for creating superhero let's do a middleware:
app.use(express.json());

// Display all superheroes
app.get("/superheroes", async (req, res) => {
  // res.json({ msg: "Showing all superheroes" });
  try {
    const heroes = await Hero.find({});
    res.json(heroes);
  } catch (error) {
    console.log(error);
  }
});

// Display superhero using ID
app.get("/superheroes/:superHeroId", async (req, res) => {
  // res.json({ msg: "Superhero id is " + req.params.superHeroId });
  try {
    const hero = await Hero.findById(req.params.superHeroId);
    res.json(hero);
  } catch (error) {
    console.log(error);
  }
});

// Create new superhero
app.post("/superheroes", async (req, res) => {
  // res.json({ msg: "Creating superhero" });
  try {
    await Hero.create({
      superheroName: req.body.superheroName,
      name: req.body.name,
    });
    res.json({ msg: "Superhero created" });
  } catch (error) {
    console.log(error);
  }
});

// Edit superhero by ID
app.put("/superheroes/:superHeroId", async (req, res) => {
  // res.json({ msg: "Editing " + req.params.superHeroId });
  try {
    await Hero.findByIdAndUpdate(req.params.superHeroId, {
      superheroName: req.body.superheroName,
      name: req.body.name,
    });
    res.json({ msg: "Hero updated" });
  } catch (error) {
    console.log(error);
  }
});

// Delete superhero by ID
app.delete("/superheroes/:superHeroId", async (req, res) => {
  // res.json({ msg: "Deleting " + req.params.superHeroId });
  try {
    await Hero.findByIdAndDelete(req.params.superHeroId);
    res.json({ msg: "Superhero deleted" });
  } catch (err) {
    console.log(err);
  }
});

// Welcome to index
app.get("/", (req, res) => {
  res.json({ msg: "API server is running...", version: 1 });
});

app.listen(3000, console.log("Server started on port 3000"));
