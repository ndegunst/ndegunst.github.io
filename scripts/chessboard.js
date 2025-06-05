window.addEventListener("message", event => {
    const data = event.data;
    const id = data.id;
    const element = document.getElementById(id);
    
    if (data && id === "10477321" && element) {
      element.style.height = `${data.frameHeight + 30}px`;
    }
  });
  