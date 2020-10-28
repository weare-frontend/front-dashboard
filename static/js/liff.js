$(document).ready(function() {
    function runApp() {
        liff.getProfile().then(profile => {
            document.getElementById("pictureUrl").src = profile.pictureUrl;
            document.getElementById("userId").innerHTML = '<b>UserId:</b> ' + profile.userId;
            document.getElementById("displayName").innerHTML = '<b>DisplayName:</b> ' + profile.displayName;
            document.getElementById("statusMessage").innerHTML = '<b>StatusMessage:</b> ' + profile.statusMessage;
            document.getElementById("getDecodedIDToken").innerHTML = '<b>Email:</b> ' + liff.getDecodedIDToken().email;
        }).catch(err => console.error(err));
    }
    liff.init({ liffId: "YOUT-LIFF-ID" }, () => {
        if (liff.isLoggedIn()) {
            runApp()
        } else {
            liff.login();
        }
    }, err => console.error(err.code, error.message));
});