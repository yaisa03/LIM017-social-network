/* istanbul ignore file */
export const Register = () => {
  const containerNewRegister = `<p id="message"></p>
                         <figure class="containerLogo">
                         <img src="Images/Icon.png" class="foodBookIcon">
                         <figcaption>FoodBook</figcaption>
                         </figure>
                         <div id="containerNewRegister">
                                 <input type="text" id="newUserDisplayName" placeholder="Ingresa tu nombre de usuario">
                                 <input type="text" id="newUser" placeholder="Ingresa tu correo">
                                 <div id="newPasswordContainer">
                                   <input type="password" id="newUserPassword" placeholder="Ingresa tu nueva constraseña">
                                   <i class="fa fa-eye" id="eyeLogo2"></i>
                                   <i class="fa fa-eye-slash" id="eyeSlashLogo2" style="display: none;"></i>
                                 </div>
                                 <div id="newPasswordContainer2">
                                   <input type="password" id="newUserPassword2" placeholder="Confirma tu nueva constraseña">
                                   <i class="fa fa-eye" id="eyeLogo3"></i>
                                   <i class="fa fa-eye-slash" id="eyeSlashLogo3" style="display: none;"></i>
                                 </div>
                          </div>
                                <button id="registerButton">Registrate</button>
                                <button class="backToLogIn">Volver a Login</button>`;
  const registerDivs = containerNewRegister;
  return registerDivs;
};
