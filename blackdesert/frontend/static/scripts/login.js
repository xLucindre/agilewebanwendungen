function toggleLogin(loggedIn) {
  if (loggedIn) {
    fetch("/backend/logout/", {
      method: "POST",
      headers: {
        "X-CSRFToken": document
          .querySelector('meta[name="csrf-token"]')
          .getAttribute("content"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.redirect) {
          window.location.href = data.redirect;
        }
      });
  } else {
    window.location.href = "/login";
  }
}
