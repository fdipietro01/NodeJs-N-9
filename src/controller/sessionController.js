const { validatePassword, cryptPass } = require("../utils/bcrypt");
const { generateToken } = require("../utils/token");
const UserManager = require("../daos/mongoDaos/UsersManager");
const cookieField = process.env.COOKIE_FIELD;

class SessionControler {
  async login(req, res) {
    const { email, password } = req.body;
    const user = await UserManager.getSingleUser(email);
    if (!user)
      return res.render("sessionAlert", {
        message: "No existe el usuario",
        url: "/login",
        case: "Login",
      });
    if (!validatePassword(user, password))
      return res.render("sessionAlert", {
        message: "Password Incorrecta",
        url: "/login",
        case: "Login",
      });
    delete user.password;
    const token = generateToken(user);
    req.user = user;
    res.cookie(cookieField, token, { maxAge: 60 * 60 * 1000, httpOnly: true });
    res.redirect("/home");
  }

  async register(req, res) {
    const { email, password, nombre, apellido, edad, isAdmin } = req.body;
    const usr = await UserManager.getSingleUser(email);

    if (usr) {
      return res.render("sessionAlert", {
        success: false,
        message: "Usuario ya registrado",
        case: "Registro",
        url: "/login",
      });
    }
    const user = {
      nombre,
      apellido,
      email,
      password: cryptPass(password),
      edad,
      role: isAdmin ? "admin" : "user",
    };
    try {
      await UserManager.createUser(user);
      const token = generateToken(user);
      res.cookie(res, token);

      res.render("sessionAlert", {
        success: true,
        message: `${user.nombre} ${user.apellido} te has registrado exitosamente`,
        url: "/login",
        case: "Login",
      });
    } catch (err) {
      console.log(err);
      res.render("sessionAlert", {
        message: `Error al registrarse`,
        url: "/register",
        case: "Registro",
      });
    }
  }
  async relogin(req, res) {
    const { mail, pass } = req.body;
    if (!mail || !pass)
      return res.render("sessionAlert", {
        success: false,
        message: "Completar todos los campos",
        case: "cambio de contraseña",
        url: "/relogin",
      });
    const user = await UserManager.getSingleUser(mail);
    if (!user)
      return res.render("sessionAlert", {
        success: false,
        message: "Email no registrado",
        case: "cambio de contraseña",
        url: "/relogin",
      });
    else {
      await UserManager.updateUser(mail, cryptPass(pass));
      res.render("sessionAlert", {
        success: true,
        message: `${user.nombre} ${user.apellido} has actualizado tu contraseña exitosamente`,
        url: "/login",
        case: "Login",
      });
    }
  }
  logout(req, res) {
    req.user = "";
    res.clearCookie(cookieField);
    res.redirect("/login");
  }
  current(req, res) {
    res.render("currentUser", { user: req.user });
  }
}

module.exports = new SessionControler();
