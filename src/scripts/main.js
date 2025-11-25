'use strict';

'use strict';

// write your code here
const firstPromise = new Promise((resolve, reject) => {
  document.addEventListener('click', () => {
    resolve('First promise was resolved');
  });

  setTimeout(reject, 3000, 'First promise was rejected');
});

const secondPromise = new Promise((resolve) => {
  document.addEventListener('click', () => {
    resolve('Second promise was resolved');
  });

  document.addEventListener('contextmenu', () => {
    resolve('Second promise was resolved');
  });
});

firstPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch((message) => {
    createMessage('error', message);
  });

secondPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch((err) => {
    createMessage('error', err);
  });

function createMessage(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.innerText = message;

  document.body.appendChild(div);
}
