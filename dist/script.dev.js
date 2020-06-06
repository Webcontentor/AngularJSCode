'use strict';

var app = angular.module("my-app", ['ngRoute', 'ui.grid', 'ui.grid.pagination']);
app.controller("myController", function ($scope, $http) {
  var success = function success(response) {
    var data = response.data;
    $scope.api = data;
  };

  $http({
    method: 'GET',
    url: 'https://api.yavun.com/api/1/email/list/get'
  }).then(success);
  $http({
    method: 'GET',
    url: 'https://api.yavun.com/api/1/segmentWithRecipientFilterGet?ageMax=&ageMin=&city=&click=false&company=&country=&email=&exclude=false&listId=616&mobile=&name=&open=false&pageno=1&pagesize=100&segmentId=0&state=&title=&zip='
  }).then(function success(response) {
    var data = response.data;
    $scope.gridOptions.data = data[1].query;
  });
  $scope.gridOptions = {
    columnDefs: [{
      name: 'firstName'
    }, {
      name: 'lastName'
    }, {
      name: 'email'
    }]
  };

  var successCallback = function successCallback(response) {
    $scope.api = response.data;
    $scope.image = "https://app.yavun.com/app/images/reports.png";
    console.log(response);
  };

  $http({
    method: "GET",
    url: "https://api.yavun.com/api/1/EmailCampaign?campaignId=0&dateType=latest&emailTypeId=1&enddate=&searchBy=&segmentId=0&startdate=&status=&userType=All"
  }).then(successCallback); // for deleting the api in emails

  $scope.deleteCampaign = function (emailCampaignDelete) {
    if (confirm("Do you really want to delete the campaign")) {
      $http({
        method: 'DELETE',
        url: 'https://api.yavun.com/api/1/emailcampaign/' + emailCampaignDelete
      }).then(function successCallback(response) {
        alert('Campiagn Deleted Succesfully');
        console.log("Campaign is Deleted");
      }, function errorMSg(response) {
        alert("Error Occured");
      });
    }
  };

  $scope.edited = function (emailcampaign) {
    return "draft" === emailcampaign;
  };

  $scope.showPopover = function () {
    $scope.popoverIsVisible = true;
  };

  $scope.hidePopover = function () {
    $scope.popoverIsVisible = false;
  }; // for the drop down in the segment


  $scope.IsVisible = false;

  $scope.ShowHide = function () {
    $scope.IsVisible = $scope.IsVisible ? false : true;
  };
});
app.config(function ($routeProvider) {
  $routeProvider.when("/email", {
    templateUrl: './email.html'
  }).when("/clone", {
    templateUrl: './clone.html'
  }).when("/preview-email", {
    template: '<div style="height:100px; width:400px; border-style: groove;"><h1>Preview Page of the Template</h1></div>'
  }).when("/emailsCampaigns", {
    templateUrl: "./layout.html"
  }).when("/edit", {
    templateUrl: './clone.html'
  }).when("/edit-template", {
    templateUrl: './email.html'
  });
});
app.directive('popup', function () {
  var linkFunction = function linkFunction($scope, element, attribute) {
    element.html("<table style='font-family: arial, sans-serif; border-collapse: collapse; width: 15%;'><tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Facebook</th></tr>" + " <tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Google</th></tr></table>");
    element.css("background-color", "white");
  };

  return {
    restrict: 'ACE',
    transclude: true,
    replace: true,
    isolate: true,
    scope: true,
    link: linkFunction
  };
});
app.directive('removeOnClick', function () {
  return {
    link: function link(scope, elt, attrs) {
      scope.remove = function () {
        elt.html('');
      };
    }
  };
}); // creating the directive for the dropdown in the grid

app.directive('dropdown', function () {
  // link:function(scope){
  // some code here
  // }
  return {
    restrict: "EA",
    templateUrl: './dropdown.html'
  };
}); // passing static data for checking the grid data
// function gridCtrl() {
//     this.myData = [{
//             firstName: "",
//             lastName: "",
//             email: ''
//         },
//         {
//             firstName: "",
//             lastName: "",
//             email: ''
//         },
//         {
//             firstName: "",
//             lastName: "",
//             email: ''
//         }
//     ];
// }