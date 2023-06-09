const autorization = (role) => async (req, res, next) => {
  if (!req.user)
    return res.render("sessionAlert", {
      message: "Usuario no autenticado",
      case: "Login",
      url: "/login",
    });
  if (req.user.role !== role)
    return res.render("sessionAlert", {
      message: "Usuario sin permisos para realizar la acción",
      case: "Home",
      url: "/home",
    });
  next();
};

module.exports = autorization;
