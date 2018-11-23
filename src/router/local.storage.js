import store from 'store';
import expirePlugin from 'store/plugins/expire';
store.addPlugin(expirePlugin);
 
//加载插件后的store
export { store };
 
// 登录的信息
export const getLogin = function () {
  const token = store.get('admin_login_token'); 
  return token || '';
};