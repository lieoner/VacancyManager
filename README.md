This is a [Next.js](https://nextjs.org/) project with [Material-UI](https://material-ui.com/).
This application allows you to keep track of vacancies for your organization using [Firebase Realtime Database](https://firebase.google.com/docs/database).

## Using

```bash
yarn dev #start development server
yarn build #prepare app for deploy
yarn export #generate static app for deploy on custom server
```

or

```bash
npm run dev #start development server
npm run build #prepare app for deploy
npm run export #generate static app for deploy on custom server
```

Before using the application, you need to create a file `.env.local` and add variables to it to connect to the firebase:

```bash
NEXT_PUBLIC_FIREBASE_API_KEY = "YOUR_FIREBASE_API_KEY"
NEXT_PUBLIC_FIREBASE_PROJECT_ID = "YOUR_FIREBASE_PROJECT_ID"
NEXT_PUBLIC_PASSWORD_HASH = "PASSWORD_HASH"

NEXT_PUBLIC_FIREBASE_LOGIN = "SERVER_USER_EMAIL" //from https://console.firebase.google.com/u/1/project/*NEXT_PUBLIC_FIREBASE_PROJECT_ID*/authentication/users
NEXT_PUBLIC_FIREBASE_PASSWORD = "SERVER_USER_PASSWORD"
```

You can generate a `PASSWORD_HASH` using the command `yarn hash 'your_password'` or `npm run hash 'your_password'`
