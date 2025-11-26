'use strict';

// write your code here
const firstPromise = new Promise((resolve, reject) => {
  const handleClick = () => {
    document.removeEventListener('click', handleClick);
    resolve('First promise was resolved');
  };

  document.addEventListener('click', handleClick);

  setTimeout(() => {
    document.removeEventListener('click', handleClick);
    reject(new Error('First promise was rejected'));
  }, 3000);
});

const secondPromise = new Promise((resolve) => {
  const handleEvent = () => {
    document.removeEventListener('click', handleEvent);
    document.removeEventListener('contextmenu', handleEvent);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleEvent);
  document.addEventListener('contextmenu', handleEvent);
});

const leftClick = new Promise((resolve) => {
  const handleClick = () => {
    document.removeEventListener('click', handleClick);
    resolve();
  };

  document.addEventListener('click', handleClick);
});

const rightClick = new Promise((resolve) => {
  const handleContextMenu = () => {
    document.removeEventListener('contextmenu', handleContextMenu);
    resolve();
  };

  document.addEventListener('contextmenu', handleContextMenu);
});

const thirdPromise = Promise.all([leftClick, rightClick]).then(() => {
  return 'Third promise was resolved';
});

firstPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch((err) => {
    createMessage('error', err.message);
  });

secondPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch((err) => {
    createMessage('error', err.message);
  });

thirdPromise
  .then((message) => {
    createMessage('success', message);
  })
  .catch((err) => {
    createMessage('error', err.message);
  });

function createMessage(type, message) {
  const div = document.createElement('div');

  div.dataset.qa = 'notification';
  div.classList.add(type);
  div.innerText = message;

  document.body.appendChild(div);
}
