function logoutUser(event) { 
  axios
    .delete("/api/sessions")
    .then(() => {
      window.location = "/";
    })
}