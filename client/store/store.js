import AppStateClass from './app_state';

export const AppState = AppStateClass;

export default {
  AppState,
}

export const createStoreMap = () => {
  return {
    appState: new AppState(),
  }
}
