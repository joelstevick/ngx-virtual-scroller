import { Component, OnInit, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IPageInfo, VirtualScrollerComponent } from "ngx-virtual-scroller";

const MaxItems = 1000;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}
  @ViewChild(VirtualScrollerComponent)
  private virtualScroller: VirtualScrollerComponent;

  items: any[] = [];
  count = 0;
  timeout: any;
  initialized = false;

  ngOnInit(): void {
    for (let i = 0; i < MaxItems; i++) {
      this.items.push({
        html: this.sanitizer.bypassSecurityTrustHtml(
          `<div style="height: ${this.getHeight()}px">${MaxItems - i}</div>`
        )
      });
    }
  }

  vsStart(pageInfo: IPageInfo) {
    if (!this.initialized) {
      this.initialized = true;
      this.virtualScroller.scrollToIndex(MaxItems - 1);
    }
    return;
    if (pageInfo.startIndex < 900) {
      this.items = this.items.slice(900);
    }
    console.log("vsStart", pageInfo);
  }

  getHeight() {
    return 30;
    return Math.round(Math.random() * 50) + 20;
  }
}
