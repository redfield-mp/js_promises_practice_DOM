'use strict';

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
  const handleClick = () => {
    document.removeEventListener('click', handleClick);
    resolve('Second promise was resolved');
  };
  const handleContextMenu = () => {
    document.removeEventListener('click', handleContextMenu);
    resolve('Second promise was resolved');
  };

  document.addEventListener('click', handleClick);
  document.addEventListener('contextmenu', handleContextMenu);
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

const thirdPromise = new Promise((resolve) => {
  Promise.all([leftClick, rightClick]).then(() => {
    resolve('Third promise was resolved');
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

thirdPromise
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
