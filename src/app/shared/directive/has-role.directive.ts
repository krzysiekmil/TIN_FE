import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../core/service/auth.service";

@Directive({
  selector: '[hasRole]'
})
export class HasRoleDirective {

  @Input() public hasRole!: Array<string>;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authService:AuthService) {
  }

  public ngOnInit(): void {
    if(this.authService.isTokenValid() && this.hasRole.some(AuthService.hasRole) ){
      this.viewContainerRef.createEmbeddedView(this.templateRef);}
    else
      this.viewContainerRef.clear();
  }

}
