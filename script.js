'use strict';
var app = angular.module("my-app", ['ngRoute']);

app.controller("myController", function($scope, $http) {
    var successCallback = function(response) {
        $scope.api = response.data;
        $scope.image = "https://app.yavun.com/app/images/reports.png";
        console.log(response);
    };
    $http({
        method: "GET",
        url: "https://api.yavun.com/api/1/EmailCampaign?campaignId=0&dateType=latest&emailTypeId=1&enddate=&searchBy=&segmentId=0&startdate=&status=&userType=All",
    }).then(successCallback);

    $scope.deleteCampaign = function(emailCampaignDelete) {
        if (confirm("Do you really want to delete the campaign")) {
            $http({
                method: 'DELETE',
                url: 'https://api.yavun.com/api/1/emailcampaign/' + emailCampaignDelete
            }).then(function successCallback(response) {
                    alert('Campiagn Deleted Succesfully');
                    console.log("Campaign is Deleted");
                },
                function errorMSg(response) {
                    alert("Error Occured");
                });
        }

    };
    $scope.edited = function(emailcampaign) {
        return "draft" === emailcampaign;
    };
    $scope.showPopover = function() {
        $scope.popoverIsVisible = true;
    };

    $scope.hidePopover = function() {
        $scope.popoverIsVisible = false;
    };
});

app.config(function($routeProvider) {
    $routeProvider
        .when("/email", {
            templateUrl: './email.html'
        })
        .when("/clone", {
            templateUrl: './clone.html'
        })
        .when("/preview-email", {
            template: '<div style="height:100px; width:400px; border-style: groove;"><h1>Preview Page of the Template</h1></div>'
        })
        .when("/emailsCampaigns", {
            templateUrl: "./layout.html"
        })
        .when("/edit", {
            templateUrl: './clone.html'
        })
        .when("/edit-template", {
            templateUrl: './email.html'
        })
});

app.directive('popup', function() {
    var linkFunction = function($scope, element, attribute) {
        element.html("<table style='font-family: arial, sans-serif; border-collapse: collapse; width: 15%;'><tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Facebook</th></tr>" +
            " <tr><th style='border: 1px solid #dddddd; text-align: left; padding: 8px;'>Google</th></tr></table>");
        element.css("background-color", "white");
    }
    return {
        restrict: 'ACE',
        transclude: true,
        replace: true,
        isolate: true,
        scope: true,
        link: linkFunction
    }
});

app.directive('removeOnClick', function() {
    return {
        link: function(scope, elt, attrs) {
            scope.remove = function() {
                elt.html('');
            };
        }
    }

});