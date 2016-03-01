'use strict';
var idArr = ["MobileNumber", "Name", "DOB", "Gender", "EducationQualification", "NameOfInstitution", "WorkExperience", "PermanentAddress"
	, "ResidentialAddress", "SecondaryMobile", "EmailID", "RelationshipStatus", "Hobbies", "FathersDetails", "MothersDetails", "ParentsMaritialStatus"
	, "TotalMember", "FamilyIncome", "FamilyHistory", "ChildhoodBehavior", "WhyYouNeedCounseling", "WhatYouExpectFromCounselor", "IssuesBotherYou"];

function getHtmlElements() {
    var itemArr = document.getElementsByName("inputFields");
    var ansArr = {};
    if (itemArr.length != idArr.length) {
        console.log(itemArr.length);
        console.log(idArr.length);
        console.log("Length of idArr and ItemArr is mismatch");
        return;
    }
    for (var i = 0, iL = itemArr.length; i < iL; i++) {
        ansArr[itemArr[i].id]=itemArr[i].value;
    }
    return ansArr;
}

function checkboxValue() {
    var event = {};
    event.selected = "";
    var chbox;
    var i;
    for (i = 1; i < 18; i++) {
        chbox = document.getElementById("issue" + i);
        if (chbox.checked === true) {
            event["issue" + i] = chbox.value;
            event.selected = event.selected + "issue" + i +" ";
        }
    }
    event.selected = event.selected.trim();
    return event;
}

function pushToFirebase(){
    var answers = getHtmlElements();
    answers["IssuesBotherYou"]=checkboxValue();
    console.log(answers);
    
}