import { observable, action } from 'mobx'

class Store {
  @observable login = false
  @observable drawer = false
  @observable dialogPassword = false
  @observable dialogOpen = false
  @observable dialgTitle = ''
  @observable dialogText = ''
  @observable dialogDoubleButton = false

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
  @action
  openDialogInfo (open, title, text) {
    this.dialogOpen = open
    this.dialogTitle = title
    this.dialogText = text
  }
}
let store = new Store()
export default store
export { Store }
