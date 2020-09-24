import { Component } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core'
import {Router} from '@angular/router';
declare var FB: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('loginRef', {static: true}) loginElement: ElementRef;

  title = 'untitled';
  auth2: any;
  Name: any;
  show: boolean;
  toastr: any;

  // tslint:disable-next-line:use-lifecycle-interface
  ngOnInit() {


    console.log(this.show);
    this.googleInitialize();
    (window as any).fbAsyncInit = function() {
      FB.init({
        appId      : '372904147054266',
        cookie     : true,
        xfbml      : true,
        version    : 'v3.1'
      });
      FB.AppEvents.logPageView();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));

  }
  constructor(private route: Router){

  }


  googleInitialize() {
    window['googleSDKLoaded'] = () => {
      window['gapi'].load('auth2', () => {
        this.auth2 = window['gapi'].auth2.init({
          client_id: '367803271712-8b0fm3stj755air53dpm2fm86gnrv8k2.apps.googleusercontent.com',
          cookie_policy: 'single_host_origin',
          scope: 'profile email'
        });
        this.prepareLogin();
      });
    }
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));
  }

  prepareLogin() {
    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleUser) => {
        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        this.show = true;
        this.Name = profile.getName();
        console.log("show",this.show);
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  submitLogin(){
    console.log("submit login to facebook");
    // FB.login();
    FB.login((response)=>
    {
      console.log('submitLogin',response);
      if (!response.authResponse) {
        console.log('User login failed');
      } else {
        this.toastr.successToastr('login successful', 'Success!');
      }
    });

  }
}
