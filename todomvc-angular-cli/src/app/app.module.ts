import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TodoStatusFilterPipe } from './todo-status-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TodoStatusFilterPipe
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
