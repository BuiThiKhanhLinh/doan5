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
  public list_tkb:any;
  public tiets=['1', '2', '3', '4', '5']
  constructor(injector: Injector) { 
    super(injector);
  }
  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('api/tkb/get-by-lop/10A1'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_tkb = res[0];
      console.log(this.list_tkb);
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
   
  }

  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }
}