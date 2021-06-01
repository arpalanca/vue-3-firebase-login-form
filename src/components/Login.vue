<template>
  <div class="flex h-screen">
    <div class="w-full max-w-sm p-6 m-auto bg-white shadow-lg dark:bg-gray-800 border">
      <!-- Login -->
      <div v-if="page === 'login'">
        <h1 class="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Brand Name
        </h1>
        <p class="text-xl text-center font-light text-gray-600 dark:text-white mt-2">
          Login To Your Account
        </p>
        <p v-if="loginError" class="text-base text-center font-light text-red-600 mt-2">
          {{ loginError }}
        </p>
        <form @submit.prevent="login" class="mt-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-800 dark:text-gray-200">Email Address</label>
            <input type="email"
              v-model="email"
              name="email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
            <span v-if="emailError" class="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{{ emailError }}</span>
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-800 dark:text-gray-200">Password</label>
            </div>
            <input type="password"
              v-model="password"
              name="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
            <span v-if="passwordError" class="font-medium tracking-wide text-red-500 text-xs mt-1 ml-1">{{ passwordError }}</span>
          </div>

          <div class="mt-6">
            <button
              type="submit"
              class="w-full px-4 py-2 tracking-wider text-white font-medium transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Login
            </button>
          </div>
        </form>
        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <a href="#" @click="page='register'" class="text-center font-medium tracking-wide text-gray-500 dark:text-gray-400 hover:underline">OR Create Your Account</a>
          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>
      </div>

      <!-- Create Account -->
      <div v-if="page === 'register'">
        <h1 class="text-3xl font-semibold text-center text-gray-700 dark:text-white">
          Brand Name
        </h1>
        <p class="text-xl text-center font-light text-gray-600 dark:text-white mt-2">
          Create Your Account
        </p>
        <form @submit.prevent="register" class="mt-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-800 dark:text-gray-200">Email Address</label>
            <input type="email"
              v-model="email"
              name="email"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label for="username" class="block text-sm font-medium text-gray-800 dark:text-gray-200">Username</label>
            </div>
            <input type="text"
              v-model="username"
              name="username"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          </div>

          <div class="mt-4">
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium text-gray-800 dark:text-gray-200">Password</label>
            </div>
            <input type="password"
              v-model="password"
              name="password"
              class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          </div>

          <div class="mt-6">
            <button
              class="w-full px-4 py-2 tracking-wider text-white font-medium transition-colors duration-200 transform bg-gray-700 hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Create Account
            </button>
          </div>
        </form>
        <div class="flex items-center justify-between mt-4">
          <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>
          <a href="#" @click="page='login'" class="text-center font-medium tracking-wide text-gray-500 dark:text-gray-400 hover:underline">OR Login To Your Account</a>
          <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { ref } from 'vue'
  import { FirebaseDb, FirebaseAuth } from '@/lib/Firebase';
  import { useForm, useField } from 'vee-validate';
  import * as yup from 'yup';
  import { useRouter } from 'vue-router';

  export default {
    name: 'Login',

    setup() {
      const page = ref('login');

      const schema = yup.object({
        email: yup.string().required().label('Email').email(),
        password: yup.string().required().label('Password').min(8),
        username: yup.string().required().label('Username'),
      });

      useForm({
        validationSchema: schema,
      });

      const { value: email, errorMessage: emailError } = useField('email');
      const { value: password, errorMessage: passwordError } = useField('password');
      const { value: username, errorMessage: usernameError } = useField('username');

      const loginError = ref('');
      const loginErrorMessage = ref('Invalid email or password. Please try again.');
      const router = useRouter();

      FirebaseAuth.onAuthStateChanged(user => {
        if (user) {
          router.push('/dashboard');
        }
      })

      function login() {
        try { 
          FirebaseAuth.signInWithEmailAndPassword(email.value, password.value).catch(error => {
            loginError.value = error.message;
          });
        } catch (e) {
          loginError.value = loginErrorMessage.value;
        }
      }

      function register() {
        FirebaseAuth.createUserWithEmailAndPassword(email.value, password.value).then((data) => {
          FirebaseDb.ref('users/' + data.user.id).set({
            name: username.value
          })
        })
      }

      return {
        page,
        email,
        emailError,
        password,
        passwordError,
        username,
        usernameError,
        loginError,
        login,
        register
      }
    }
  }
</script>
