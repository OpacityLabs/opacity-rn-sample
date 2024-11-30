# opacity-rn-sample

The Opacity Networks sample application written for React Native on iOS, using a MAC development environment.
This is a [React Native](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
Android support is still experimental at this stage.

## Setup and installation

### Set up a development environment

1. Follow directions in [the React Native documentation](https://reactnative.dev/docs/set-up-your-environment).

1. Install [Homebrew](https://brew.sh/) if necessary.

1. Install the [CocoaPods](https://cocoapods.org/) depndency manager.

   ```sh
   brew install cocoapods
   ```

### Run the application

1. Clone the github repository.

    ```sh
    git clone https://github.com/OpacityLabs/opacity-rn-sample.git
    cd opacity-rn-sample
    ```

1. Install packages

    ```sh
    npm install
    ```

1. Update dependencies.

   ```sh
   cd ios
   export RCT_ENABLE_NEW_ARCH=1
   pod install --repo-update
   cd ..
   ```

1. Compile (if needed) and start the application.
   Wait, this is a long process.

   ```sh
   npm ios
   ```

### Running

1. You need an API key, get it from the [Opacity developer portal](https://app.opacity.network/login).

1. 



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
