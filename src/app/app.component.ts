import { Component, OnInit, VERSION, ViewChild } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { IPageInfo, VirtualScrollerComponent } from "ngx-virtual-scroller";

const PageSize = 1;

const MaxItems = Infinity;

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
  beaconEl: HTMLElement;

  ngOnInit(): void {
    this.beaconEl = document.querySelector("#beacon") as HTMLElement;

    // listen for scroll to top events
    const scrollArea = document.querySelector("virtual-scroller");

    const observer = new IntersectionObserver(
      (event: IntersectionObserverEntry[]) => {
        if (this.isBeaconDisplayed && event[0].isIntersecting) {
          console.log("top", this.items.length);
          this.displayBeacon(false);
          this.fetchMore();
        }
      },
      {
        root: scrollArea
      }
    );

    observer.observe(this.beaconEl);
  }

  isBeaconDisplayed() {
    return this.beaconEl.style.visibility === 'visible';
  }
  displayBeacon(show: boolean) {
    this.beaconEl.style.visibility = show ? "visible" : "hidden";
  }
  fetchMore() {
    const pageSize = this.items.length > 0 ? PageSize : 10;

    const base = this.items.length;

    for (let i = 0; i < pageSize; i++) {
      this.items.unshift({
        html: this.sanitizer.bypassSecurityTrustHtml(
          `<div style="height: ${this.getHeight()}px">${base + i}</div>`
        )
      });
    }
  }
  vsStart(pageInfo: IPageInfo) {
    console.log("vsStart", pageInfo);
    if (pageInfo.startIndex >= 0) {
      this.displayBeacon(true);
    }
    if (!this.initialized && this.items.length > 0) {
      this.initialized = true;
      this.virtualScroller.scrollToIndex(this.items.length - 1);
    }
  }

  getHeight() {
    return 30;
    return Math.round(Math.random() * 50) + 20;
  }
}
