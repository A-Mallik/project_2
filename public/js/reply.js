$(document).ready(function() {
  // Getting jQuery references to the post body, title, form, and author select
  var bodyInput = $("#body");
  var cmsForm = $("#cms"); // refers to the similar CMS form back in reply.html
  var authorSelect = $("#author");
  $(cmsForm).on("submit", handleFormSubmit);
  // Gets the part of the url that comes after the "?" (which we have if we're updating a post)
  var url = window.location.search;
  var postId;
  var authorId;
  // Sets a flag for whether or not we're updating a post to be false initially
  var updating = false;

  // If we have this section in our url, we pull out the post id from the url
  // In '?post_id=1', postId is 1
  // we are also getting ?author_id=1'
  if (url.indexOf("?post_id=") !== -1 && (url.indexOf("?author_id=") !== -1)) {
    var splitUrl = url.split("=");
    postId = splitUrl[1].split("?")[0];
    authorId = splitUrl[2]

  }

  getAuthors();

  // A function for handling what happens when the form to create a new post is submitted
  function handleFormSubmit(event) {
    event.preventDefault();
    // Wont submit the post if we are missing a body, title, or author
    if (
      // !titleInput.val().trim()
     !bodyInput.val().trim()
    || !authorSelect.val()) {
      return;
    }
    // Constructing a newPost object to hand to the database
    var newPost = {  // for the replies
      body: bodyInput
        .val()
        .trim(),
      AuthorId: authorId,
      PostId: postId
    };
    console.log(newPost);

      submitPost(newPost); // submit the reply after with this function, also contains the redirect.

  }
  function submitPost(post) {
    $.post("/api/reply", post, function() {
      window.location.href = "/blog-html";
    });
  }

  // A function to get Authors and then render our list of Authors
  function getAuthors() {
    $.get("/api/authors", renderAuthorList);
  }
  // Function to either render a list of authors, or if there are none, direct the user to the page
  // to create an author first
  function renderAuthorList(data) {
    if (!data.length) {
      window.location.href = "/author-manager-html";
    }
    $(".hidden").removeClass("hidden");
    var rowsToAdd = [];
    for (var i = 0; i < data.length; i++) {
      rowsToAdd.push(createAuthorRow(data[i]));
    }
    authorSelect.empty();
    console.log(rowsToAdd);
    console.log(authorSelect);
    authorSelect.append(rowsToAdd);
    authorSelect.val(authorId);
  }

  // Creates the author options in the dropdown
  function createAuthorRow(author) {
    var listOption = $("<option>");
    listOption.attr("value", author.id);
    listOption.text(author.name);
    return listOption;
  }

});
