const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/communalDB"
);

const socialSeed = [
  {
    name: "Devils Punchbowl",
    categories: "hiking",
    location: "San Diego area. Can be found via Eagle Peak Road",
    img: "https://static.rootsrated.com/image/upload/s--D4Q1u8Lk--/t_rr_large_traditional/ajbtz3udecznztn7nhfq.jpg",
    date: new Date(Date.now())
  },
  {
    name: "Learn to Homebrew",
    categories: "hobbies, homebrewing",
    location: "The Homebrewer on El Cajon Blvd",
    img: "https://www.westcoastbrewer.com/wp-content/uploads/2018/01/IMG_20180121_111703-768x550.jpg",
    date: new Date(Date.now())
  },
  {
    name: "Learn Woodworking",
    categories: "hobbies, craftmanship",
    location: "San Diego, San Diego Fine Woodworkers Association",
    img: "https://www.pcc.edu/community/wp-content/uploads/sites/36/2019/04/GettyImages-510385414-768x511.jpg",
    date: new Date(Date.now())
  },
  {
    name: "Learn to Cook",
    categories: "hobbies",
    location: "Various locations in San Diego",
    image: "https://cdn-image.myrecipes.com/sites/default/files/styles/4_3_horizontal_-_1200x900/public/1550776692/GettyImages-887636042.jpg?itok=xrvft3cr",
    date: new Date(Date.now())
  },
  {
    name: "Rock Climbing",
    categories: "outdoors, sports",
    location: "San Diego County, Mission Gorge, Mt Woodson",
    img: "https://outdoorgearlab-mvnab3pwrvp3t0.stackpathdns.com/photos/15/81/279616_31645_L2.jpg",
    date: new Date(Date.now())
  },
  {
    name: "Find a Soccor Club",
    categories: "sports",
    location: "San Diego County",
    img: "https://www.snopes.com/tachyon/2016/12/shutterstock_426279466.jpg?resize=865,452&quality=65",
    date: new Date(Date.now())
  },
  {
    name: "Professional Rubgy Game",
    categories: "events",
    location: "Torero Stadium",
    img: "https://sandiegosportsdomination.files.wordpress.com/2019/04/065a1472.jpg?w=620&h=264&crop=1&zoom=2",
    date: new Date(Date.now())
  },
  {
    name: "Speakeasys",
    categories: "social, nightlife",
    location: "Raise by Wolves and other locations",
    img: "https://www.sandiegomagazine.com/images/cache/cache_5/cache_0/cache_d/raised-by-wolves-westfield-utc-1294cd05.jpeg?ver=1538771320&aspectratio=1.4971428571429",
    date: new Date(Date.now())
  }
];

db.socialDb
  .remove({})
  .then(() => db.socialDb.collection.insertMany(socialSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
