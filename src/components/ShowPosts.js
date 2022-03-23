export const ShowPosts = (e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <span><i id="likeButton" class="fa fa-heart"></i>0</span>
                            </div>`;
  return containerPosts;
};
export const ShowPostsById = (e) => {
  const containerPosts = `<div class="postDiv">
                              <textarea class="title" readonly>${e.postTitle}</textarea>
                              <textarea class="description" readonly>${e.content}</textarea>
                              <div>
                              <button class="editButton">Editar</button>
                              <button class="deleteButton">Borrar</button>
                              </div>
                            </div>`;
  return containerPosts;
};