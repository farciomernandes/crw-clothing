import { call, put, takeLatest, all } from 'redux-saga/effects';
import { firestore, convertCollecitonSnapshotToMap } from '../../firebase/firebase.utils';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shop.actions.js'

import ShopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    yield console.log('I am fired');
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(
            convertCollecitonSnapshotToMap,
          snapshot
        );
        yield put(fetchCollectionsSuccess(collectionsMap));
      } catch (error) {
        yield put(fetchCollectionsFailure(error.message));
      }
}
export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync)
}

export function* shopSagas(){
  yield all([
    call(fetchCollectionsStart)
  ])
}