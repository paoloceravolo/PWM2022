self.addEventListener('message', function (e) {

  // get data passed to worker
  let data = e.data;

  // get data from index DB
  let open = indexedDB.open("database", 1);

  switch (data.cmd) {

    //command count visit
    case 'set-count-visit':

      console.log("set-count-visit");

      open.onsuccess = function () {

        // Start a new transaction
        let db = open.result;
        let tx = db.transaction("count-times", "readwrite");
        let store = tx.objectStore("count-times");

        let getData = store.get(data.id);
        let numTimes;

        getData.onsuccess = function () {

          if (getData.result === undefined) {
            numTimes = 0;
          } else {
            numTimes = getData.result.count;
          }

          numTimes++;
          store.put({ id: data.id, count: numTimes });
          self.postMessage({ 'result': numTimes, 'status': 'OK' });
        };

        // Close the db when the transaction is done
        tx.oncomplete = function () {
          db.close();
        };

      }
      break;

    case 'get-count-visit':

      console.log("get-count-visit");

      open.onsuccess = function () {

        // Start a new transaction
        let db = open.result;
        let tx = db.transaction("count-times", "readwrite");
        let store = tx.objectStore("count-times");

        let getData = store.get(data.id);
        let numTimes;

        getData.onsuccess = function () {

          if (getData.result === undefined) {
            numTimes = 0;
          } else {
            numTimes = getData.result.count;
          }
          self.postMessage({ 'result': numTimes, 'status': 'OK' });
        };

        // Close the db when the transaction is done
        tx.oncomplete = function () {
          db.close();
        };

      }
      break;

    //unknown command
    default:
      self.postMessage({ 'result': 'error', 'status': 'error' });
      break;
  }
}, false);