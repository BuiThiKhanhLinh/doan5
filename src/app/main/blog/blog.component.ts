import { BaseComponent } from 'src/app/lib/base.component';
import { Component, OnInit,Injector } from '@angular/core';
import { Observable} from 'rxjs';
import 'rxjs/add/observable/combineLatest';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent extends BaseComponent implements OnInit {
  list_blog:any;
  constructor(injector: Injector) { 
    super(injector);
  }

  ngOnInit(): void {
    Observable.combineLatest(
      this._api.get('api/baiviet/get-all'),
    ).takeUntil(this.unsubscribe).subscribe(res => {
      this.list_blog = res[0];
      setTimeout(() => {
        this.loadScripts();
      });
    }, err => { });
    console.log(this.list_blog);
  }

  catText(text: string, limit: number): string {
    if(text.length > limit) {
      return text.substr(0, limit) + "...";
    }
    return text;
  }
}
