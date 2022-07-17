const express = require("express");
const personRouter = express.Router();

//Import our model
const Person = require("../models/Person");


//Create and Save a Record of our Model using ".save()"
personRouter.post("/addOnePerson", async (req, res) => {
  try {
          let person = new Person(req.body);
          let result= await person.save();
          res.send({person: result , msg: "person is added"});
      }
      catch (error) {console.log(error);}
});

//Array of people for model.create
const arrayOfPeople = [
  {
    name: "Amel",
    age: 29,
    favoriteFoods: ["food1", "apple", "burritos" ],
  },
  {
    name: "Lamis",
    age: 27,
    favoriteFoods: ["food1", "pasta", "burritos"],
  },
  { name: "Sami", age: 30, favoriteFoods: ["koskssi", "Pizza", "burritos"] },
  { name: "Chayma", age: 22, favoriteFoods: ["koskssi", "fruits", "burritos"] },
];

//Create Many Records with ".create()"
personRouter.get("/addManyPeople", function (req, res) {
    Person.create(arrayOfPeople)
      .then((result) => res.send(result))
      .catch((err) => console.log(err));
  });
//Display all the documents
personRouter.get("/all", async (req, res) => {
  Person.find()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Display the documents containing people with a specified name
personRouter.get("/person/:name",async (req, res) => {
  Person.find({ name: req.params.name })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Find just one person which has a certain food in the person's favorites, using Model.findOne()
//Use the function argument food as a search key.
personRouter.get("/foods/:food", async (req, res) => {
  const food = req.params.food;
  /*one document where "favoriteFoods" is an array that contains 
    the string with the specified food as one of its elements:*/
  Person.findOne({ favoriteFoods: food })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Find the (only!!) person having a given _id, using Model.findById()
//Use the function argument personId as the search key.
personRouter.get("/person/id/:id", async(req, res) => {
  const personId = req.params.id;
  //exemple d'id: 60cddd1001a8232a9055e711
  Person.findById({ _id: personId })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});

//Perform Classic Updates by Running Find, Edit, then Save
//personId2: 60cddd1001a8232a9055e711
personRouter.get("/addfoods", function (req, res)  {
  res.send("Perform Classic Updates by Running Find, Edit, then Save");
  const personId2 = "60cddd1001a8232a9055e711";
  Person.findById({ _id: personId2 })
    .then((result) => {
      result.favoriteFoods.push("hamburger");
      result.save();
      res.send(result);
    })
    .catch((err) => console.log(err));
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
/*Find a person by Name and set the person's age to 20. Use the function parameter personName as a search key.
Note: You should return the updated document. 
To do that you need to pass the options document { new: true } 
as the 3rd argument to findOneAndUpdate(). 
By default, these methods return the unmodified object. */
personRouter.get("/updates", function (req, res) {
  const personName = { name: "Amel" };
  const update = { age: 20 };
  //If you use Model.findOneAndUpdate(), by default you'll see one of the below deprecation warnings.
  mongoose.set("useFindAndModify", false);
  Person.findOneAndUpdate(personName, update, { new: true })
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Delete One Document Using model.findByIdAndRemove
//[{"_id":"60ce4e514544661a9c8fd076","name":"nadadelete"}]
personRouter.get("/remove", function (req, res) {
  const perId = "60ce4e514544661a9c8fd076";
  Person.findByIdAndRemove(perId)
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Delete Many Documents with model.remove()
/* Don’t forget to pass it to the done() callback, since we use it in tests.*/
personRouter.get("/remove/:name", function (req, res) {
  Person.find({ name: req.params.name })
    .remove()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//Chain Search Query Helpers to Narrow Search Results:
personRouter.get("/foods-burritos", function (req, res) {
  Person.find({ favoriteFoods: "burritos" }) // Find people who like burritos
    .limit(2) // limit to 2 items
    .sort({ name: 1 }) // sort ascending by firstName
    .select({ name: true, favoriteFoods: true }) // hide their age //select name and favoriteFood
    .exec() // execute the query
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
});
//home page
personRouter.get("/", function (req, res) {
  res.send("Hello World");
});

module.exports=personRouter;

