import { put, call, takeLatest } from "redux-saga/effects";
import { updateParcel as updateParcelApi, updateOrder as updateOrderApi } from '../../../api/order';
import { updateParcelRequest, updateParcelSuccess, updateParcelError, updateOrderRequest, updateOrderSuccess, updateOrderError } from "../../actions/orders";
import { UPDATE_PARCEL, UPDATE_ORDER, FETCH_ORDERS, FETCH_USERS } from "../../../const";
import { History, createBrowserHistory } from 'history';

function* updateParcel(action: any) {
  const { path, data, history } = action;
  yield put(updateParcelRequest());
  try {
    const response = yield call(updateParcelApi, path, data);
    yield put(updateParcelSuccess(response));
    yield history.push('/orders');
  } catch (error) {
    yield put(updateParcelError(error));
  }
}

export function* watchUpdateParcel() {
  yield takeLatest(UPDATE_PARCEL, updateParcel);
}

function* updateOrder(action: any) {
  const { path, data, history } = action;
  yield put(updateOrderRequest());
  
  try {
    const response = yield call(updateOrderApi, path, data);
    yield put(updateOrderSuccess(response));
    yield history.push('/orders');
  } catch (error) {
    yield put(updateOrderError(error));
  }
}

export function* watchUpdateOrder() {
  yield takeLatest(UPDATE_ORDER, updateOrder);
}