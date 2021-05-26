// Description
// In this exercise we explore a multi-user experience most commonly found on social media apps like Instagram, where users
// can see and interact with other users.

// In the template folder you will find examples of the HTML that you can use as a reference to build the exercise, the classes are
// connected to styles/index.css. Start at 1-root.html.

// Ignore the preview feature in the example, we've replaced that feature with an adding likes feature instead (this is not shown in
// any of the templates so you'll have to add the HTML and style it as you see fit).

// Deliverables
// - A user can select the user they want to post or comment as
// - From the create a post section, a user can:
//     - Enter a post's image URL
//     - Enter a post's title
//     - Enter a post's content
//     - Create a post and view it in the feed
// - From the feed section, a user can:
//     - View a post and the owner of the post
//     - View a posts' comments and the owner of the comments
//     - Add a comment to a post
//   - Add a like to a post

// Instructions

// - Create a fetch function to get data
// - Create render functions to show data
// - Use event listeners and fetch to create and update data on the server

// Tips
// - In this exercise focus on practicing Javascript and fetch requests, take your time.
// - Keep track of the currentUser in a global variable so that you have access to their id in all your functions.
// - Think about conditional rendering when creating the preview feature.

// main chunk of code making all top level sections and appending
// I know this probably should be in a function - i'll maybe try to do this later on

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

// function that creates just one user chip - was hard coded now getting info from server
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

// function that makes all the user chips using info from the server
function createUserChips(users) {
  for (const user of users) {
    createUserChip(user);
  }
}

// need a fetch request to read the users from the server to create chips in header
function getUsersFromServerToMakeChips() {
  fetch("http://localhost:3000/users")
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      createUserChips(users);
    });
}

// just making all elements for the main section
function createMainSection() {
  const createPostEl = document.createElement("section");
  createPostEl.setAttribute("class", "create-post-section");

  const feedEl = document.createElement("section");
  feedEl.setAttribute("class", "feed");

  mainEl.append(createPostEl);
}

// just making all elements for the create post section
function createPostSection() {
  const formEl = document.createElement("form");
  formEl.setAttribute("id", "create-post-form");
  formEl.setAttribute("autocomplete", "off");

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

  const getCratePostSection = document.querySelector(".create-post-section");
  getCratePostSection.append(formEl);
}

function createFeedSection() {
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

  const createSpanEl = document.createElement("span");
  createSpanEl.innerText = "Salvador Dali";

  chipDivEl.append(avatarDivEl, createSpanEl);

  const createImgEl = document.createElement("img");
  createImgEl.setAttribute(
    "src",
    "https://uploads5.wikiart.org/images/salvador-dali.jpg!Portrait.jpg"
  );
  createImgEl.setAttribute("alt", "Salvador Dali");

  const postImageDiv = document.createElement("div");
  postImageDiv.setAttribute("class", "post--image");

  const postImgEl = document.createElement("img");
  postImgEl.setAttribute(
    "src",
    "https://images.unsplash.com/photo-1616745309504-0cb79e9ae590?ixid=MXwxMjA3fDB8MHx0b3BpYy1mZWVkfDI0fDZzTVZqVExTa2VRfHxlbnwwfHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=800&amp;q=60"
  );
  postImgEl.setAttribute("alt", "undefined");

  postImageDiv.append(postImgEl);

  const postContentDivEl = document.createElement("div");
  postContentDivEl.setAttribute("class", "post--content");

  const postContentH2El = document.createElement("h2");
  postContentH2El.innerText = "A tree in blossom";

  const postContentPtagEl = document.createElement("p");
  postContentPtagEl.innerText =
    "Spring is finally here... I just love the colours.";

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

  commentAvatarSmallEL.append(commentImageEl);

  const commentPTagEl = document.createElement("p");
  commentPTagEl.innerText = "What a great photo!!";

  postCommentDivEl.append(commentAvatarSmallEL, commentPTagEl);

  const commentFormEl = document.createElement("form");
  commentFormEl.setAttribute("is", "create-comment-form");
  commentFormEl.setAttribute("autocomplete", "off");

  const commentLabelEl = document.createElement("label");
  commentLabelEl.setAttribute("for", "comment");
  commentLabelEl.innerText = "Add comment";

  const commentInputEl = document.createElement("input");
  commentInputEl.setAttribute("id", "comment");
  commentInputEl.setAttribute("name", "comment");
  commentInputEl.setAttribute("type", "text");

  const submitButtonEl = document.createElement("button");
  submitButtonEl.setAttribute("type", "submit");
  submitButtonEl.innerText = "Comment";

  commentFormEl.append(commentLabelEl, commentInputEl, submitButtonEl);

  liEl.append(chipDivEl, postImageDiv, postContentDivEl, commentFormEl);
  ulEl.append(liEl);

  feedEl.append(ulEl);
  mainEl.append(feedEl);
}

// calling functions that need to run
getUsersFromServerToMakeChips();
createMainSection();
createPostSection();
createFeedSection();
