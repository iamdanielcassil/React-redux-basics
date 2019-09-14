import { firestore } from "./foundations/firebase";

const db = firestore();

export default class Data {
  constructor(user) {
    console.log("data inited with user: ", user);
    this.user = user;
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

window.dcdata = new Data();
