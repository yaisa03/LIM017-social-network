export const Posts = () => {
  const containerPosts = `<header>
                           <nav>
                            <ul>
                             <li><i id="Homeicon" class="fa fa-home"> </i></li>
                             <li><i id="Usericon" class="fa fa-user" > </i></li>
                             <li><i id="Bellicon" class="fa fa-bell" > </i></li>
                             <li><i id="logOut" class="fa fa-power-off"></i></li>
                            </ul>
                           </nav>
                          </header>
                          <div id="SearchContainer">
                          <input id="searchPost" type="text" placeholder="Buscar">
                          <i class="fa fa-search-minus"></i>
                          </div>
                          <form id="createPost">
                           <p id="messagePost"></p>
                           <input id="title" placeholder="Titulo">
                           <textarea id="post" placeholder="Descripcion"></textarea>
                           <button id="postButton">Publicar</button>
                          </form>
                          <div id="postsContainer"></div>`;
  const postsDivs = containerPosts;
  return postsDivs;
};
