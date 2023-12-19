const fsp = require("fs/promises");
var Spinner = require("cli-spinner").Spinner;

const spinner = new Spinner("processing.. %s");
spinner.setSpinnerString("|/-\\");
spinner.start();

const readFiles = [
  fsp.readFile("challenges/secret-message.txt"),
  fsp.readFile("challenges/super-secret-message.txt"),
];
setTimeout(() => {
  spinner.stop();
}, 1000);

Promise.all(readFiles).then((results) => {
  const lengthSecretMessage = results[0].length;
  const lengthSuperSecretMessage = results[1].length;
  if (lengthSecretMessage < lengthSuperSecretMessage) {
    console.log(
      `super-secret-message has ${
        lengthSuperSecretMessage - lengthSecretMessage
      } more characters`
    );
  } else {
    console.log(
      `secret-message has ${
        lengthSecretMessage - lengthSuperSecretMessage
      } more characters`
    );
  }

  return fsp.writeFile("challenges/mega-secret-message.txt", results);
});
