const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // --> metodo de loggin
const encrypt = require('./encript');
const pool = require('../database');

passport.use('local.signin', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE username = ?', [username]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await encrypt.matchPassword(password, user.password)
    if (validPassword) {
      console.log("usuario logeado con exito");
      done(null, user);
    } else {
      console.log("contrasena incorrecta");
      done(null, false);
    }
  } else {
    return done(null, false);
  }
}
));

passport.use('local.signup', new LocalStrategy({
  usernameField: 'username',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, username, password, done) => {
  const { email, phone_number, firstName, lastName } = req.body;

  const id_role = req.roleDefault;
  const data = [firstName, lastName];
  const name = data.join(' ');

  let newUser = {
    name,
    username,
    password,
    email,
    phone_number,
    id_role
  };
  newUser.password = await encrypt.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO users SET ? ', newUser);
  newUser.id = result.insertId;
  return done(null, newUser);
}));



passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
  done(null, rows[0]);
});


