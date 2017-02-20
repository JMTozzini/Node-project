'use strict';

describe('Service: serviceHeader', function () {

  // load the service's module
  beforeEach(module('nodeProjectApp'));

  // instantiate service
  var serviceHeader;
  beforeEach(inject(function (_serviceHeader_) {
    serviceHeader = _serviceHeader_;
  }));

  it('should do something', function () {
    expect(!!serviceHeader).toBe(true);
  });

});
