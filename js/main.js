document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    document.getElementById("newCourseSubmit").onclick = function() {
        newCourse();
    };
}

function newCourse() {
    var addCourse = document.getElementById("addCourse");
    var courseName = addCourse[0].value;
    var period = addCourse[1].value;
    var testAvg = addCourse[2].value;
    var quizAvg = addCourse[3].value;
    
    window.localStorage.setItem(period + "CourseName", courseName);
    window.localStorage.setItem(period + "Period", period);
    window.localStorage.setItem(period + "TestAvg", testAvg);
    window.localStorage.setItem(period + "QuizAvg", quizAvg);
    
    document.getElementById("allCourses").innerHTML = "<p>" + window.localStorage.getItem("1CourseName") + "</p>";
}

