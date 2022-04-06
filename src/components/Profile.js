// eslint-disable-next-line import/no-cycle
import { getUser } from '../lib/Firestore.js';

export const Profile = () => {
  const user = getUser();
  let url = '';
  if (user.photoURL === null) {
    url = 'Images/userImage.jpeg';
  } else {
    url = user.photoURL;
  }
  const errorMessage = '<p id="message"></p>';
  const containerProfile = `<header>
                             <nav>
                              <ul>
                               <li><i id="Homeicon" class="fa fa-home"> </i></li>
                               <li><i id="Usericon" class="fa fa-user" > </i></li>
                               <li><i id="Bellicon" class="fa fa-bell" > </i></li>
                               <li><i id="logOut" class="fa fa-power-off"></i></li>
                              </ul>
                             </nav>
                            </header>
                            <main id="mainContainer">
                              <div id="profileInfo">
                                <img id="profilePhoto" src= ${url} class="profilePicture">
                                <button id="EditPhoto"> Editar Foto </button>
                                <div class="container" id="cont">
      <div class="modal">
        <h3>Elige la imagen</h3>
        <label for="chooseFile" class="chooseImage"> Click para elegir</label>
        <input
          id="chooseFile"
          type="file"
          accept=".png, .jpg, .jpeg"
          class="choose"
          style="display: none;"
        />
        <div id="info"></div>
        <button id="uploadImage">Subir</button>
      </div>
    </div>  
                                <div id="containerUser">
                                    <p id="userName">${user.displayName}</p>
                                    <p id="userEmail">${user.email}</p>
                                    <button id="editProfileButton">Editar Perfil</button>
                            </div>
                            </div>
                            <div id="PageContent">
                            <form id="createPost">
                             <p id="messagePost"></p>
                             <input id="title" placeholder="Titulo">
                             <textarea id="post" placeholder="Descripcion"></textarea>
                             <button id="postButton">Publicar</button>
                            </form>
                            <div id="postsContainer"></div>
                            </div>
                            </main>`;
  const profileDivs = errorMessage + containerProfile;
  return profileDivs;
};
