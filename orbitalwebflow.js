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
