$(function(){
    var table = $("#table");
    $("#editManu").hide();
    $("#cancelEdit").hide();

    $.ajax({
        type:"GET",
        url: "https://webtechcars.herokuapp.com/api/manufacturers",
        success: function(data){
            
            for(var i in data){
                table.append("<tr><td>" + data[i].name +
                            "</td><td>" + data[i].country +
                            "</td><td>" + data[i].founded + 
                            "</td><td id='edit' dataID='" + data[i]._id +"'>Edit" + 
                            "</td><td id='close' dataID='"+ data[i]._id+"'> X" +
                            "</td></tr>");
            }
        },
        error: function(){
            alert("error loading database");
        }
    });



    $("#addManufact").on("click",function(){
        
        addManu()
    });


    $("#cancelEdit").on("click",function(){
        $("#editManu").hide();
        $("#cancelEdit").hide();
        $("#addManufact").show();

        $("#manuName").val(""),
        $("#country").val(""),
        $("#founded").val("")

    });

    $("#editManu").on("click",function(){

        var row = $('[dataID='+$(this).attr("dataID")+"][id='edit']");

        delManu(row);
        addManu();
    });

    table.on("click","#close",function(){
        
        delManu($(this));
       
    });

    table.on("click","#edit",function(){
        $("#addManufact").hide();
        $("#editManu").show();
        $("#cancelEdit").show();
        $("#editManu").attr("dataID",$(this).attr("dataid"));


        $("#manuName").val($(this).parent().children()[0].outerText);
        $("#country").val($(this).parent().children()[1].outerText);
        var fdate = new Date($(this).parent().children()[2].outerText);
        var month = fdate.getMonth()+1 < 10? "0"+ (fdate.getMonth()+1) : fdate.getMonth()+1;
        var day = fdate.getDate() < 10? "0"+ fdate.getDate() : fdate.getDate();

        $("#founded").val(fdate.getFullYear()+"-"+ month +"-"+day);

    });


    function addManu(){
        var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var fDate = new Date($("#founded").val());
        var manuData = JSON.stringify({
                       
            "name":$("#manuName").val(),
            "country":$("#country").val(),
            "founded":month[fDate.getMonth()] + " " + fDate.getDate() + ", " + fDate.getFullYear()

        });

        $.ajax({
            type:"POST",
            url: "https://webtechcars.herokuapp.com/api/manufacturers",
            headers: {
                "Access-Control-Allow-Origin": "*"
            },
            data:manuData,
            contentType:"application/json",

            success: function(){
                
                $("#content").load("manufacturers.html"); //Refresh

            }
        });
    }

    function delManu(row){
        row.parent().remove()
        $.ajax({
            type:"DELETE",
            url:"https://webtechcars.herokuapp.com/api/manufacturers/"+row.attr("dataid"),
            success:function () {
                },
            error:function(){
                console.log("Can't delete :(")
            }
          });
    }
});