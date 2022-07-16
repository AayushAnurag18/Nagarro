$("#add_data").submit(function (e){
    e.preventDefault();
    var data=$("#inputData").val();
    if(data==="")return
    $("#inputData").val("")
    $("#new_data").append(
        `<li><p class="flex justify-between items-center gap-3 font-semibold text-lg"><span>${data}</span><i class="fa-solid fa-trash"></i></p></li>`
    )
})

$("#new_data").on("click", "span", function(e) {
    $(this).closest("li").fadeOut(500, function(e) {
        $(this).remove();
    });
})