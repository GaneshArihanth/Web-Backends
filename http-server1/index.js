const express = require('express');
const app = express();
const port = 3001;

app.use(express.json()); 

const users = [{
  name: "Ganesh",
  age: 19,
  city: 'New York City',
  Banks: [
    { bank: true },
    { bank: false },
    { bank: false }
  ]
}];

app.get('/', function (req, res) {

  const activeBank = req.query.activeBank;

  for(let i = 0; i < activeBank; i++){
    users[0].Banks.push({
      bank: true
    });
  }

  const nonActiveBank = req.query.nonActiveBank;

  for(let i = 0; i < nonActiveBank; i++){
    users[0].Banks.push({
      bank: false
    });
  }

  const allBanks = users[0].Banks;
  const numberOfBanks = allBanks.length;

  let numberOfActiveBanks = 0;

  for (let i = 0; i < numberOfBanks; i++) {
    if (allBanks[i].bank) {
      numberOfActiveBanks++;
    }
  }

  let numberOfInactiveBanks = 0 

  for (let i = 0; i < numberOfBanks; i++) {
    if (!allBanks[i].bank) {
      numberOfInactiveBanks++;
    }
  }

  res.json({
    numberOfBanks,
    numberOfActiveBanks,
    numberOfInactiveBanks,
  });
});

app.post('/', function (req, res) {

  const valBank = req.body.valBank;
  users[0].Banks.push({
    bank: valBank
  });

  res.json({
    message: "Bank added successfully"
  });

});

app.listen(port);
