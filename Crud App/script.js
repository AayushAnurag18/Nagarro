$("#add_data").submit(function (e){
    e.preventDefault();
    var data=$("#inputData").val();
    if(data==="")return
    $("#inputData").val("")
    $("#new_data").append(
        `<li>${data}<span class="ml-4"><i class="fa-solid fa-trash"></i></span></li>`
    )
})

$("#new_data").on("click", "span", function(e) {
    $(this).closest("li").fadeOut(500, function(e) {
        $(this).remove();
    });
})