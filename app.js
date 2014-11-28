angular.module('tkc', [])

.controller('TemplateController', function($scope, $timeout){

  $scope.vendor = {
    name:         "Wawandco",
    location:     "We live, work, and play in Barranquilla, CO",
    description:  "Lorem ipsum dolor sit amet, consectetur adipisicing elit," +
                  "sed do eiusmod tempor incididunt ut labore et dolore magna " +
                  "aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco " +
                  "laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor " +
                  "in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla " +
                  "pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa " +
                  "qui officia deserunt mollit anim id est laborum.",
    twitterLink:  "https://twitter.com/wawandco",
    googleLink:   "",
    facebookPage: "https://www.facebook.com/pages/Wawandco/526535857377803",

    products: [
      {name: "Product #1", price: "", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad.", features:[{title:"", description: ""}]},
      {name: "Product #2", price: "", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam labore et dolore magna aliqua. Ut enim ad minim veniam.", features:[{title:"", description: ""}]},
      {name: "Product #3", price: "", description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam labore et dolore magna aliqua. Ut enim ad minim veniam.", features:[{title:"", description: ""}]},
    ],

    benefits: [
      {title: "Lorem Ipsum" , description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do  labore et dolore magna aliqua." },
      {title: "Sit Amet" ,    description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." },
      {title: "Consectetur" , description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Eiusmod tempor incididunt." }
    ],

    whyUse:     "Lorem ipsum dolor sit amet, consectetur adipisicing elit, " +
                "sed consectetur adipisicing elit, sed do eiusmod tempor incididunt. " +
                "Lorem ipsum dolor sit amet, consectetur. Lorem ipsum dolor sit amet, " +
                "consectetur adipisicing elit, sed do eiusmod tempor incididunt!"
  }

  $scope.editMode = false

  $scope.selectedProduct = {}
  $scope.isEditingProduct = false

  $scope.showGeneralInfoForm = function(){
    angular.element('#mainInfoModal').modal('show')
  }

  $scope.showEditProductForm = function(value) {
    $scope.selectedProduct = $scope.vendor.products[value]
    $scope.isEditingProduct = true;
    angular.element('#productsModal').modal('show')
  }

  $scope.addProductForm = function() {
    $scope.selectedProduct = {}
    $scope.isEditingProduct = false;
    angular.element('#productsModal').modal('show')
  }

  $scope.showEditBenefitForm = function() {
    angular.element('#benefitsModal').modal('show')
  }

  $scope.showEditWhyForm = function() {
    angular.element('#whyUseModal').modal('show')
  }

  $scope.saveProduct = function() {
    if(!$scope.isEditingProduct) {
      $scope.vendor.products.push($scope.selectedProduct)
    }
    angular.element('#productsModal').modal('hide')
    $scope.rearrangeEditorMask()
  }

  $scope.showNewFeature = function() {
    if(!$scope.selectedProduct.features){
      $scope.selectedProduct.features = []
    }
    $scope.selectedProduct.features.push({title:"", description: ""})
  }

  $scope.rearrangeEditorMask = function(){
    angular.forEach(angular.element('.editor-mask'), function(element){
      element = angular.element(element)
      $timeout(function(){
        element.offset(element.parent().offset())
        element.height(element.parent().outerHeight() - 56)
        element.width(element.parent().outerWidth()   - 56)
      }, 0)
    })
  }
})

.directive('editable', function($timeout){
  return {
    scope: {
      onEdit: "&",
    },

    replace: true,

    template: '<div class="editor-mask"> <a type="button" class="btn btn-default edit-blue" ng-click="onEdit()"> Edit </a></div>',

    link: function(scope, element){
      $timeout(function(){
        element.offset(element.parent().offset())
        element.height(element.parent().outerHeight() - 56)
        element.width(element.parent().outerWidth()   - 56)
      }, 0)
    }
  }
})