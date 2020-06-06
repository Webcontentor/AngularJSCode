"use strict";var app=angular.module("my-app",["ngRoute","ui.grid","ui.grid.pagination"]);app.controller("myController",function(a,t){t({method:"GET",url:"https://api.yavun.com/api/1/email/list/get"}).then(function(e){var t=e.data;a.api=t}),t({method:"GET",url:"https://api.yavun.com/api/1/segmentWithRecipientFilterGet?ageMax=&ageMin=&city=&click=false&company=&country=&email=&exclude=false&listId=616&mobile=&name=&open=false&pageno=1&pagesize=100&segmentId=0&state=&title=&zip="}).then(function(e){var t=e.data;a.gridOptions.data=t[1].query}),a.gridOptions={columnDefs:[{name:"firstName"},{name:"lastName"},{name:"email"}]};t({method:"GET",url:"https://api.yavun.com/api/1/EmailCampaign?campaignId=0&dateType=latest&emailTypeId=1&enddate=&searchBy=&segmentId=0&startdate=&status=&userType=All"}).then(function(e){a.api=e.data,a.image="https://app.yavun.com/app/images/reports.png",console.log(e)}),a.deleteCampaign=function(e){confirm("Do you really want to delete the campaign")&&t({method:"DELETE",url:"https://api.yavun.com/api/1/emailcampaign/"+e}).then(function(){alert("Campiagn Deleted Succesfully"),console.log("Campaign is Deleted")},function(){alert("Error Occured")})},a.edited=function(e){return"draft"===e},a.showPopover=function(){a.popoverIsVisible=!0},a.hidePopover=function(){a.popoverIsVisible=!1},a.IsVisible=!1,a.ShowHide=function(){a.IsVisible=!a.IsVisible}}),app.config(function(e){e.when("/email",{templateUrl:"./email.html"}).when("/clone",{templateUrl:"./clone.html"}).when("/preview-email",{template:'<div style="height:100px; width:400px; border-style: groove;"><h1>Preview Page of the Template</h1></div>'}).when("/emailsCampaigns",{templateUrl:"./layout.html"}).when("/edit",{templateUrl:"./clone.html"}).when("/edit-template",{templateUrl:"./email.html"})}),app.directive("popup",function(){return{restrict:"ACE",transclude:!0,replace:!0,isolate:!0,scope:!0,link:function(e,t){t.html("<table style='font-family: arial, sans-serif; border-collapse: collapse; width: 15%;'><tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Facebook</th></tr> <tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Google</th></tr></table>"),t.css("background-color","white")}}}),app.directive("removeOnClick",function(){return{link:function(e,t){e.remove=function(){t.html("")}}}}),app.directive("dropdown",function(){return{restrict:"EA",templateUrl:"./dropdown.html"}});