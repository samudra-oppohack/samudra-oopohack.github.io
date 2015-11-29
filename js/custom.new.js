var idArr = ["MobileNumber", "Name", "DOB", "Gender", "EducationQualification", "NameOfInstitution", "WorkExperience",  "PermanentAddress",
	"ResidentialAddress", "EmailID", "SecondaryMobile", "RelationshipStatus", "Hobbies", "FathersDetails", "MothersDetails", "ParentsMaritialStatus",
	"TotalMember", "FamilyIncome", "FamilyHistory", "ChildhoodBehavior", "WhyYouNeedCounseling", "WhatYouExpectFromCounselor", "IssuesBotherYou"];
Parse.initialize("GV7qkwQ7ITIa75MF1P0JxcsKu4MToseJt8wnGQa0","ngfPwJZIeeFdPwkZTLqwwxZVvBOnaI74bZhe0zwK");
var JsonData;
function GetHtmlElements() {
        var itemArr = document.getElementsByName("inputFields");
        if(itemArr.length != idArr.length){
            console.log(itemArr.length);
            console.log(idArr.length);
            console.log("Length of idArr and ItemArr is mismatch");
            return;
        }
        for(var i=0, iL=idArr.length; i<iL;i++){
            itemArr[i].id=idArr[i]   
        }   
    }

function PushToParse(){
        var detail = Parse.Object.extend("DETAILS");
        var detailData = new detail();
        
        for(var i=0, iL=idArr.length; i<iL;i++){
        var key=idArr[i];
        if(i==iL-1){
            var value=checkboxValue()
        }
        else{
            console.log("Key :"+key);
        if(document.getElementById(key).value != undefined){
        
        var value=document.getElementById(key).value;
        }
}
        detailData.set(key, value);
                  
        }



                   detailData.save(null, {
                     success: function(detailData) {
                       // Execute any logic that should take place after the object is saved.
                       alert('Details Updated!');
                     },
                     error: function(detailData, error) {
                       // Execute any logic that should take place if the save fails.
                       // error is a Parse.Error with an error code and message.
                       alert('Failed to Update, with error code: ' + error.message);
                     }
                   });
}
function FetchFromParse(Tablename){
    alert("In fetch");
    
        var  TEMPCOOR = Parse.Object.extend(Tablename);
        var tempcoor = new TEMPCOOR();
        
        var query = new Parse.Query(tempcoor);
        var number=document.getElementById("MobileNumber").value;
        //console.log("Number"+number);
        query.exists("MobileNumber");
        query.limit(1);
        query.find({
              success: function(results) 
            { 
                for(var iterator=0, iteratorL=idArr.length; iterator<iteratorL;iterator++)
                            {
                                //var key=idArr[iterator];
                                
                                
                                //if(document.getElementById(idArr[iterator]).value!=null)
                                 //console.log("KEY "+document.getElementById(idArr[iterator]).Name+"value"+document.getElementById(idArr[iterator]).value);   
                                
                                //document.getElementById(idArr[i]).value=tempcoor.get(idArr[i]);          
                                //var value=document.getElementById(key).value;
                            }
                
                for (var j = 0; j < results.length; j++) 
                { 
                    var object = results[j];
                    tempcoor.id=object.id 
                    {   
                        for(var i=0, iL=idArr.length; i<iL;i++)
                            {
                                var key=idArr[i];
                            
                                if(tempcoor.get(idArr[i]))
                                        {
                                          console.log("KEY"+idArr[i]+"VALUE"+tempcoor.get(idArr[i]));
                            document.getElementById(idArr[i]).value=tempcoor.get(idArr[i]); 
                                        }
                                              
                                //var value=document.getElementById(key).value;
                            }
                   }                   
                    console.log("Got object"+tempcoor);

                }
                
            }

        });
}

function checkboxValue(){
                var event="";
                var chbox;
                var i;
                for (i = 1; i < 18; i++) { 
                    chbox=document.getElementById("issue"+i);
                    if(chbox.checked==true)
                    { event=event+chbox.value+", ";   }
                    return event;
                }
                }

function Fetch(Tablename)
{
     var promise = new Promise(function(resolve, reject) {
     var testArray;
     //var mNumber=document.getElementById("searchNumber")
    //var mNumber = "8904845390";
     var intake= Parse.Object.extend(Tablename);
     var query = new Parse.Query(intake);
     query.exists("MobileNumber");
     query.limit(10);
     query.find({
    success: function(results) {     
      var returnArr = [];
      for (var i = 0; i < results.length; i++) { 
        var object = results[i];
      var jsonp=object.toJSON();
          returnArr.push(jsonp);
      }
      testArray=returnArr;
         resolve(testArray);
    } });
       
     });
      promise.then(function(data) {                        
                               
      console.log(data);
        JsonData=data;
        var tableData="<table class=\"table table-hover\">";
        var len=data.length;
        JSONToCSVConvertor(data, "Vehicle Report", true);
        for(var j=0, iL=idArr.length; j<iL;j++)
            {
                if(j==0){tableData=tableData+"<th>";}
                var key=idArr[j];
                tableData=tableData+"<td>"+key+"</td>";
                if(j==iL-1){tableData=tableData+"</th>";}
            }
        
        for(var i=0; i<len;i++)
        {
            tableData=tableData+"<tr>";
             for(var j=0, iL=idArr.length; j<iL;j++)
            {
                var key=idArr[j];
                tableData=tableData+"<td>"+data[i][key]+"</td>";
            }
            tableData=tableData+"</tr>";
                                
                            
        }
        tableData= tableData+"</table>";
         
         });
    
}
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    for (var i = 0; i < arrData.length; i++) {
        var row = "";
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            row += '"' + arrData[i][index] + '",';
        }

        row.slice(0, row.length - 1);
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "Caller_Detail_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

        function GetDataForSearch(){
        var promise = new Promise(function(resolve, reject) {
        var testArray;
        var mNumber=document.getElementById("searchNumber").value;
        //var mNumber = "8904845390";
        window.localStorage.setItem("id", mNumber);
        var intake= Parse.Object.extend("DETAILS");
        var query = new Parse.Query(intake);
        query.equalTo("MobileNumber",mNumber);
        query.find({
            success: function(results) {     
                var returnArr = [];
                for (var i = 0; i < results.length; i++) { 
                    var object = results[i];
                    //Considering id's will be unique
                   
                    var jsonp=object.toJSON();
                returnArr.push(jsonp);
                }
                testArray=returnArr;
                resolve(testArray);
            } });
       
        });
      promise.then(function(data) {                        
                               
      //console.log(data);
        var len=data[0];
        for(key in len)
        {
            //console.log(key);
            if(key == "MobileNumber" | key == "createdAt" || key == "objectId" || key =="updatedAt"){
                continue;
            }
            document.getElementById(key).value=len[key];
        }
             
         });
        }

