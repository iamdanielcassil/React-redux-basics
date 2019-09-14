import { firestore } from "./foundations/firebase";

const db = firestore();

class Data {
  init(user) {
    if (!user) {
      throw new Error("Must have valid user to init data layer");
    }
    console.log("data inited with user: ", user);
    this.user = user;
    this.inited = true;
  }

  getCollectionQuery(collection) {
    if (!this.inited) {
      Promise.reject();
    } else {
      return db.collection(collection);
    }
  }

  listen(collectionKey, callback) {
    let query = this.getCollectionQuery(collectionKey);

    if (query === undefined) {
      return;
    }

    console.log("setup snapshot");
    query.onSnapshot(snapshot => {
      let data = [];

      console.log("listen", snapshot.docs);
      snapshot.docs.forEach(doc => {
        if (doc && typeof doc.data === "function") {
          let result = doc.data();

          result.id = doc.id;
          data.push(result);
        }
      });

      callback(data);
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
