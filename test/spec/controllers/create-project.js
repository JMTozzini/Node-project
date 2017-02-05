'use strict';

describe('Controller: CreateProjectCtrl', function () {

  // load the controller's module
  beforeEach(module('nodeProjectApp'));

  var CreateProjectCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateProjectCtrl = $controller('CreateProjectCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(CreateProjectCtrl.awesomeThings.length).toBe(3);
  });
});
