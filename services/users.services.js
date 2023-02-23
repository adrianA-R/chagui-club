const boom = require('@hapi/boom');
const pool = require('../database');

class UsersServices{
  constructor(){
    this.users = [];
  }

  static async poolUsers(){
    try{
        this.users = await pool.query("SELECT * FROM users");
    }catch(e){
        console.error(e);
    }
  }

  getUsers(){
    return this.users;
  }

  getUser(id){
    const user = this.users.find(id);
    return user;
  }

}

module.exports = UsersServices;