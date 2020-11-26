$(function(){ //Ready 

    $("#content").load("cars.html");

    $("#cars").on("click",function(event){
        event.preventDefault();
        $("#content").load("cars.html");
    });
    $("#manufact").on("click",function(event){
        event.preventDefault();
        $("#content").load("manufacturers.html");
    });
});