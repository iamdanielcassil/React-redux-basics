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
        _groupId = groupId;
        initResolve();
      });
    }

    lastInitedUser = user;
  }

  clearUserGroup() {
    if (window.localStorage) {
      window.localStorage.removeItem("ocbc_group");
    }
  }

  getUserGroup() {
    let groupId;

    if (window.localStorage) {
      groupId = window.localStorage.getItem("ocbc_group");
    }

    if (groupId) {
      return Promise.resolve(groupId);
    }

    if (!this.user || !this.user.uid) {
      return Promise.resolve(_groupId);
    }

    let doc = db.collection("user").doc(this.user.uid);

    return doc
      .get()
      .then(_doc => {
        if (_doc.exists) {
          let data = _doc.data();
          let groupId = data.groupId;

          if (window.localStorage) {
            window.localStorage.setItem("ocbc_group", groupId);
          }
          return groupId;
        } else {
          return "demo";
        }
      })
      .catch(() => {
        return "demo";
      });
  }

  _getGroupQuery() {
    if (!_groupId) {
      throw new Error("no group");
    }
    return db.collection("group").doc(_groupId);
  }

  _getCollectionQuery(collectionKey) {
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
}

const data = new Data();
window.DC = window.DC ? { ...window.DC, data } : { data };
export default data;
