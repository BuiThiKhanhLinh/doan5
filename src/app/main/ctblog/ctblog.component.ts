import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit, Injector } from '@angular/core';

@Component({
  selector: 'app-ctblog',
  templateUrl: './ctblog.component.html',
  styleUrls: ['./ctblog.component.css']
})
export class CtblogComponent extends BaseComponent implements OnInit {
  item:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    this.item = {};
    this._route.params.subscribe(params => {
      let id = params['id'];
      this._api.get('api/baiviet/get-by-id/'+id).takeUntil(this.unsubscribe).subscribe(res => {
        this.item = res;
        setTimeout(() => {
          this.loadScripts();
        });
      }); 
    });
  }

}
