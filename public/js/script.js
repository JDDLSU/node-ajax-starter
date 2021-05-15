$(document).ready(function()
{
    function addStudentDiv(student, parentDiv)
    {
        var rowDiv = document.createElement("div");
            var imgCol = document.createElement("div");
            var nameCol = document.createElement("div");

            var img = document.createElement("img");
            var nameHeading = document.createElement("h4");
            var idnum = document.createElement("p");

            $(rowDiv).addClass("row student");
            $(imgCol).addClass("col-sm-2 center");
            $(nameCol).addClass("col-sm-10");

            $(img).attr("src", student.img);
            $(nameHeading).text(student.name);
            $(idnum).text(student.id);

            imgCol.append(img);

            nameCol.append(nameHeading);
            nameCol.append(idnum);

            rowDiv.append(imgCol);
            rowDiv.append(nameCol);

            parentDiv.append(rowDiv);
    }

    $.get("getStudents", function(data, status)
    {
        var studentListContainer = $("#studentList");

        data.forEach((item, i) => 
        {
            addStudentDiv(item, studentListContainer);

        });
    });

    $("#addStudent").click(function()
    {
       var name = $("#name").val();
       var idnum = $("#idnum").val();
       var gender = $("input[name='gender']:checked").val();
       
       console.log(name, idnum, gender);

        var newStudent = 
        {
            name: name,
            id: idnum,
            gender: gender
        }

       $.post("/addStudent", newStudent, function(data, status)
       {
           var studentListContainer = $("#studentList");
           addStudentDiv(data,  studentListContainer);
           console.log(data);
       });
    });
});