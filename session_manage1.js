import { LightningElement,api,wire } from 'lwc';
import { NavigationMixin,CurrentPageReference } from 'lightning/navigation';
import isGuest from '@salesforce/user/isGuest';


export default class Session_manage1 extends NavigationMixin(LightningElement) {
    currentPageReference = null; 
    urlStateParameters = null;
    url;
    @api
    redirectUrl;
    @api
    pageName;
    @wire(CurrentPageReference)                     //without refreshing like connected callback()
    getPageReferenceParameters(currentPageReference) {
       if (currentPageReference) {
          console.log(currentPageReference);
         /* this.recordId = currentPageReference.attributes.recordId || null;
          let attributes = currentPageReference.attributes;
          let states = currentPageReference.state;
          let type = currentPageReference.type;*/
          this.url = currentPageReference.state?.url;
          this.navigateToWebPage();
       }
    }
    navigateToWebPage() {
        if(isGuest && window.location.href.indexOf('login')!=0){//it is taking login page of storefront
            if(this.redirectUrl){
                window.open(this.redirectUrl,'_self');

            }else{

            console.log('redirect url not available');
            }
        }else{
            window.open(this.url,'_self');
        }
    //     this[NavigationMixin.Navigate]({
    //         type: 'standard__webPage',
    //         attributes: {
    //             url: this.url
    //         }
    //     });
    }      
}