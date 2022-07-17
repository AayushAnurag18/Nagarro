function myFunction() {
  var text1 = document.getElementById("inputuser");
  text1.select();
  text1.setSelectionRange(0, 10000);
  console.log(text1);
  navigator.clipboard.writeText(text1.value);
}

$(document).ready(function () {
  $("#btn").click(function () {
    $("#inputuser").select();
    document.execCommand("copy");
  });
});
