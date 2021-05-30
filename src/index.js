let state = {
  users: [],
  posts: [],
  comments: [],
};

const rootEl = document.querySelector("#root");
const headerEl = document.createElement("header");
headerEl.setAttribute("class", "main-header");
const mainEl = document.createElement("main");
mainEl.setAttribute("class", "wrapper");
const wrapperEl = document.createElement("div");
wrapperEl.setAttribute("class", "wrapper");
rootEl.append(headerEl, mainEl);
headerEl.append(wrapperEl);
console.log("rootEl :", rootEl);

function createUserChip(user) {
  const chipEl = document.createElement("div");
  chipEl.setAttribute("class", "chip");

  const avatarSmallEl = document.createElement("div");
  avatarSmallEl.setAttribute("class", "avatar-small");

  const imgEl = document.createElement("img");
  imgEl.setAttribute("src", user.avatar);
  imgEl.setAttribute("alt", user.username);

  avatarSmallEl.append(imgEl);

  const spanEl = document.createElement("span");
  spanEl.innerText = user.username;

  chipEl.append(avatarSmallEl, spanEl);
  wrapperEl.append(chipEl);
}

function createUserChips(users) {
  for (const user of users) {
    createUserChip(user);
  }
}

function getUsersFromServerToMakeChips() {
  fetch("http://localhost:3000/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      state.users = users;
      createUserChips(users);
    });
}

function createMainSection() {
  const createPostEl = document.createElement("section");
  createPostEl.setAttribute("class", "create-post-section");

  const feedEl = document.createElement("section");
  feedEl.setAttribute("class", "feed");

  mainEl.append(createPostEl);
}

function createPostSection() {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "create-post-form");
  formEl.setAttribute("autocomplete", "off");

  formEl.addEventListener("submit", function (event) {
    console.log("you hit post - good boy");
    event.preventDefault();

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: { src: imageInputEl.value },
        title: titleInputEl.value,
        content: textAreaEl.value,
      }),
    });
    formEl.reset();
  });

  const h2El = document.createElement("h2");
  h2El.innerText = "Create a post";

  const ImageEl = document.createElement("label");
  ImageEl.setAttribute("for", "image");
  ImageEl.innerText = "Image";

  const imageInputEl = document.createElement("input");
  imageInputEl.setAttribute("id", "image");
  imageInputEl.setAttribute("name", "image");
  imageInputEl.setAttribute("type", "text");

  const titleEl = document.createElement("label");
  titleEl.setAttribute("for", "title");
  titleEl.innerText = "Title";

  const titleInputEl = document.createElement("input");
  titleInputEl.setAttribute("id", "title");
  titleInputEl.setAttribute("name", "title");
  titleInputEl.setAttribute("type", "text");

  const contentLabel = document.createElement("lable");
  contentLabel.setAttribute("for", "content");
  contentLabel.innerText = "Content";

  const textAreaEl = document.createElement("textarea");
  textAreaEl.setAttribute("id", "content");
  textAreaEl.setAttribute("name", "content");
  textAreaEl.setAttribute("rows", "2");
  textAreaEl.setAttribute("columns", "30");

  const actionButtons = document.createElement("div");

  const idButton = document.createElement("button");
  idButton.setAttribute("id", "preview-btn");
  idButton.setAttribute("type", "button");
  idButton.innerText = "Preview";

  const submitButton = document.createElement("button");
  submitButton.setAttribute("type", "submit");
  submitButton.innerText = "Post";

  actionButtons.append(idButton, submitButton);
  formEl.append(
    h2El,
    ImageEl,
    imageInputEl,
    titleEl,
    titleInputEl,
    contentLabel,
    textAreaEl,
    actionButtons
  );

  const getCreatePostSection = document.querySelector(".create-post-section");
  getCreatePostSection.append(formEl);
}

function createFeedSection(post) {
  const feedEl = document.createElement("section");
  feedEl.setAttribute("class", "feed");

  const ulEl = document.createElement("ul");
  ulEl.setAttribute("class", "stack");

  const liEl = document.createElement("li");
  liEl.setAttribute("class", "post");

  const chipDivEl = document.createElement("div");
  chipDivEl.setAttribute("class", "chip");

  const avatarDivEl = document.createElement("div");
  avatarDivEl.setAttribute("class", "avatar-small");

  const foundUser = state.users.find(function (user) {
    return user.id === post.userId;
  });

  const createSpanEl = document.createElement("span");
  createSpanEl.innerText = foundUser.username;

  const foundUserIcon = state.users.find(function (user) {
    return user.id === post.userId;
  });

  const createImgEl = document.createElement("img");
  createImgEl.setAttribute("src", foundUserIcon.avatar);

  createImgEl.setAttribute("alt", "Salvador Dali");

  const postImageDiv = document.createElement("div");
  postImageDiv.setAttribute("class", "post--image");

  const postImgEl = document.createElement("img");
  postImgEl.setAttribute("src", post.image.src);
  postImgEl.setAttribute("alt", post.image.alt);

  const postContentDivEl = document.createElement("div");
  postContentDivEl.setAttribute("class", "post--content");

  const postContentH2El = document.createElement("h2");
  postContentH2El.innerText = post.title;

  const postContentPtagEl = document.createElement("p");
  postContentPtagEl.innerText = post.content;

  postContentDivEl.append(postContentH2El, postContentPtagEl);

  const postCommentsDivEl = document.createElement("div");
  postCommentsDivEl.setAttribute("class", "post--comments");

  const postCommentsH3El = document.createElement("h3");
  postCommentsH3El.innerText = "Comments";

  const postCommentDivEl = document.createElement("div");
  postCommentDivEl.setAttribute("class", "post--comment");

  const commentAvatarSmallEL = document.createElement("div");
  commentAvatarSmallEL.setAttribute("class", "avatar-small");

  const commentImageEl = document.createElement("img");
  commentImageEl.setAttribute(
    "src",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3K588mpXWsXuFcE26ZsuTRN2IeFeKCub8hA&amp;usqp=CAU"
  );
  commentImageEl.setAttribute("alt", "Van Gogh");

  const commentPTagEl = document.createElement("p");
  commentPTagEl.innerText = "What a great photo!!";

  const commentFormEl = document.createElement("form");
  commentFormEl.setAttribute("is", "create-comment-form");
  commentFormEl.setAttribute("autocomplete", "off");

  const commentLabelEl = document.createElement("label");
  commentLabelEl.setAttribute("for", "comment");
  commentLabelEl.innerText = "Add comment ";

  const commentInputEl = document.createElement("input");
  commentInputEl.setAttribute("id", "comment");
  commentInputEl.setAttribute("name", "comment");
  commentInputEl.setAttribute("type", "text");

  const submitButtonEl = document.createElement("button");
  submitButtonEl.setAttribute("type", "submit");
  submitButtonEl.innerText = "Comment";

  avatarDivEl.append(createImgEl);
  chipDivEl.append(avatarDivEl, createSpanEl);
  postImageDiv.append(postImgEl);
  commentAvatarSmallEL.append(commentImageEl);
  commentFormEl.append(commentLabelEl, commentInputEl, submitButtonEl);
  postCommentDivEl.append(commentAvatarSmallEL, commentPTagEl);
  postCommentsDivEl.append(postCommentsH3El, postCommentDivEl, commentFormEl);

  liEl.append(
    chipDivEl,
    postImageDiv,
    postContentDivEl,
    commentFormEl,
    postCommentsDivEl
  );
  ulEl.append(liEl);

  feedEl.append(ulEl);
  mainEl.append(feedEl);
}

function createAllTheFeedSections(posts) {
  for (const post of posts) {
    createFeedSection(post);
  }
}

function getPostsFromServer() {
  fetch("http://localhost:3000/posts")
    .then(function (response) {
      return response.json();
    })
    .then(function (posts) {
      state.posts = posts;
      createAllTheFeedSections(posts);
    });
}

function getCommentsFromServer() {
  fetch("http://localhost:3000/comments")
    .then(function (response) {
      return response.json();
    })
    .then(function (comments) {
      state.comments = comments;
      //   createAllTheComments(comments);
    });
}

// calling functions that need to run

getUsersFromServerToMakeChips();
createMainSection();
createPostSection();
getPostsFromServer();
getCommentsFromServer();

// just hard coding today more or less then i'll work on the fetches tomorrow
