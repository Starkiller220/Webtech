$(function(){ 
    var table = $("#table");
    var dropdown = $("#manufacturer");
    $("#editCars").hide();
    $("#cancelEdit").hide();

    get(table);
    
    $("#addCars").on("click",function(){
        var carData = JSON.stringify({
            
            "name":$("#name").val(),
            "consumption":$("#consumption").val(),
            "color":$("#color").val(),
            "manufacturer":$("#manufacturer").val(),
            "avaiable":$("#available").val(),
            "year":$("#year").val(),
            "horsepower":$("#hp").val()

        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/cars",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:carData,
            contentType:"application/json",
            success: function(data)
            {
                $("#content").load("cars.html");
            },
            error: function(){
                alert("error aloading database");
            }
        })
    });

    $("#editCars").on("click",function(){

        var row = $('[dataID='+$(this).attr("dataID")+"][id='edit']");

        del(row);

        var carData = JSON.stringify({
            
            "name":$("#name").val(),
            "consumption":$("#consumption").val(),
            "color":$("#color").val(),
            "manufacturer":$("#manufacturer").val(),
            "avaiable":$("#available").val(),
            "year":$("#year").val(),
            "horsepower":$("#hp").val()

        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/cars",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:carData,
            contentType:"application/json",
            success: function(data)
            {
                $("#content").load("cars.html");
            },
            error: function(){
                alert("error aloading database");
            }
        })
    });
    
    $("#cancelEdit").on("click",function(){
        $("#editCars").hide();
        $("#cancelEdit").hide();
        $("#addCars").show();

        $("#name").val("")
        $("#consumption").val(""),
        $("#color").val(""),
        $("#manufacturer").val(""),
        $("#available").val(""),
        $("#year").val(""),
        $("#hp").val("")
    });

    table.on("click","#close",function(){
        
        del($(this));
    });

    table.on("click","#edit",function(){
        $("#addCars").hide();
        $("#editCars").show();
        $("#cancelEdit").show();
        $("#editCars").attr("dataID",$(this).attr("dataid"));


        $("#name").val($(this).parent().children()[0].outerText);
        $("#consumption").val($(this).parent().children()[1].outerText);
        $("#color").val($(this).parent().children()[2].outerText);
        $("#manufacturer").val($(this).parent().children()[3].outerText);
        $("#available").val($(this).parent().children()[4].outerText);
        $("#year").val($(this).parent().children()[5].outerText);
        $("#hp").val($(this).parent().children()[6].outerText);
    });




    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",

        success: function(data){
            var manu = [];

            for (var i in data)
            {
                if(!manu.includes(data[i].name))
                {
                    manu.push(data[i].name)
                    dropdown.append("<option>"+ data[i].name+"</option>")
                }
            }
        },
        error: function(){
            alert("Server is offline!")
        }
    });

});



function get(table)
{
    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/cars",
        success: function(data){
            
            for(var i in data){
                table.append("<tr><td>" + data[i].name +
                            "</td><td>" + data[i].consumption +
                            "</td><td>" + data[i].color + 
                            "</td><td>" + data[i].manufacturer + 
                            "</td><td>" + (data[i].available==undefined ? data[i].avaiable : data[i].available) +
                            "</td><td>" + data[i].year +
                            "</td><td>" + data[i].horsepower +
                            "</td><td id='edit' dataID='" + data[i]._id +"'>Edit" + 
                            "</td><td id='close' dataID='"+ data[i]._id+"'> X" +
                            "</td></tr>");
                                       
            }
                      
        },
        error: function(){
            alert("error loading database");
        }
    });
}

function del(row)
{
    row.parent().remove()
        
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/cars/"+row.attr("dataid"),
            success:function () {
                
                },
            error:function(){
                console.log("Can't delete :(")
            }
          });
}