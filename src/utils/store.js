import { observable, action } from 'mobx'

class Store {
  @observable login = false
  @observable nameLogin = ''  
  @observable drawer = false
  @observable dialogPassword = false
  @observable dialogOpen = false
  @observable dialgTitle = ''
  @observable dialogText = ''
  @observable listeSelect = []
  @observable admin = false
  @observable dialogInput = false

  @action
  logged (res) {
    this.login = res
  }
  @action
  nameLogged (res) {
    this.nameLogin = res
  }
  @action
  passAdmin (res) {
    this.admin = res
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
  @action
  openDialogInput (res) {
    this.dialogInput = res
  }
}
let store = new Store()
export default store
export { Store }
