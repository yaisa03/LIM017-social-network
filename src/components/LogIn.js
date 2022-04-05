export const LogIn = () => {
  const errorMessage = '<p id="message"></p>';
  const containerLogo = `<figure class="containerLogo">
                          <img src="Images/Icon.png" class="foodBookIcon">
                          <figcaption>FoodBook</figcaption>
                        </figure>`;
  const containerLogIn = `<div id="containerLogIn">
                          <input type="text" id="user" placeholder="Ingresa tu correo">
                          <div id="passwordContainer">
                          <input type="password" id="password" placeholder="Ingresa tu contraseña"> 
                          <i class="fa fa-eye" id="eyeLogo1" ></i>
                          <i class="fa fa-eye-slash" id="eyeSlashLogo1" style="display: none;"></i>
                          </div>
                          <a id="forgotPassword">¿Olvidaste tu contraseña?</a>
                         </div>`;
  const logInButton = '<button id="logIn">Iniciar Sesion</button>';
  const containerRegister = `<div id="containerRegister">
                              <p>Continuar con:</p>
                              <div id="registerIcons">
                                <img src="Images/google.png" class="googleLogo">
                              </div>
                              <a id="register">¿No tienes cuenta? Registrate</a>
                              </div>`;
  const LogInDivs = errorMessage + containerLogo + containerLogIn + logInButton + containerRegister;
  return LogInDivs;
};
/* <img src="Images/facebook.png" class="facebookLogo"> */
