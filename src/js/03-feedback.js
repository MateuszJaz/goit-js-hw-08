const throttle = require('lodash.throttle');

const form = document.querySelector('form');
const email = form.querySelector('input');
const text = form.querySelector('textarea');
const LOCALSTORAGE_KEY = 'feedback-form-state';

form.addEventListener(
  'input',
  throttle(event => {
    const formInput = {
      email: form.elements.email.value,
      message: form.elements.message.value,
    };
    localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(formInput));
  }, 500)
);

form.addEventListener('submit', event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.currentTarget;
  console.log({ email: email.value, message: message.value });

  event.currentTarget.reset();
  localStorage.clear();
});

const storage = localStorage.getItem(LOCALSTORAGE_KEY);
const parsedStorageData = JSON.parse(storage);
const tryFoo = () => {
  if (parsedStorageData !== null) {
    email.value = parsedStorageData.email;
    text.value = parsedStorageData.message;
  }
};

tryFoo();
