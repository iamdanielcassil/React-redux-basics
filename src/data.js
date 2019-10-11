import { firestore } from "./foundations/firebase";

const db = firestore();

let initResolve;
let initPromise = new Promise(resolve => {
  initResolve = resolve;
});

let lastInitedUser = -1;

class Data {
  init(user) {
    if (lastInitedUser !== user) {
      window.DC.debug.log("data inited with user: ", user);
      this.user = user;
      this.inited = true;
      initResolve();
    }

    lastInitedUser = user;
  }

  getCollectionQuery(collection) {
    if (!this.inited) {
      window.DC.debug.log("used before ready, waiting on init resolve");
      return initPromise.then(() => {
        window.DC.debug.log("init resovled");
        return db.collection(collection);
      });
    } else {
      return Promise.resolve(db.collection(collection));
    }
  }

  listen(collectionKey, callback) {
    let queryPrmoise = this.getCollectionQuery(collectionKey);

    queryPrmoise.then(query => {
      if (query === undefined) {
        return;
      }

      window.DC.debug.log("setup snapshot");
      query.onSnapshot(snapshot => {
        let data = [];

        window.DC.debug.log("listen", snapshot.docs);
        snapshot.docs.forEach(doc => {
          if (doc && typeof doc.data === "function") {
            let result = doc.data();

            result.id = doc.id;
            data.push(result);
          }
        });

        callback(data);
      });
    });
  }

  getUserQuery() {
    if (this.user && Object.keys(this.user).length > 0) {
      return db.collection(this.user.uid);
    } else {
      return {};
    }

    // let user = actions.user.getUser();

    // if (user)
    //   return db.collection('users').doc(user.uid);
    // else
    //   location.href = '#/signin';

    // actions.debug.log('Trying to query user scoped data but not able to get user');
  }
}

const data = new Data();
window.DC = window.DC ? { ...window.DC, data } : { data };
export default data;
