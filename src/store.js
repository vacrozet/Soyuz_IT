import { observable, action } from 'mobx'

class Store {
  @observable login = false
  @observable drawer = false
  @observable dialogPassword = false
  // @observable UserConnected = []
  // @observable noti = []

  @action
  logged (res) {
    this.login = res
    console.log(res)
  }
  @action
  drowerAppBar (res) {
    this.drawer = res
  }
  @action
  toggleDialogPassword (res) {
    this.dialogPassword = res
  }
}
let store = new Store()
export default store
export { Store }
