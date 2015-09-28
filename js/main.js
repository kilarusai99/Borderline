document.addEventListener("deviceready", onDeviceReady(), false);

var testVal = Number(document.getElementById("testVal").value);
var quizVal = Number(document.getElementById("quizVal").value);
var e = document.getElementById("coursesToUpdate");
var globalStrUser;
var neededGrade;

function onDeviceReady() {
    refreshGrades();
    document.getElementById("newCourseSubmit").onclick = function () {
        createNewCourse();
    };
    document.getElementById("clearAll").onclick = function () {
        clearCourses();
    };
    document.getElementById("newGradeButton").onclick = function () {
        refreshCourseNames();
    };
    document.getElementById("coursesToUpdate").onchange = function () {
        globalStrUser = e.options[e.selectedIndex].text;
    };
    document.getElementById("newTestGradeSubmit").onclick = function () {
        submitTestGrade();
    };
    document.getElementById("newQuizGradeSubmit").onclick = function () {
        submitQuizGrade();
    };
    document.getElementById("back").onclick = function () {
        changeTarget();
    };
    document.getElementById("menuButton").onclick = showDropDown;
}

function createNewCourse() {
    var addCourse = document.getElementById("addCourse");
    var courseName = addCourse[0].value;
    var period = addCourse[1].value;
    var testAvg = addCourse[2].value;
    var numTest = addCourse[3].value;
    var quizAvg = addCourse[4].value;
    var numQuiz = addCourse[5].value;

    window.localStorage.setItem(period + "CourseName", courseName);
    window.localStorage.setItem(period + "Period", period);
    window.localStorage.setItem(period + "TestAvg", testAvg);
    window.localStorage.setItem(period + "NumTest", numTest);
    window.localStorage.setItem(period + "QuizAvg", quizAvg);
    window.localStorage.setItem(period + "NumQuiz", numQuiz);
    window.localStorage.setItem(period + "CourseAvg", testAvg * (testVal / 100.00) + quizAvg * (quizVal / 100.00));
    calculateLowestTestGrade(period);
    calculateLowestQuizGrade(period);

    refreshGrades();
}

function calculateLowestTestGrade(coursePeriod) {
    calculateNeededLetterGrade();

    var testAvg = Number(window.localStorage.getItem(coursePeriod + "TestAvg"));
    var quizAvg = Number(window.localStorage.getItem(coursePeriod + "QuizAvg"));
    var numTest = Number(window.localStorage.getItem(coursePeriod + "NumTest"));
    var targetTestGrade = (((neededGrade - (quizAvg * quizVal / 100)) / (testVal / 100)) * (numTest + 1)) - (testAvg * numTest);
    targetTestGrade = Math.round(targetTestGrade * 100) / 100;
    if (targetTestGrade <= Number(0))
        targetTestGrade = Number(0);
    if (targetTestGrade >= Number(100))
        targetTestGrade = Number(100);
    window.localStorage.setItem(coursePeriod + "TargetTestGrade", targetTestGrade);
}

function calculateLowestQuizGrade(coursePeriod) {
    calculateNeededLetterGrade();

    var testAvg = Number(window.localStorage.getItem(coursePeriod + "TestAvg"));
    var quizAvg = Number(window.localStorage.getItem(coursePeriod + "QuizAvg"));
    var numQuiz = Number(window.localStorage.getItem(coursePeriod + "NumQuiz"));
    var targetQuizGrade = (((neededGrade - (testAvg * testVal / 100)) / (quizVal / 100)) * (numQuiz + 1)) - (quizAvg * numQuiz);

    if (targetQuizGrade <= Number(0))
        targetQuizGrade = Number(0);
    if (targetQuizGrade >= Number(100))
        targetQuizGrade = Number(100);
    window.localStorage.setItem(coursePeriod + "TargetQuizGrade", targetQuizGrade);
}

function calculateNeededLetterGrade() {
    var f = document.getElementById("typeOfGrades");
    if (f.options[f.selectedIndex].value === "plsSelect" || f.options[f.selectedIndex].value === "allA") {
        neededGrade = Number(90);
    }
    else if (f.options[f.selectedIndex].value === "allB") {
        neededGrade = Number(80);

    }
    else if (f.options[f.selectedIndex].value === "allC") {
        neededGrade = Number(70);

    }
}

function refreshGrades() {
    var borderColors = ["#F44336", "#E91E63", "#9C27B0", "#673AB7", "#3F51B5", "#2196F3", "#03A9F4", "#00BCD4", "#009688", "#4CAF50", "#8BC34A", "#CDDC39", "#FFEB3B", "#FFC107", "#FF9800", "#FF5722", "#607D8B"];
    var length = window.localStorage.length / 9;
    text = "";
    var j = 1;
    if (window.localStorage.length < 2) {
        document.getElementById("userCourses").innerHTML =
                "<div class=\"empty\">" +
                "<i class=\"large material-icons\">dashboard</i>" +
                "<p>Once you add a new course, your needed grades will appear here</p>" +
                "</div>";
    } else {
        for (var i = 1; i < length; i += 1) {
            console.log("refreshGrades " + i);

            while (window.localStorage.getItem(j + "CourseName") === null && window.localStorage.length > 0)
                j++;
            if (i % 2 === 1)
                text += "<div class=\"row\">";
            text += "<div class=\"col s12 m6\"><div class=\"waves-effect waves-dark width100 card course\" style=\"border-bottom: 3px solid " + borderColors[Math.floor(Math.random() * 16)] + "\">" +
                    "<span class=\"black-text card-title\"><span class=\"truncate\">" + window.localStorage.getItem(j + "CourseName") + "</span></span>" +
                    "<div class=\"grades\"><p>Test: " + window.localStorage.getItem(j + "TargetTestGrade") + "</p>" +
                    "<p>Quiz: " + window.localStorage.getItem(j + "TargetQuizGrade") + "</p></div>" +
                    "</div></div>";
            if (i % 2 === 1)
                text += "</div>";
            j++;
        }
        document.getElementById("userCourses").innerHTML = text;
    }
}

function clearCourses() {
    if (confirm("Are you sure you want to delete all of your courses?") === true) {
        window.localStorage.clear();
        refreshGrades();
    }
}

function refreshCourseNames() {
    var text = "<option id=\"selectCourse\" selected>Select A Course</option>";
    for (var i = 1; i < window.localStorage.length; i += 9) {
        text += "<option id=\"" + window.localStorage.key(i) + "\">" + window.localStorage.getItem(window.localStorage.key(i)) + "</option>";
    }
    document.getElementById("coursesToUpdate").innerHTML = text;
}

function submitTestGrade() {
    var testAvg;
    var k;
    for (var i = 1; i < window.localStorage.length + 1; i += 9) {
        console.log("i" + i);
        for (var j = 1; j < (window.localStorage.length + 1) / 9; j++) {
            console.log("j" + j);
            if (window.localStorage.getItem(j + "CourseName") === globalStrUser) {
                testAvg = Number(window.localStorage.getItem(j + "TestAvg"));
                k = Number(j);
                break;
            }
        }
    }
    console.log("k" + k);
    gradeInput = Number(document.getElementById("gradeInput").value);
    numTests = Number(window.localStorage.getItem(k + "NumTest")) + 1;
    window.localStorage.setItem(k + "TestAvg", (testAvg * (numTests - 1) + gradeInput) / numTests);
    newTestAvg = window.localStorage.getItem(k + "TestAvg");
    window.localStorage.setItem(k + "NumTest", numTests);
    newNumTests = window.localStorage.getItem(k + "NumTest");
    quizAvg = window.localStorage.getItem(k + "QuizAvg");
    window.localStorage.setItem(k + "CourseAvg", newTestAvg * (testVal / 100.00) + quizAvg * (quizVal / 100.00));

    calculateLowestTestGrade(k);
    calculateLowestQuizGrade(k);

    refreshGrades();
}

function submitQuizGrade() {
    var quizAvg;
    var k;
    for (var i = 1; i < window.localStorage.length + 1; i += 9) {
        for (var j = 1; j < (window.localStorage.length + 1) / 9; j++) {
            if (window.localStorage.getItem(j + "CourseName") === globalStrUser) {
                quizAvg = window.localStorage.getItem(j + "QuizAvg");
                k = j;
                break;
            }
        }
    }

    gradeInput = Number(document.getElementById("gradeInput").value);
    numQuiz = Number(window.localStorage.getItem(k + "NumQuiz")) + 1;
    window.localStorage.setItem(k + "QuizAvg", (quizAvg * (numQuiz - 1) + gradeInput) / numQuiz);
    newQuizAvg = window.localStorage.getItem(k + "QuizAvg");
    window.localStorage.setItem(k + "NumQuiz", numQuiz);
    newNumQuiz = window.localStorage.getItem(k + "NumQuiz");
    testAvg = window.localStorage.getItem(k + "TestAvg");
    window.localStorage.setItem(k + "CourseAvg", testAvg * (testVal / 100.00) + newQuizAvg * (quizVal / 100.00));

    calculateLowestTestGrade(k);
    calculateLowestQuizGrade(k);


    refreshGrades();
}
function showDropDown(e) {
    document.getElementById('menuButton').onclick = function () {
    };
    if (e.stopPropagation)
        e.stopPropagation();   // W3C model
    else
        e.cancelBubble = true; // IE model

    document.getElementById("menuMenu").style.display = "block";
    document.onclick = function (e) {
        var ele = document.elementFromPoint(e.clientX, e.clientY);
        if (ele == document.getElementById("menuButton")) {
            hideDropDown();
            return;
        }
        do {
            if (ele == document.getElementById("menuMenu"))
                return;
        } while (ele = ele.parentNode);
        hideDropDown();
    };
}

function hideDropDown() {
    document.onclick = function () {
    };
    document.getElementById("menuMenu").style.display = "none";
    document.getElementById('menuButton').onclick = showDropDown;
}

function changeTarget() {
    var counter = 0;
    if (counter > 0) {
        document.getElementById("configureSettings").submit(function () {
            return false;
        });
        counter++;
    }
    for (var i = 1; i < window.localStorage.length / 9; i++) {
        calculateLowestTestGrade(Number(i));
        calculateLowestQuizGrade(Number(i));
    }
    refreshGrades();
}
