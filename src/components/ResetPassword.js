/* istanbul ignore file */
export const ResetPassword = () => {
  const containerResetPassword = `<p id="message"></p>
                            <figure class="containerLogo">
                           <img src="Images/Icon.png" class="foodBookIcon">
                           <figcaption>FoodBook</figcaption>
                           </figure>
                            <div id="containerResetPassword">
                                   <input type="text" id="emailReset" placeholder="Ingresa tu correo">
                                  </div>
                                <button id="resetPasswordButton">Reestablecer contraseña</button>
                                <button class="backToLogIn">Volver a Login</button>`;
  return containerResetPassword;
};
