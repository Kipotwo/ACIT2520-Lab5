/*
 Authors:
 Aron Yang a01231482
 Your Partner's Name and student #: N/A
 (Make sure you also specify on the Google Doc)
*/
const express = require("express");
const fs = require("fs")

let caps = (listOfMovies) => {
  for (let i in listOfMovies){
    listOfMovies[i] = listOfMovies[i][0].toUpperCase() + listOfMovies[i].slice(1)
  }
  return listOfMovies
}

let app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");


app.get("/", (req, res) => res.render("pages/index"));

app.get("/myForm", (req, res) => res.render("pages/myForm"));

app.post("/myForm", (req, res) => {
  // Get data
  let formData = req.body
  // split the data by commas
  let formList = formData.movies.split(",");
  // Capitalize the first letter of everything in the list
  formList = caps(formList);
  // Render index.ejs using the list
  res.render("pages/index", {movies: formList});
});

app.get("/myListQueryString", (req, res) => {
  let movieList = []
  // Store first search query into empty list
  movieList.push(req.query.movie1);
  // Store second search query into empty list
  movieList.push(req.query.movie2);
  // Capitalize the first letter of everything in the list
  movieList = caps(movieList);
  // Render index.ejs using list
  res.render("pages/index", {movies: movieList})
});

app.get("/search/:movieName", (req, res) => {
  // Gets search parameter
  let movieName = req.params.movieName
  // Capitalizes the first letter
  movieName = movieName[0].toUpperCase() + movieName.slice(1)
  // Reads movieDescriptions.txt
  fs.readFile("movieDescriptions.txt", (err, data) => {
    if (err){
      console.log(err);
    }
    else{
      // Turns data to string, then lists each line
      let movieDesc = data.toString().split("\n")
      let movieDescList = []
      // For every item in movieDesc
      for (let i in movieDesc){
        // Split the data in two
        pair = movieDesc[i].split(":");
        // If the movie name matches with the split data
        if (movieName === pair[0]){
          // Store data into the empty list
          movieDescList.push(pair[0])
          movieDescList.push(pair[1])
        }
      }
      // Render webpage using empty list
      res.render("pages/searchResult", {movie: movieDescList});
    }
  })
});

app.listen(3000, () => {
  console.log("Server is running on port 3000 🚀");
});