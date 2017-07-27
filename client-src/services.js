
class MyClass {
  yo() {
    console.log('yo from my class');
  }
}

var SERVICES = (function(){

  var services = {};

  // 
  // Private functions
  //

  var userStatusObservers = []

  var onUserStatusChange = function(response) {
    for(let i=0; i < userStatusObservers.length; i++) {
      userStatusObservers[i](response);
    }
  }

  // 
  // PUBLIC FUNCTIONS
  //
 

  // This will store the users' logged in status
  services['userStatus'] = null;

  services['extendToken'] = function(token) {console.log(token)};

  services['userStatusRequesters'] = [];

  var clearUserStatusRequesters = function() {
    console.log('clearing ' + services['userStatusRequesters'].length + ' !');
    if(services['userStatus'] === null) {
      console.log('nothing to return yet!');
      return;
    }

    let newStatusRequesters = []

    // We'll empty the userStatusRequesters, calling each one with the current
    // userStatus.  A user status requester that has observe equal to true
    // should get put back onto the userStatusRequesters once we're all done.
    console.log(JSON.stringify(services['userStatusRequesters']))
    while (services['userStatusRequesters'].length > 0) {
      let requester = services['userStatusRequesters'].pop();
      let callback = requester[0];
      let observe = requester[1];
      console.log('callback:');
      console.log(callback);
      console.log('observe');
      console.log(observe);
      callback(services['userStatus']);
      if(observe) {
        newStatusRequesters.push(requester);
      }
    }

    // Push the observers that we removed back onto the array (note that the
    // array might have lengthened since we emptied it, so we need to extend
    // the array in place!)
    Array.prototype.push.apply(
      services['userStatusRequesters'], newStatusRequesters)
  }

  // Request to be notified of the user status (as soon as it is available)
  // via callback.  If `observe` is true, then callback will be called whenever
  // userStatus changes.
  services['getUserStatus'] = function(callback, observe) {
    observe = Boolean(observe);
    services['userStatusRequesters'].push([callback, observe]);
    clearUserStatusRequesters();
  }

  services['refreshUserStatus'] = function() {
    FB.getLoginStatus(function(response) {
      console.log('fresh user status:');
      console.log(response);
      services['userStatus'] = response;
      clearUserStatusRequesters();
    });
  }

  services['refreshUserStatus']();

  return services;

})()

let my_class = new MyClass();
my_class.yo();


export default SERVICES;
