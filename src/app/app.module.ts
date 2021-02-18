import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import {
  VirtualScrollerDefaultOptions,
  VirtualScrollerModule
} from "ngx-virtual-scroller";
import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";

export function vsDefaultOptionsFactory(): VirtualScrollerDefaultOptions {
  return {
    checkResizeInterval: 1000,
    modifyOverflowStyleOfParentScroll: true,
    resizeBypassRefreshThreshold: 5,
    scrollAnimationTime: 0,
    scrollDebounceTime: 100,
    scrollThrottlingTime: 0,
    stripedTable: false
  };
}

@NgModule({
  imports: [BrowserModule, FormsModule, VirtualScrollerModule],
  declarations: [AppComponent, HelloComponent],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: "virtual-scroller-default-options",
      useFactory: vsDefaultOptionsFactory
    }
  ]
})
export class AppModule {}
