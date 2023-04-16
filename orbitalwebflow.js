// Mouse entering three menu items top middle
$(".navbartext").on("mouseenter", function () {
  //If the navbar is white, set a flag to remember this
  var navbarwhite = true;
  $(".nav-menu").removeClass("shown");
  $(".fixed-background-mouse-catcher").addClass("shown");
  $(".drop-down-background").addClass("shown");
  $(".style-navbar-symbol").addClass("green");
  var index = $(this).index();
  $(".mega-menu-links").removeClass("shown");
  $(".mega-menu-links").eq(index).addClass("shown");
  $(".navbartext").removeClass("active");
  $(".navbartext").eq(index).addClass("active");
});

var navmenuopen = false;
console.log(navmenuopen);
// Mouse click hamburger icon to open nav menu
$(".hamburger-close-button").on("click", function () {
  if (navmenuopen) {
    $(".drop-down-background").removeClass("shown");
    $(".style-navbar-symbol").removeClass("green");
    $(".fixed-background-mouse-catcher").removeClass("shown");
    $(".nav-menu").removeClass("shown");
    $(".navbartext").removeClass("active");
    $(".hamburger").addClass("shown");
    $(".close").removeClass("shown");
    navmenuopen = false;
  } else {
    $(".drop-down-background").removeClass("shown");
    $(".navbartext").removeClass("active");
    $(".fixed-background-mouse-catcher").addClass("shown");
    $(".nav-menu").addClass("shown");
    $(".hamburger").removeClass("shown");
    $(".close").addClass("shown");

    // Check if the device has a small screen width
    if ($(window).width() < 992) {
      $(".style-navbar-symbol").addClass("green");
    }

    navmenuopen = true;
  }
});

// Mouse entering big modal background to close all menus
$(".fixed-background-mouse-catcher").on("mouseenter", function () {
  $(".drop-down-background").removeClass("shown");
  $(".style-navbar-symbol").removeClass("green");
  $(".fixed-background-mouse-catcher").removeClass("shown");
  $(".nav-menu").removeClass("shown");
  $(".navbartext").removeClass("active");
  $(".hamburger").addClass("shown");
  $(".close").removeClass("shown");
});

$(".hamburger").on("click", function () {
  $(".drop-down-background").removeClass("shown");
  $(".style-navbar-symbol").removeClass("green");
  $(".fixed-background-mouse-catcher").removeClass("shown");
  $(".nav-menu").removeClass("shown");
  $(".navbartext").removeClass("active");
  $(".hamburger").addClass("shown");
  $(".close").removeClass("shown");
});

$(".wg-selector").on("click", function () {
  console.log("clicked");
  $(".wg-selector").removeClass("chosen");
  $(".wg-selector").children(".checkmark").removeClass("chosen");
  $(this).addClass("chosen");
  $(this).children(".checkmark").addClass("chosen");
});

ScrollTrigger.create({
  trigger: ".hero",
  start: "bottom 50%",
  endTrigger: ".footer",

  onUpdate: (self) => {
    if (self.direction === -1) {
      $(".style-navbar-symbol").removeClass("hiddenup");
      console.log("removehiddenup");
    } else {
      $(".style-navbar-symbol").addClass("hiddenup");
      console.log("addhiddenup");
    }
  },
});

ScrollTrigger.create({
  start: "bottom 50%",
  trigger: ".hero",
  endTrigger: ".footer",

  onUpdate: (self) => {
    $(".style-navbar-symbol").addClass("white");
  },
});

var classes = $(".style-navbar-symbol").attr("class").split(" ");
var lastClass = classes[classes.length - 1];

if (lastClass !== "white") {
  ScrollTrigger.create({
    start: "bottom 60%",
    trigger: ".hero",
    endTrigger: ".footer",

    onUpdate: (self) => {
      $(".style-navbar-symbol").removeClass("white");
    },
  });
}

//////////////////////////////////////// BACKUP ////////////////////////////////////////

// Mouse entering three menu items top middle
$(".navbartext").on("mouseenter", function () {
  //If the navbar is white, set a flag to remember this
  var navbarwhite = true;
  $(".nav-menu").removeClass("shown");
  $(".fixed-background-mouse-catcher").addClass("shown");
  $(".drop-down-background").addClass("shown");
  $(".style-navbar-symbol").addClass("green");
  var index = $(this).index();
  $(".mega-menu-links").removeClass("shown");
  $(".mega-menu-links").eq(index).addClass("shown");
  $(".navbartext").removeClass("active");
  $(".navbartext").eq(index).addClass("active");
});

var navmenuopen = false;
console.log(navmenuopen);
// Mouse click hamburger icon to open nav menu
$(".hamburger-close-button").on("click", function () {
  if (navmenuopen) {
    console.log(navmenuopen);
    $(".drop-down-background").removeClass("shown");
    $(".style-navbar-symbol").removeClass("green");
    $(".fixed-background-mouse-catcher").removeClass("shown");
    $(".nav-menu").removeClass("shown");
    $(".navbartext").removeClass("active");
    $(".hamburger").addClass("shown");
    $(".close").removeClass("shown");
    navmenuopen = false;
  } else {
    console.log(navmenuopen);
    $(".drop-down-background").removeClass("shown");
    $(".style-navbar-symbol").removeClass("green");
    $(".navbartext").removeClass("active");
    $(".fixed-background-mouse-catcher").addClass("shown");
    $(".nav-menu").addClass("shown");
    $(".hamburger").removeClass("shown");
    $(".close").addClass("shown");
    navmenuopen = true;
  }
});

// Mouse entering big modal background to close all menus
$(".fixed-background-mouse-catcher").on("mouseenter", function () {
  $(".drop-down-background").removeClass("shown");
  $(".style-navbar-symbol").removeClass("green");
  $(".fixed-background-mouse-catcher").removeClass("shown");
  $(".nav-menu").removeClass("shown");
  $(".navbartext").removeClass("active");
  $(".hamburger").addClass("shown");
  $(".close").removeClass("shown");
});

$(".hamburger").on("click", function () {
  $(".drop-down-background").removeClass("shown");
  $(".style-navbar-symbol").removeClass("green");
  $(".fixed-background-mouse-catcher").removeClass("shown");
  $(".nav-menu").removeClass("shown");
  $(".navbartext").removeClass("active");
  $(".hamburger").addClass("shown");
  $(".close").removeClass("shown");
});

$(".wg-selector").on("click", function () {
  console.log("clicked");
  $(".wg-selector").removeClass("chosen");
  $(".wg-selector").children(".checkmark").removeClass("chosen");
  $(this).addClass("chosen");
  $(this).children(".checkmark").addClass("chosen");
});

ScrollTrigger.create({
  trigger: ".hero",
  start: "bottom 30%",
  endTrigger: ".footer",

  // markers: {
  //   startColor: "#ff0000",
  //   endColor: "#ff0000",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  //   indent: 100,
  // },

  onUpdate: (self) => {
    if (self.direction === -1) {
      $(".style-navbar-symbol").removeClass("hiddenup");
      console.log("remove hiddenup");
    } else {
      $(".style-navbar-symbol").addClass("hiddenup");
      console.log("add hiddenup");
    }
  },
});

ScrollTrigger.create({
  start: "bottom 30%",
  trigger: ".hero",
  endTrigger: ".footer",
  // markers: {
  //   startColor: "#00ff00",
  //   endColor: "#00ff00",
  //   fontSize: "20px",
  //   fontWeight: "bold",
  //   indent: 200,
  // },
  onUpdate: (self) => {
    $(".style-navbar-symbol").addClass("white");
  },
});

var classes = $(".style-navbar-symbol").attr("class").split(" ");
var lastClass = classes[classes.length - 1];

if (lastClass !== "white") {
  ScrollTrigger.create({
    start: "bottom 40%",
    trigger: ".hero",
    endTrigger: ".footer",
    // markers: {
    //   startColor: "#FFFF00",
    //   endColor: "#FFFF00",
    //   fontSize: "20px",
    //   fontWeight: "bold",
    //   indent: 300,
    // },
    onUpdate: (self) => {
      $(".style-navbar-symbol").removeClass("white");
    },
  });
}

//<script type="text/javascript" src="http://localhost:3000/orbitalwebflow.js"></script>
