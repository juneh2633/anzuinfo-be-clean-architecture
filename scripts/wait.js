// scripts/wait.js
console.log('Waiting for 5 seconds for the database to start...');
setTimeout(() => {
  console.log('Wait finished.');
  process.exit(0);
}, 5000);
