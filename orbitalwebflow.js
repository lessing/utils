$(".navbartext").on("mouseenter", function () {
  $(".drop-down-background").addClass("shown");
  //$(".style-navbar-symbol").addClass("green");
  $(".make-navbar-green").click();

  var index = $(this).index();
  $(".mega-menu-links").removeClass("shown");
  $(".mega-menu-links").eq(index).addClass("shown");
});

$(".fixed-background-mouse-catcher").on("mouseenter", function () {
  console.log("fisk");
  $(".drop-down-background").removeClass("shown");
  //$(".style-navbar-symbol").removeClass("green");
  $(".make-navbar-transparent").click();
});
//
//
//
$(".hamburger-close-button").on("click", function () {
  $(".close-nav-menu-overlay").addClass("shown");
  console.log("hamburger clicked");
  $(".nav-menu").addClass("shown");
  $(".hamburger").removeClass("shown");
  $(".close").addClass("shown");
});

$(".close-nav-menu-overlay").on("click", function () {
  $(".close-nav-menu-overlay").removeClass("shown");
  $(".nav-menu").removeClass("shown");
  $(".hamburger").addClass("shown");
  $(".close").removeClass("shown");
});
