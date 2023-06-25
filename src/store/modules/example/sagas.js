import {
  call, put, all, takeLatest,
} from 'redux-saga/effects';
import { toast } from 'react-toastify';

import * as action from './actions';
import * as types from '../types';

// eslint-disable-next-line no-unused-vars
const req = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve();
  }, 500);
});

function* exampleReq() {
  try {
    yield call(req);
    toast.success('Success');
    yield put(action.clickButtonSuccess());
  } catch (error) {
    toast.error('Error');
    yield put(action.clickButtonFailure());
  }
}

export default all([takeLatest(types.CLICKED_BUTTON_REQUEST, exampleReq)]);
