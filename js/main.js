document.addEventListener("deviceready", onDeviceReady(), false);

function onDeviceReady() {
    console.log("Entering innerHTML function");
    document.getElementById("userCourses").innerHTML = "Hello";
    console.log("Exiting innerHTML function");
}
