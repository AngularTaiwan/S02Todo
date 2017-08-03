import { HttpModule } from '@angular/http';
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
    BrowserModule,
    HttpModule
  ],
  providers: [{provide: 'api', useValue: 'http://localhost:3000/api'}],
  bootstrap: [AppComponent]
})
export class AppModule { }
