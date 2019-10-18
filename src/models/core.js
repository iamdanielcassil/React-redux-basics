import data from "../data";

export default {
  update: (changes, model) => {
    Object.keys(changes).forEach(key => {
      if (model.hasOwnProperty(key)) {
        model[key] = changes[key];
      } else {
        console.warn(`Tried to update non own property {${key}}`);
      }
    });

    // if (model.isNew) {
    //   return;
    // }

    // if (timeOutVar[model.id]) {
    //   window.clearTimeout(timeOutVar[model.id]);
    // }

    // timeOutVar[model.id] = window.setTimeout(() => {
    //   model.save();
    // }, 500);

    return model;
  },

  save: model => {
    let modelData = model.get();

    if (model.isNew) {
      // TODO - do simple id not this.
      modelData.id = new Date().getTime();
    }
    return data.getCollectionDoc(model.apiRoute).then(collection => {
      let doc = collection.doc(modelData.id.toString());

      doc.set(modelData);
      return modelData;
    });
  },

  delete: model => {
    let modelData = model.get();

    if (model.isNew) {
      // do something
      return;
    }

    return data.getCollectionDoc(model.apiRoute).then(collection => {
      let doc = collection.doc(modelData.id.toString());

      return doc.delete();
    });
  }
};
