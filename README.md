
# Contact

- Faaza Bil Amri
  - email : faazabilamri7@gmail.com
  - WhatsApp : 089514465350

# PokeApp - Faaza Bil Amri

Pokemon information and compare app

## Step 1: Install Depedencies

```bash
# using npm
npm install
```

if got some error on asset, try `npx react-native-asset`

## Step 2: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```



## Step 1: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.


### Project Overview

This project follows a modular and organized structure to enhance maintainability and scalability. Here's a brief overview of the main directories:

- **src**: The main source code directory.
  - **assets**: Contains font files and images.
    - **fonts**: Font files used in the project.
    - **images**: Image assets used in the project.
  - **components**: Reusable UI components.
    - **atoms**: Basic building blocks like ImageLoader, Placeholder, and SVGImageUri.
    - **molecules**: Combinations of atoms, such as Header and List.
    - **organisms**: Larger components that might contain combinations of molecules or atoms.
    - **templates**: Organize components for specific templates.
  - **config**: Configuration files for the project.
  - **helper**: Utility functions or helper classes.
  - **navigation**: Navigation-related files and configurations.
  - **redux**: Redux state management setup.
    - **slices**: Redux slices for different parts of the state.
  - **screens**: Individual screens/pages of the application.
    - **ComparePage**: Screen for comparing items.
    - **DetailPage**: Screen for displaying detailed information.
    - **HomePage**: Main screen of the application.
  - **services**: API services or other external services.
  - **theme**: Styling and theming configurations.
  - **types**: TypeScript type definitions.
- **__tests__**: Directory for test files.

Feel free to explore each directory to understand the project structure and find specific components or functionalities. This structure aims to provide a clear organization of code, making it easier for developers to navigate and contribute to the project.

