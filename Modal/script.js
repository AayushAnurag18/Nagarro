$(document).ready(function () {
  $(".clicks").on("click", function () {
    $("#box").addClass("show");
  });

  $(".submission").on("click", function () {
    $("#box").removeClass("show");
  });
});
