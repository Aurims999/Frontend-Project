var gridButton = document.querySelector("button.gridLayout");
var listButton = document.querySelector("button.listLayout");
var contentBlock = document.querySelector(".dataContainer");

gridButton.addEventListener("click", () => {
  contentBlock.className = "grid";
});

listButton.addEventListener("click", () => {
  contentBlock.className = "list";
});
