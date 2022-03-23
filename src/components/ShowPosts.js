export const ShowPosts = (e) => {
  const containerPosts = `<div class="post">
                              <p class="title">${e.postTittle}</p>
                              <p class="description">${e.content}</p>
                              <button id="editButton">Editar</button>
                              <button id="deleteButton">Borrar</button>
                              <button id="likeButton">Me Gusta</button>
                            </div>`;
  return containerPosts;
};
function showPostInPage() {
    const postDataById = findPost();
    const containerPosts = document.getElementById('containerPosts');
    postDataById.forEach((e) => {
      containerPosts.innerHTML += ShowPosts(e);
    });
  }