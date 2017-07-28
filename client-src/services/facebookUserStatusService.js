

class FacebookUserStatusService {

  constructor() {

    // Initialize some instance variables
    this._userStatusRequesters = [];
    this._longTokenRequesters = [];
    this._doneWaitingUserStatus = false;
    this._doneWaitingLongToken = false;
    this._userStatus = null;

    // Bind methods
    this._updateUserStatus = this._updateUserStatus.bind(this);
    this._getLongToken = this._getLongToken.bind(this);

    // Asynchronously initialize the facebook SDK, and once initialized, 
    // call this._refreshUserStatus to get the user's authentication status
    var that = this;
    window.fbAsyncInit = function() {
      FB.init({
        appId      : GLOBALS['appId'],
        cookie     : true,
        xfbml      : true,
        version    : 'v2.8'
      });
      FB.AppEvents.logPageView();   
      that._refreshUserStatus();
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = (
        "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.10&"
        + "appId=" + GLOBALS['FACEBOOK_APP_ID']
      );
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }


  // Public method to open a dialogue letting the user authenticate with
  // facebook.  The user's access token will become available
  login(callback, awaitLongToken, observe) {

    // By default, assume the caller wants to wait for the long-lived token.
    if(typeof awaitLongToken === 'undefined') {
      awaitLongToken = true;
    }

    // By default, assume caller wants one-time response, not a subscription
    observe = Boolean(observe);

    // Accept null or undefined as callback in which no callback is done.
    if (typeof callback === 'undefined') {
      callback = null
    }

    // Flag that we will be waiting for updated userStatus and long token.
    this._doneWaitingUserStatus = false;
    this._doneWaitingLongToken = false;

    // Register the caller's callback
    if(callback != null) {
      if(awaitLongToken) {
        this._longTokenRequesters.push([callback, observe])
      } else {
        this._userStatusRequesters.push([callback, observe])
      }
    }

    // Call the login, and upon satisfying it, _updateUserStatus, which will
    // supply the new userStatus to the caller's callback.
    FB.login(this._updateUserStatus)
  }


  // Request to be notified of the user status (as soon as it is available)
  // via callback.  If `observe` is true, then callback will be called whenever
  // this._userStatus changes.
  getUserStatus(callback, awaitLongToken, observe) {

    // By default, assume the caller wants to wait for the long-lived token.
    if(typeof awaitLongToken === 'undefined') {
      awaitLongToken = true;
    }

    // By default, assume caller wants one-time response, not a subscription
    observe = Boolean(observe);

    if(awaitLongToken) {
      this._longTokenRequesters.push([callback, observe]);
      this._satisfyRequesters(
        this._longTokenRequesters, '_doneWaitingLongToken');
    } else {
      this._userStatusRequesters.push([callback, observe]);
      this._satisfyRequesters(
        this._userStatusRequesters, '_doneWaitingUserStatus');
    }
  }

  getLongLivedToken(callback, observe) {
    observe = Boolean(observe);
    this._longTokenRequesters.push([callback, observe]);
  }

  _satisfyRequesters(requesters, isReadyKey) {

    if(!this[isReadyKey]) {
      return;
    }

    let newRequesters = []

    // We'll empty the this._userStatusRequesters, calling each one with the
    // current this._userStatus.  A user status requester that has observe equal
    // to true should get put back onto the this._userStatusRequesters once
    // we're all done.
    while (requesters.length > 0) {
      let requester = requesters.pop();
      let callback = requester[0];
      let observe = requester[1];
      callback(this._userStatus);
      if(observe) {
        newRequesters.push(requester);
      }
    }

    // Push the observers that we removed back onto the array (note that the
    // array might have lengthened since we emptied it, so we need to extend
    // the array in place!)
    Array.prototype.push.apply(requesters, newRequesters)
  }

  _getLongToken(token){

    let that = this;
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
      var data = JSON.parse(json);
      that._userStatus['longAccessToken'] = data['access_token'];
      that._userStatus['longAccessTokenExpresIn'] = data['expires_in'];
      that._doneWaitingLongToken = true;
      that._satisfyRequesters(
        that._longTokenRequesters, '_doneWaitingLongToken');
    })
  }

  _updateUserStatus(response){

    // Handle the case where the user is logged in.
    if(response['status'] == 'connected') {

      // Keep the user's info in memory.
      this._userStatus = {
        'authenticated': true,
        'shortAccessToken': response['authResponse']['accessToken'],
        'shortAccessTokenExpresIn': response['authResponse']['expiresIn'],
        'signedRequest': response['authResponse']['signedRequest'],
        'userId': response['authResponse']['userID']
      }

      // Get a long-lived token.  (It will notify watchers awaiting long token)
      this._getLongToken(response.authResponse.accessToken);

    // Handle the case where the user is not logged in.
    } else {
      this._userStatus = {'authenticated': false};

      // Since the user is not logged in, there will be no long token
      this._doneWaitingLongToken = true;
      this._satisfyRequesters(
        this._longTokenRequesters, '_doneWaitingLongToken');
    }

    // Notify watchers of _userStatus about the updated status
    this._doneWaitingUserStatus = true;
    this._satisfyRequesters(
      this._userStatusRequesters, '_doneWaitingUserStatus');
  }

  _refreshUserStatus() {
    this._doneWaitingUserStatus = false;
    this._doneWaitingLongToken = false;
    FB.getLoginStatus(this._updateUserStatus);
  }

}

let facebookUserStatusService = new FacebookUserStatusService()

export default facebookUserStatusService;
