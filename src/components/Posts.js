export const Posts = () => {
  const containerPosts = `<header>
                           <nav>
                            <ul>
                             <li><i id="Homeicon" class="fa fa-home"> </i></li>
                             <li><i id="Usericon" class="fa fa-user" > </i></li>
                             <li><i id="Bellicon" class="fa fa-bell" > </i></li>
                            </ul>
                           </nav>
                          </header>
                          <div id="SearchContainer">
                          <input id="searchPost" type="text" placeholder="Buscar">
                          <i class="fa fa-search-minus"></i>
                          </div>
                          <button id="postButton">Nuevo Post</button>`;
  return containerPosts;
};
/* <li><i class="fa fa-home"></i></li>
                             <li><i class="fa fa-user"></i></li>
                             <li><i class="fa fa-bell"></i></li> */
