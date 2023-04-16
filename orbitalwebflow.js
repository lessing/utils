$(document).ready(function () {
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

  // Mouse click close icon to close nav menu
  $(".close-icon").on("click", function () {
    $(".drop-down-background").removeClass("shown");
    $(".fixed-background-mouse-catcher").removeClass("shown");
    $(".nav-menu").removeClass("shown");
    $(".nav-menu-panes").removeClass("scrolled");
    $(".mobile-mega-menu-links").removeClass("shown");
    $(".navbartext").removeClass("active");
  });

  // Nav menu drill down in mobile
  $(".hamburger-menu-drilldown-wrapper").on("click", function () {
    $(".nav-menu-panes").addClass("scrolled");
    var index = $(this).index();
    console.log(index);
    $(".mobile-mega-menu-links").removeClass("shown");
    $(".mobile-mega-menu-links").eq(index).addClass("shown");
  });

  // Mouse entering big modal background to close all menus
  $(".fixed-background-mouse-catcher").on("mouseenter", function () {
    $(".drop-down-background").removeClass("shown");
    $(".fixed-background-mouse-catcher").removeClass("shown");
    $(".nav-menu").removeClass("shown");
    $(".nav-menu-panes").removeClass("scrolled");
    $(".navbartext").removeClass("active");
  });

  // Weglot
  $(".wg-selector").on("click", function () {
    console.log("clicked");
    $(".wg-selector").removeClass("chosen");
    $(".wg-selector").children(".checkmark").removeClass("chosen");
    $(this).addClass("chosen");
    $(this).children(".checkmark").addClass("chosen");
  });

  // GSAP
  ScrollTrigger.create({
    trigger: ".hero",
    start: "bottom 50%",
    endTrigger: ".footergreen",

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
    endTrigger: ".footergreen",

    onUpdate: (self) => {
      $(".style-navbar-symbol").addClass("white");
    },
  });

  var classes = $(".style-navbar-symbol").attr("class").split(" ");
  var lastClass = classes[classes.length - 1];

  if (lastClass !== "white") {
    ScrollTrigger.create({
      start: "middle 80%",
      trigger: ".hero",
      endTrigger: ".footergreen",

      onUpdate: (self) => {
        $(".style-navbar-symbol").removeClass("white");
      },
    });
  }

  // Mouse click hamburger icon to open nav menu
  $(".test").on("click touchstart", function () {
    $(".drop-down-background").removeClass("shown");
    $(".navbartext").removeClass("active");
    $(".fixed-background-mouse-catcher").addClass("shown");
    $(".nav-menu").addClass("shown");
  });
});
