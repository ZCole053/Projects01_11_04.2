/*  Project 01_11_04

    Author: Zedekiah Cole
    Date:   9/7/18

    Filename: script.js
*/

"use strict";

// Global Variables
var httpRequest = false;
var countrySel;

// this function allows us to contact other servers for data
function getRequestObject(){
    try{
        httpRequest = new XMLHttpRequest();
    }
    catch(requestError){
        // this is a sort of manual overide
        document.getElementById("casset").style.visibility = "visible";
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            zip.removeEventListener("keyup", checkInput, false);
        } else if (zip.attachEvent) {
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

// this function checks when the buttons are selected
function checkButtons(){

}

// this gets the location of the zip
function getLocation(){
    var zip = document.getElementById("zip").value;
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get","http://api.zippopotam.us/us/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}


// this function takes the data and displays it into the Dom
function displayData(){
    if(httpRequest.readyState === 4 && httpRequest.status ===200){
        var resultData = JSON.parse(httpRequest.responseText);
        var city = document.getElementById("city");
        var state = document.getElementById("state");
        city.value = resultData.places[0]["place name"];
        state.value = resultData[0]["state abbreviation"];
        document.getElementById("zip").blur();
        document.getElementById("casset").style.visibility = "visible";
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
    us.addEventListener("keyup", checkButtons, false);
    germany.addEventListener("keyup", checkButtons, false);
} else if (us.attachEvent) {
    us.attachEvent("onkeyup", checkButtons);
    germany.attachEvent("onkeyup", checkButtons);
}