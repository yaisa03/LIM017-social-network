export const ResetPassword = () => {
  const errorMessage = '<p id="message"></p>';
  const containerLogo = `<figure class="containerLogo">
                           <img src="Images/Icon.png" class="foodBookIcon">
                           <figcaption>FoodBook</figcaption>
                           </figure>`;
  const containerResetPassword = `<div id="containerResetPassword">
                                   <input type="text" id="emailReset" placeholder="Ingresa tu correo">
                                  </div>`;
  const resetPasswordButton = '<button id="resetPasswordButton">Reestablecer contraseña</button>';
  const resetPasswordDivs = errorMessage + containerLogo + containerResetPassword + resetPasswordButton;
  return resetPasswordDivs;
};
