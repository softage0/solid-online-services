import * as express from 'express';
import * as bodyParser from 'body-parser';

import configs from './configs';
import db from './db';

const app = express();
const router = express.Router();
const Accounts = db.get('accounts');


process.env.TZ = configs.timezone;

app.use(express.static(__dirname + '/static'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/api', router);

// ------------------------------------
// REST API
// ------------------------------------

// create new account
router.post('/api/account', (req, res) => {
  const newAccount = req.query;
  if(!newAccount.id || !newAccount.password) {
    res.statusMessage = 'Invalid credential';
    res.status(401).send();
    return;
  }

  Accounts.findOne({id:newAccount.id}).then(existence => {
    if (existence) {
      res.statusMessage = 'Conflict: duplicate id';
      res.status(409).send();
      return;
    }

    Accounts.insert({
      ...newAccount,
      created_at: new Date(),
    });

    res.send('Success');
  });
});


// show all account list
// POST is used instead of GET since React-router eats all GET request.
// It would rather split api domain and use GET request.
router.post('/account_list', (req, res) => {
  const query = req.query;

  Accounts.find(query).then((function (result) {
    res.json(result);
  }))
});

// show account by id
// POST is used instead of GET since React-router eats all GET request.
// It would rather split api domain and use GET request.
router.post('/account/:id', (req, res) => {
  const id = req.params.id;

  Accounts.findOne({id:id}).then((function (account) {
    if (!account) {
      res.statusMessage = 'invalid account id';
      res.status(404).send();
      return;
    }
    res.json(account);
  }))
});

// modify account detail
router.put('/account', (req, res) => {
  const modifiedAccount = {
    ...req.query,
    modified_at: new Date()
  };

  Accounts.updateById(modifiedAccount._id, modifiedAccount).then(updated => {
    if (!updated) {
      res.statusMessage = `Unable to update account ${modifiedAccount.id}`;
      res.status(405).send();
      return;
    }
    res.json(updated);
  });
});

// login
router.post('/login', (req, res) => {
  const credential = req.query;

  Accounts.findOne({id:credential.id}).then(account => {
    if(!account || account.password !== credential.password) {
      res.statusMessage = 'Invalid credential';
      res.status(401).send();
      return;
    }

    const {password, ...rest} = account;

    res.json(rest);
  });
});

app.listen(configs.serverPort, () => {
  console.log(`Server listening on port ${configs.serverPort}`);
});
