const db = require('../models/index');

async function makeTestUser () {
    try {
    await db.User.create({
      loginid: 'loginid001',
      username: 'loginname001',
      password: 'loginpassword001',        
    });
  } catch (e) {
    console.log(e);
    console.log('ユーザが作成されませんでした');
  }
} 