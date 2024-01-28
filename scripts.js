var contentBlock = document.querySelector(".dataContainer");

function loadContentBlock() {
  var layout = sessionStorage.getItem("layoutMode");
  if (layout != null) {
    contentBlock.className = layout.toString();
  }
}

loadContentBlock();
