# Getting Started with Twitter Search App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Set up and run frontend/server

### `Step 1. Add .env file to root directory`

In the root directory create an `.env` file with the value

```
TWITTER_BEARER_TOKEN=ADD_YOUR_TOKEN
```

The Twitter API does not support CORS so we will need to run our own imtermediate proxy to make the cross-origin API calls from our app.

To get your own Bearer Token see [Twitter authentication docs](https://developer.twitter.com/en/docs/authentication/oauth-2-0)

### `Step 2. Install all necessary dependencies`

```
#with yarn
yarn install
```

### `Step 3. run yarn`

```
yarn start
```

You're all set! 🎉 Both the all app and server should will be running.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the `app` and `server` in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn client`

**ONLY** runs the `app` in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn server`

**ONLY** runs the `server` in the development mode.\
Open [http://localhost:5000](http://localhost:500) to view it in the browser.

You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn format`

Launches prettier to format all `.ts and .tsx` files.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
