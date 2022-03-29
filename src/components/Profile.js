export const Profile = () => {
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
                                <img src="Images/Icon.png" class="profilePicture">
                                  <div id="containerUser">
                                    <p id="userName">Username</p>
                                    <p id="userEmail">Correo</p>
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
