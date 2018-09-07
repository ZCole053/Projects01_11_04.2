/*  Project 01_11_04

    Author: Zedekiah Cole
    Date:   9/7/18

    Filename: script.js
*/

"use strict";

// Global Variables
var httpRequest = false;

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

// this gets the location of the zip
function getLocation(){
    var zip = document.getElementById("zip").value;
    if(!httpRequest){
        httpRequest = getRequestObject();
    }
    httpRequest.abort();
    httpRequest.open("get","http//api.zippopotam.us/us/" + zip, true);
    httpRequest.send(null);
    httpRequest.onreadystatechange = displayData;
}


// event handlers
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false);
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}