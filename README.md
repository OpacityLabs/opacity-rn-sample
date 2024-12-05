# opacity-rn-sample

The Opacity Networks sample application written for React Native on iOS, using a MAC development environment.
This is a [React Native](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
Android support is still experimental at this stage.

## Setup and installation

### Set up a development environment

1. Install [Homebrew](https://brew.sh/) if necessary.

1. Follow directions in [the React Native documentation](https://reactnative.dev/docs/set-up-your-environment).
   The latest version of XCode installs the command-line tools and the latest iOS emulator for you automatically.

1. Install yarn.

   ```sh
   brew install yarn
   ```

1. Install the [CocoaPods](https://cocoapods.org/) depndency manager.

   ```sh
   brew install cocoapods
   ```

### Set up the application

1. Clone the github repository.

    ```sh
    git clone https://github.com/OpacityLabs/opacity-rn-sample.git
    cd opacity-rn-sample
    ```

1. Install packages

    ```sh
    yarn install
    ```

1. Update dependencies.
   Note that you need to redo this step when you pull a new version from GitHub.

   ```sh
   yarn pods
   ```

1. Open **XCode**. 

1. Compile (if needed) and start the application.

   ```sh
   yarn ios
   ```

   Note that compilation takes a long time, especially the first one.
   Also, if you get a white iPhone screen, close the application and start it again.

### Run the application

1. You need an API key, get it from the [Opacity developer portal](https://app.opacity.network).

1. The sample application should open automatically.
   If it does not, scroll right in the emulator and in the second screen click **opacitySample**.

1. Paste the API key in the field and click **Next**.

1. Select the platform to search.
   For the purpsoe of this guide, select **GitHub**.

1. Click the resource **Profile** and log on to your GitHub account.

1. See that you can view your GitHub profile through Opacity.
   Unfortunately, it is harder to show in a demo that the protocol is working correctly, that the data is truly safe and verified.
