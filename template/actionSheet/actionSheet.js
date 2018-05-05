import Component from '../component'
 function actionSheet(params = {}){
   const DEFAULT = {
     close:false,
     showActionSheet:true,
     header:'',
     hederColor:'',
     itemList:[],
     itemColor:''
   }
   params.itemList = params.itemList.slice(0,6)
   const data = Object.assign({}, DEFAULT, params)
   const component = new Component({
     scope: `temp.actionSheet`,
     data:data,
     methods:{
       ensure(e){
         console.log(e.currentTarget.id)
         this.cancel()
       },
       cancel(){
         this.setData({
           [`${this.params.scope}.close`]: true
         })
         setTimeout(()=>{
           this.setData({
             [`${this.params.scope}.showActionSheet`]: false
           })
         },500)
       },
       setEnsure() {
         this.page.ensure = this.ensure
       },
       setCancel() {
         this.page.cancel = this.cancel
       }
     }
   })
   component.setEnsure()
   component.setCancel()
 }
 export default actionSheet