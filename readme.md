

# cordova-plugin-keychain-touch-id 

A cordova plugin adding the iOS TouchID / Android fingerprint to your app and allowing you to store a password securely in the device keychain.

## Installation

The latest, from the master repo:
```
$ cordova plugin add https://github.com/chaoszero6/cordova-plugin-keychain-touch-id
$ cordova prepare
```

touchid.js is brought in automatically. There is no need to change or add anything in your html.

### Manually

1\. Add the following xml to your `config.xml` in the root directory of your `www` folder:
```xml
<feature name="TouchID">
  <param name="ios-package" value="TouchID" />
</feature>
```

You'll need to add the `LocalAuthentication.framework` and `Security.framework` to your project.
Click your project, Build Phases, Link Binary With Libraries, search for and add the frameworks.

2\. Grab a copy of TouchID.js, add it to your project and reference it in `index.html`:
```html
<script type="text/javascript" src="js/touchid.js"></script>
```

3\. Download the source files and copy them to your project.

iOS: Copy the four `.h` and two `.m` files to `platforms/ios/<ProjectName>/Plugins`

### Base on the original touch ID created by different people
* https://github.com/sjhoeksma/cordova-plugin-keychain-touch-id
* https://github.com/EddyVerbruggen/cordova-plugin-touch-id
* https://github.com/kunder-lab/kunder-touchid-keychain
* https://github.com/PeerioTechnologies/peerio-keychain-touchid
* https://github.com/nheezemans/touchid/blob/master/src/ios/TouchID.m

Cordova plugin for interacting with iOS touchId and keychain

# Usage

Make sure you check if the plugin is installed 

```
if (window.plugins.touchid) {

}
```

Call the function you like

**isAvailable(successCallback, errorCallback(msg))** will Check if touchid is available on the used device 	
	
**save(key,password, successCallback, errorCallback(msg))** 
will save a password under the key in the device keychain, which can be retrieved using a fingerprint

**verify(key,message,successCallback(password), errorCallback(errorCode))**
will open the fingerprint dialog, for the given key, showing an additional message.
successCallback will return the password stored in key chain.
errorCallback will return the error code, where -1 indicated not available.

**has(key,successCallback, errorCallback)**
will check if there is a password stored within the keychain for the given key

**delete(key,successCallback, errorCallback)**
will delete the password stored under given key from the keychain

## Android quirks

When a new fingerprint is enrolled, no more fingerprints are enrolled, secure lock screen is disabled or forcibly reset,
the key which is used to hash the password is permanently invalidated. It cannot be used anymore.

`verify` and `save` functions will return the `"KeyPermanentlyInvalidatedException"` message in the error callback.
This invalid key is removed - user needs to **save their password again**.

# Examples

```js
if (window.plugins) {
    window.plugins.touchid.isAvailable(function() {
        window.plugins.touchid.has("MyKey", function() {
            alert("Touch ID avaialble and Password key available");
        }, function() {
            alert("Touch ID available but no Password Key available");
        });
    }, function(msg) {
        alert("no Touch ID available");
    });
}

if (window.plugins) {
    window.plugins.touchid.verify("MyKey", "My Message", function(password) {
        alert("Tocuh " + password);
    }, function(e) {}, "Dialog Title");
}

if (window.plugins) {
    window.plugins.touchid.save("MyKey", "My Password", function() {
        alert("Password saved");
    }, function(e) {}, "My Message", "Dialog Title");
}

if (window.plugins) {
    window.plugins.touchid.delete("MyKey", function() {
        alert("Password key deleted");
    });
}
```

