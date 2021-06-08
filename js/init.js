function initApp() {
  var myStorage = window.localStorage;
  var categories = JSON.parse(myStorage.getItem("categories"));
  if (!categories) {
    var categoryItems = [
      { id: 0, name: "Work" },
      { id: 1, name: "Food" },
      { id: 2, name: "Home" },
    ];
    myStorage.setItem("categories", JSON.stringify(categoryItems));
    return categoryItems;
  } else {
    return categories;
  }
}
