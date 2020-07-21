// $(document).ready(function () {
//         // Getting references to our form and input

// const commentForm = $("form#comment");
// const userTextInput = $("textarea.userText");
// const badStar = $("button#badStar");
// const okStar = $("span#okStar");
// const goodStar = $("span#goodStar");

// commentForm.on("submit", (event) => {
//     event.preventDefault()
//     const userCommentId = $(".userText").id
    
//   console.log(userCommentId)


//       // const id = event.target.id;
//       // const ajaxOptions = {
//       //   url: `/api/foods/${id}`,
//       //   method: "PUT",
//       // };
    
//       // const onData = () => {
//       //   window.location.reload();
//       // };
    
//       // $.ajax(ajaxOptions).then(onData);
//     });
// })
//     // // Getting references to our form and input
//     // var signUpForm = $("form#signup");
//     // var emailInput = $("input#username");
//     // var passwordInput = $("input#password");
  
//     // // When the signup button is clicked, we validate the email and password are not blank
//     // signUpForm.on("submit", function (event) {
//     //   event.preventDefault();
//     //   var userData = {
//     //     email: emailInput.val().trim(),
//     //     password: passwordInput.val().trim(),
//     //   };
  
//     //   if (!userData.email || !userData.password) {
//     //     return;
//     //   }
//     //   // If we have an email and password, run the signUpUser function
//     //   signUpUser(userData.email, userData.password);
//     //   emailInput.val("");
//     //   passwordInput.val("");
//     // });
  
//     // // Does a post to the signup route. If successful, we are redirected to the members page
//     // // Otherwise we log any errors
//     // function signUpUser(email, password) {
//     //   $.post("/api/auth/signup", {
//     //     email: email,
//     //     password: password,
//     //   })
//     //     .then(function (data) {
//     //       window.location.replace("/login");
//     //       // If there's an error, handle it by throwing up a bootstrap alert
//     //     })
//     //     .catch(handleLoginErr);
//     // }
  
//     // function handleLoginErr(err) {
//     //   $("#alert .msg").text(err.responseJSON);
//     //   $("#alert").fadeIn(500);
//     // }
//   // });
  