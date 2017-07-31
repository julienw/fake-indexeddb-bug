function openDb() {
  return new Promise((resolve, reject) => {
    var request = FakeIndexedDB.open("test", 3);
    request.onupgradeneeded = function () {
      var db = request.result;
      var store = db.createObjectStore("books", {keyPath: "isbn"});
    }
    request.onsuccess = function (event) {
      var db = event.target.result;
      resolve(db);
    };
  });
}

openDb();

openDb().then(db => {
  db.transaction("books");
  console.log('All good!');
});
