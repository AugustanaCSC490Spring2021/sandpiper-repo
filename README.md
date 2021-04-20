# sandpiper-repo

Team Sandpiper is proposing to make the Viking Ready app, which will be an all-in-one resource and support app for Augustana Students. Most importantly we want to allow students quick and easy access to the many resources that Augustana provides, a route alternative to the Augustana.edu homepage. On top of this we envision adding several features to boost utility of this app for Augustana students.

TO INSTALL

Install android studio (for android emulator)

Install node/npm

Install yarn (npm install -g yarn)

Install expo (requires Node.js, Git, and watchman (for MacOS) (npm install -g expo-cli)

“Yarn add expo"

**The server now starts, now to hook it up to an android emulator**

Docs.expo.io/workflow/android-studio-emulator

I then ran my emulator by following these instructions

Then use “expo install react-native-safe-area-context”

**The app now is running on my Android emulator**

My compiler warned that three packages were out of date for the expo version I was using

React-native-gesture-handler

React-native-reanimated

React-native-screens

I can go through and install these with “expo install [package name]”

#TO RUN
You will have to start the development server by running
yarn start

This will start the development server

From there you can startup an ios emulator or android emulator.
