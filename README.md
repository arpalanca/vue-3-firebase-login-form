# Vue 3 Firebase Login Form

## Simple login and registration form with firebase authentication and registration using Vue 3

<h2 align="center">
  <img src="https://media.giphy.com/media/52xsu3FJnJzPtAhLf6/giphy.gif" alt="Vue 3 Firebase Login Form" width="600px" />
  <br>
</h2>

## Features
:star: Login Form\
:star: Registration Form\
:star: 404 Page\
:star: Styled with Tailwind CSS\
:star: Vue 3 with Composition API\
:star: Firebase\
:star: Vue Router\
:star: VeeValidate\
:star: Yup

## Project setup
```bash
# Clone this repository
$ git clone https://github.com/arpalanca/vue-3-firebase-login-form.git

# Go into the repository
$ cd vue-3-firebase-login-form

# Remove current origin repository
$ git remote remove origin

# Install dependencies
$ npm install
```
**NOTE**:
To update the config file, go to `src/lib/Firebase.js`.
```bash
const config = {
  apiKey: "API KEY HERE",
  authDomain: "AUTH DOMAIN HERE",
  databaseURL: "DATABASE URL HERE",
  projectId: "PROJECT ID HERE",
  storageBucket: "STORAGE BUCKET HERE",
  messagingSenderId: "MESSAGING SENDER ID HERE",
};
```

Start the server:

```bash
# Start development server
$ npm run serve
```

Go to `http://localhost:8080/` to view the page.

## License
This project is licensed under the MIT License