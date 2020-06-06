//logi8n page
'use strict';
function validate() {
    const email = (document.getElementById('email').value || '').trim();
    const password = (document.getElementById('password').value || '').trim();
    if (!email || !password) {
        alert('no input');
        return;
    }
    console.log('validate: ', email, password);
    fetch('https://api.yavun.com/api/Login', {
        method: 'POST',
        headers: new Headers({
            'Content-Type': 'application/json'
        }),
        body: JSON.stringify({
            email,password
        })
    }).then(res => {
        if (res.ok) {
            alert('hurray: GOOD EMAIL'+res.error);
        } else {
            res.json().then(json => alert(JSON.stringify(json, null, 2))) ;
        }
    }).catch(err  => console.log(err));
    
}
// file upload
angular.module('myApp', []).directive('fileModel', ['$parse', function ($parse) {
    return {
       restrict: 'A',
       link: function(scope, element, attrs) {
          element.bind('change', function(){
          $parse(attrs.fileModel).assign(scope,element[0].files)
             scope.$apply();
          });
       }
    };
 }]).controller('myCtrl', ['$scope', '$http', function($scope, $http){


   $scope.uploadFile=function(){
   var fd=new FormData();
    console.log($scope.files);
    angular.forEach($scope.files,function(file){
    fd.append('file',file);
    });
   $http.post('https://api.yavun.com/api/email/list/mappingColumnName',fd,
       {
           transformRequest: angular.identity,
           headers: {'Content-Type': undefined}                     
        }).success(function(d)
            {
                console.log(d);
            })         
   }
 }]);