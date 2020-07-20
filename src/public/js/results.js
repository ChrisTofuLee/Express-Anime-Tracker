$(document).ready(function () {
    $(".resultSelect").on("click", (event) => {
        event.preventDefault();
        const id = event.target.id

        $.get(`/titles/${id}`)
        .then(function () {
            window.location.replace(`/titles/${id}`);
            // If there's an error, log the error
          })
     
      });
})