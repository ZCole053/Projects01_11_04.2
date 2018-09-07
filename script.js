/*  Project 01_11_04

    Author: Zedekiah Cole
    Date:   9/7/18

    Filename: script.js
*/

"use strict";

// Global Variables
var httpRequest = false;
var countrySel;

// this function checks when the buttons are selected
function checkButtons() {
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    if (germany.checked || us.checked) {
        document.getElementById("zipset").style.visibility = "visible";
        if (germany.checked) {
            countrySel = "de";
        } else {
            countrySel = "us";
        }
    }
}



// this function allows us to contact other servers for data
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        // this is a sort of manual overide
        document.getElementById("zipset").style.visibility = "visible";
        document.getElementById("casset").style.visibility = "visible";
        var germany = document.getElementById("germany");
        var us = document.getElementById("us");
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            germany.removeEventListener("click", checkButtons, false);
            us.removeEventListener("click", checkButtons, false);
            zip.removeEventListener("keyup", checkInput, false);
        } else if (zip.attachEvent) {
            germany.detachEvent("onclick", checkButtons);
            us.detachEvent("onclick", checkButtons);
            zip.detachEvent("onkeyup", checkInput);
        }
        return false;
    }
    return httpRequest;
}

// A function to check user input
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}



// this gets the location of the zip
function getLocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/" + countrySel + "/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}


// this function takes the data and displays it into the Dom
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData.places[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("csset").style.visibility = "visible";
    }
}


// event handlers
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}

var germany = document.getElementById("germany");
var us = document.getElementById("us");
if (us.addEventListener) {
    us.addEventListener("click", checkButtons, false);
    germany.addEventListener("click", checkButtons, false);
} else if (us.attachEvent) {
    us.attachEvent("onclick", checkButtons);
    germany.attachEvent("onclick", checkButtons);
}