document.addEventListener("deviceready", onDeviceReady(), false);

var testVal = document.getElementById("configureSettings")[0].value;
var quizVal = document.getElementById("configureSettings")[1].value;

function onDeviceReady() {
    refreshGrades();
    document.getElementById("newCourseSubmit").onclick = function () {
        createNewCourse();
    };
    document.getElementById("clearAll").onclick = function () {
        window.localStorage.clear();
        refreshGrades();
    };
    document.getElementById("newTestGradeSubmit").onclick = function(){
        submitTestGrade();
    }
    document.getElementById("newQuizGradeSubmit").onclick = function(){
        submitQuizGrade();
    }
    document.getElementById("newGrade").onload = function () {
        refreshCourseNames();
    };


}

function createNewCourse() {
    var addCourse = document.getElementById("addCourse");
    var store = window.localStorage;

    var courseName = addCourse[0].value;
    var period = addCourse[1].value;
    var testAvg = addCourse[2].value;
    var quizAvg = addCourse[3].value;

    store.setItem(period + "CourseName", courseName);
    store.setItem(period + "Period", period);
    store.setItem(period + "TestAvg", testAvg);
    store.setItem(period + "QuizAvg", quizAvg);
    store.setItem(period + "CourseAvg", (Number(testAvg) * (testVal/100)) + (Number(quizAvg) * (quizVal/100)));

    refreshGrades();
}

function refreshGrades() {
    var text;
    for (var i = 0; i < window.localStorage.length - 1; i++) {
        text += "<p class=\"" + window.localStorage.key(i) + "\">" + window.localStorage.getItem(window.localStorage.key(i)) + "</p>";
    }
    document.getElementById("userCourses").innerHTML = text;
}

function refreshCourseNames() {
    var text;
    for (var i = 0; i < window.localStorage.length - 1; i + 4) {
        text += "<option value=\"" + window.localStorage.key(i) + "\">" + window.localStorage.getItem(window.localStorage.key(i)) + "</p>";
    }
    document.getElementById("coursesToUpdate").innerHTML += text;
}

function submitTestGrade(){
    
}

function submitQuizGrade(){
    
}


