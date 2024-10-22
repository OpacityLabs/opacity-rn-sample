This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# opacity-rn-sample

Opacity Networks sample application written for React Native.

## Getting started

Using the sample app requires a valid API key. Please visit [the developer portal](https://app.opacity.network) to sign up and generate one.

**_Note: The Opacity SDK and network are in pre-alpha stage. Features are limited and may change. Check the developer portal for the latest updates._**

## Install

```
yarn
```

Follow the platform specific instructions. Then:

```
npx react-native start
```

## iOS

- You need to bump your minimum deployment target to iOS 14 (Via Xcode → [YOUR TARGET] → General → Deployment Target)
- Do a `pod install` Module is a Turbo Module, therefore you need to enable the new arch. (RCT_ENABLE_NEW_ARCH=1 pod install)

If you are pulling on the latest version cocoapods sometimes refuses to update it's main repo specs. You can force an update via:

```sh
rm -rf ~/.cocoapods/repos/trunk
pod repo update
RCT_ENABLE_NEW_ARCH=1 pod install --repo-update
```

## Android (experimental)

There are some more prerequisites for running Android.

First add the necessary repos to download the dependencies. On your root `build.gradle` add:

```
allprojects {
  repositories {
    google()
    mavenCentral()
    maven { url "https://maven.mozilla.org/maven2/" }
    maven { url 'https://jitpack.io' }
  }
}
```

On your apps `AndroidManifest.xml` add an activity:

```xml
      <activity
        android:name="com.opacitylabs.opacitycore.InAppBrowserActivity"
        android:theme="@style/Theme.AppCompat.DayNight" />
    // Just above the closing tag of "application"
    </application>
```

On your main activity you need to initialize the library (kotlin snippet):

```kotlin
import android.os.Bundle // add this import
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.opacitylabs.opacitycore.OpacityCore // add this import

class MainActivity : ReactActivity() {
  override fun onCreate(savedInstanceState: Bundle?) { // add this method
    super.onCreate(savedInstanceState)
    OpacityCore.initialize(this)
  }
  // ...
}
```

## JS

You need to make sure `react-native.config.js` is properly set up for code generation to work:

```js
module.exports = {
  project: {
    android: {
      packageName: 'your.package.name', // must match your android apps package name, take a look into build.gradle
    },
  },
};
```

Once everything is setup you can call the init method on your JS:

```ts
import { init } from '@opacity-labs/react-native-opacity';

// ..

useEffect(() => {
    init('Your API key', false);
  }, []);
}

```

Calling a resource:

```ts
import {getResource} from '@opacity-labs/react-native-opacity';

// ..

const handleGetResources = async (resource: Resource) => {
  const result = await getResource(alias);
};
```

A resource is referenced with an alias. Using the same developer API key you can run the following query to view the available platforms and their respective resources and resource aliases:

```ts
// ..

(async () => {
  const response = await fetch(
    'https://api.opacity.network/platforms?all=true',
    {
      method: 'GET',
      headers: {
        'Authorization-Provider': 'opacity',
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error('GET platforms failed');
  }

  dispatch(setPlatforms(sortBy(await response.json(), 'name')));
})();
```
