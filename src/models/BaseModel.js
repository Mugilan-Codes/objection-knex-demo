import { Model } from 'objection';

// REF: require-loops - https://vincit.github.io/objection.js/guide/relations.html#require-loops
// REF: modelPaths - https://vincit.github.io/objection.js/api/model/static-properties.html#static-modelpaths
// HACK: To get rid of require-loops error, defined a BaseModel Class and used that to extend other classes

// REF: Dynamic Imports in ES6 - https://javascript.info/modules-dynamic-imports
// REVIEW: modelClass: (async () => await import('./Video'))()
class BaseModel extends Model {
  static get modelPaths() {
    return [__dirname];
  }
}

export default BaseModel;
