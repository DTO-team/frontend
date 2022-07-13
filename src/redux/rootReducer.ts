import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import mailReducer from './slices/mail';
import chatReducer from './slices/chat';
import blogReducer from './slices/blog';
import userReducer from './slices/user';
import lecturerReducer from './slices/lecturer';
import studentReducer from './slices/student';
import teamReducer from './slices/team';
import accountReducer from './slices/account';
import productReducer from './slices/product';
import calendarReducer from './slices/calendar';
import kanbanReducer from './slices/kanban';
import managementReducer from './slices/management';
import topicReducer from './slices/topic';
import applicationReducer from './slices/team-application';
import reportReducer from './slices/report';
import projectReducer from './slices/project';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const productPersistConfig = {
  key: 'product',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['sortBy', 'checkout']
};

const rootReducer = combineReducers({
  mail: mailReducer,
  chat: chatReducer,
  blog: blogReducer,
  user: userReducer,
  lecturer: lecturerReducer,
  student: studentReducer,
  team: teamReducer,
  calendar: calendarReducer,
  kanban: kanbanReducer,
  product: persistReducer(productPersistConfig, productReducer),
  account: accountReducer,
  management: managementReducer,
  topic: topicReducer,
  application: applicationReducer,
  report: reportReducer,
  project: projectReducer
});

export { rootPersistConfig, rootReducer };
