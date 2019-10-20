import { firestore } from "./foundations/firebase";

const db = firestore();

let initResolve;
let initPromise = new Promise(resolve => {
  initResolve = resolve;
});
let initUserResolve;
let initUserPromise = new Promise(resolve => {
  initUserResolve = resolve;
});

let lastInitedUser = -1;
let _groupId = "demo";

class Data {
  constructor() {}
  init(user) {
    if (lastInitedUser !== user) {
      this.db = db;
      window.DC.debug.log("data inited with user: ", user);
      this.user = user;
      initUserResolve();
      this.inited = true;
      this.getUserClub().then(groupId => {
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

  getFromLocalStore(key) {
    if (window.localStorage) {
      return JSON.parse(window.localStorage.getItem(key));
    }
  }

  setToLocalStore(key, value) {
    if (window.localStorage) {
      return window.localStorage.setItem(key, JSON.stringify(value));
    }
  }

  isUserCacheExpired(cachedUser) {
    let now = new Date().getTime();
    let cacheDate = new Date(cachedUser.time).getTime();

    return now - cacheDate > 360000; // 1 hour
  }

  getLogIsAdmin() {
    let cachedUser = this.getFromLocalStore("ocbc_user");

    if (
      cachedUser &&
      this.user &&
      !this.isUserCacheExpired(cachedUser) &&
      cachedUser.uid === this.user.uid
    ) {
      return Promise.resolve(cachedUser.isAdmin);
    }

    return data.getCollectionDoc("logs").then(collection => {
      let data = {
        uid: this.user.uid,
        userEmail: this.user.email,
        userName: this.user.displayName,
        time: new Date().toLocaleString()
      };
      return collection.add(data).then(() => {
        data.isAdmin = true;
        this.setToLocalStore("ocbc_user", data);
      });
    });
  }

  getClubs() {
    return db
      .collection("public_groups")
      .get()
      .then(collection => {
        return collection.docs.map(doc => doc.exists && doc.data());
      });
  }

  updateUserClub(key) {
    return this._userQuery()
      .then(doc => {
        doc.set({ groupId: key }).then(() => {
          this.setToLocalStore("ocbc_group", key);
        });
      })
      .catch(() => console.log("catch hit in data.updateUserClub"));
  }

  listenToUserClub(cb) {
    let queryPromise = this._userQuery();

    queryPromise.then(query => {
      query.onSnapshot(s => {
        cb(s.data());
      });
    });
  }

  setUserClub(clubId) {
    _groupId = clubId;
    this.setToLocalStore("ocbc_group", clubId);
  }

  getUserClub() {
    let groupId = this.getFromLocalStore("ocbc_group");

    if (groupId) {
      return Promise.resolve(groupId);
    }

    let query = this._userQuery();

    return query.then(doc =>
      doc
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
        })
    );
  }

  _userQuery() {
    return initUserPromise.then(() => {
      return db.collection("user").doc(this.user.uid);
    });
  }

  _getGroupQuery() {
    if (!_groupId) {
      throw new Error("no group");
    }
    return db.collection("group").doc(_groupId);
  }

  _getCollectionQuery(collectionKey) {
    if (collectionKey) {
      return this._getGroupQuery().collection(collectionKey);
    } else {
      return this._getGroupQuery();
    }
  }

  getCollectionDoc(collectionKey, docKey) {
    let __get = () => {
      if (docKey) {
        let doc = this._getCollectionQuery(collectionKey).doc(docKey);
        return doc.get().then(doc => {
          if (doc.exists) {
            return doc.data();
          }
        });
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
      this.onSnapshot(query, callback);
    });
  }

  onSnapshot(query, callback) {
    query.onSnapshot(snapshot => {
      let data = this.getCollectionData(snapshot);

      callback(data);
    });
  }

  getCollectionData(collection) {
    let data = [];

    if (!collection.docs && typeof collection.data === "function") {
      return collection.data();
    }

    collection.docs.forEach(doc => {
      if (doc && typeof doc.data === "function") {
        let result = doc.data();
        result.id = doc.id;
        data.push(result);
      }
    });

    return data;
  }
}

const data = new Data();
window.DC = window.DC ? { ...window.DC, data } : { data };
export default data;
