// This is a build script to inject API URL into the frontend app
// example: node build http://www.example.com

const { exec } = require("child_process");

const url = `"${process.argv[2]}"`;

exec(`echo 'var URL = ${url}' > API.js`);
