

class FacebookUserStatusService {

  constructor() {
    this.userStatusRequesters = [];
    this.userStatus = null;
  }

  extendToken(token) {
    console.log(token);
  };

  clearUserStatusRequesters() {
    console.log('clearing ' + this.userStatusRequesters.length + ' !');
    if(this.userStatus === null) {
      console.log('nothing to return yet!');
      return;
    }

    let newStatusRequesters = []

    // We'll empty the this.userStatusRequesters, calling each one with the
    // current this.userStatus.  A user status requester that has observe equal
    // to true should get put back onto the this.userStatusRequesters once
    // we're all done.
    while (this.userStatusRequesters.length > 0) {
      let requester = this.userStatusRequesters.pop();
      let callback = requester[0];
      let observe = requester[1];
      console.log('callback:');
      console.log(callback);
      console.log('observe');
      console.log(observe);
      callback(this.userStatus);
      if(observe) {
        newStatusRequesters.push(requester);
      }
    }

    // Push the observers that we removed back onto the array (note that the
    // array might have lengthened since we emptied it, so we need to extend
    // the array in place!)
    Array.prototype.push.apply(
      this.userStatusRequesters, newStatusRequesters)
  }

  // Request to be notified of the user status (as soon as it is available)
  // via callback.  If `observe` is true, then callback will be called whenever
  // this.userStatus changes.
  getUserStatus(callback, observe) {
    observe = Boolean(observe);
    this.userStatusRequesters.push([callback, observe]);
    this.clearUserStatusRequesters();
  }

  getLongLivedToken(token){

    console.log('requesting longer lived token');
    console.log(token);

    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    };

    fetch('/auth/FB-request-long-token', {
      method: 'post',
      headers: headers, 
      body: JSON.stringify({token:token}),
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      console.log('got long lived token response');
      console.log(json);
    })
  }

  refreshUserStatus() {
    let that = this;
    FB.getLoginStatus(function(response) {
      console.log('fresh user status:');
      console.log(response);
      that.userStatus = response;
      that.clearUserStatusRequesters();
      that.getLongLivedToken(response.authResponse.accessToken);
    });
  }

}

let facebookUserStatusService = new FacebookUserStatusService()
facebookUserStatusService.refreshUserStatus()

export default facebookUserStatusService;
