'use strict';

describe('Controller: CreateprojectCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeProjectApp'));

  var CreateprojectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateprojectCtrl = $controller('CreateprojectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateprojectCtrl.awesomeThings.length).toBe(3);
  });
});
