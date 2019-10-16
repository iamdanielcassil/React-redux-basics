import {firestore} from "./foundations/firebase";

const db = firestore();

let initResolve;
let initPromise = new Promise(resolve => {
  initResolve = resolve;
});

let lastInitedUser = -1;
let _groupId = "demo";

class Data {
  init(user) {
    if (lastInitedUser !== user) {
      this.db = db;
      window.DC.debug.log("data inited with user: ", user);
      this.user = user;
      this.inited = true;
      this.getUserGroup().then(groupId => {
        console.log("if this is hit multiple times then wtf", groupId);
        _groupId = groupId;
        initResolve();
      });
    }

    lastInitedUser = user;
  }

  clearUserGroup() {
    if (window.localStorage) {
      window.localStorage.removeItem("ocbc_group");
      console.log(
        "clear local storage",
        window.localStorage.getItem("ocbc_group")
      );
    }
  }

  getUserGroup() {
    let groupId;

    if (window.localStorage) {
      groupId = window.localStorage.getItem("ocbc_group");
    }

    if (groupId) {
      console.log("using group id from local storage", groupId);
      return Promise.resolve(groupId);
    }

    console.log("user in get group", this.user);
    if (!this.user || !this.user.uid) {
      return Promise.resolve(_groupId);
    }

    console.log("user group pre doc", this.user.uid);
    let doc = db.collection("user").doc(this.user.uid);
    console.log("doc in get group", doc, doc.exists);
    return doc
      .get()
      .then(_doc => {
        if (_doc.exists) {
          let data = _doc.data();
          let groupId = data.groupId;
          console.log("in promise for user doc", groupId);
          if (window.localStorage) {
            window.localStorage.setItem("ocbc_group", groupId);
          }
          return groupId;
        } else {
          console.log("fallback to demo group", _groupId);
          return "demo";
        }
      })
      .catch(() => {
        console.log("in catch group", _groupId);
        return "demo";
      });
  }

  _getGroupQuery() {
    if (!_groupId) {
      console.warn("no group set");
      throw new Error("no group");
      // _groupId = "demo";
    }
    console.log("query with collection group and doc ", _groupId);
    return db.collection("group").doc(_groupId);
  }

  _getCollectionQuery(collectionKey) {
    console.log("query with collection", collectionKey);
    return this._getGroupQuery().collection(collectionKey);
  }

  getCollectionDoc(collectionKey, docKey) {
    let __get = () => {
      if (docKey) {
        let doc = this._getCollectionQuery(collectionKey).doc(docKey);
        if (doc.exists) {
          return doc.get().then(doc => {
            return doc.data();
          });
        }
      } else {
        return this._getCollectionQuery(collectionKey);
      }
    };

    if (!this.inited) {
      window.DC.debug.log("used before ready, waiting on init resolve");
      return initPromise.then(() => {
        return __get();
      });
    } else {
      return Promise.resolve(__get());
    }
  }

  listen(collectionKey, callback) {
    console.log("get collection,", collectionKey);
    let queryPrmoise = this.getCollectionDoc(collectionKey);

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
