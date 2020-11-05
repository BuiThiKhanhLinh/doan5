import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-ct-tkb',
  templateUrl: './ct-tkb.component.html',
  styleUrls: ['./ct-tkb.component.css']
})
export class CtTkbComponent extends BaseComponent implements OnInit {
  list_tkb:any;
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('api/tkb/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_tkb = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    console.log(this.list_tkb);
  }

  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }
}