import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";

@Directive({
  selector: '[authorized]'
})
export class AuthorizedDirective {

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService:AuthService) {
  }

  public ngOnInit(): void {
    if(this.authService.isTokenValid()){
      this.viewContainerRef.createEmbeddedView(this.templateRef);}
    else
      this.viewContainerRef.clear();
  }

}
