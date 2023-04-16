// const showAnim = gsap
//   .fromTo(
//     ".navbar",
//     {
//       yPercent: -100,
//     },
//     {
//       yPercent: 0,
//       duration: 0.1,
//     }
//   )
//   .progress(1);

ScrollTrigger.create({
  trigger: ".home_dial_section",
  start: "top center",
  markers: true,
  end: 99999,
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

// const whiteAnim = gsap
//   .fromTo(
//     ".style-navbar-symbol",
//     {
//       background: "white",
//       color: "black",
//     },
//     {
//       background: "transparent",
//       color: "white",
//       duration: 0.1,
//     }
//   )
//   .progress(1);

// ScrollTrigger.create({
//   start: "200px top",
//   end: 99999,
//   onUpdate: (self) => {
//     $(".style-navbar-symbol").addClass("white");
//   },
// });

// ScrollTrigger.create({
//   start: "top 200px",
//   end: 99999,
//   onUpdate: (self) => {
//     $(".style-navbar-symbol").removeClass("white");
//   },
// });
