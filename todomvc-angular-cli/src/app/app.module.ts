import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {StorageApiService} from './storage-api.service';
import {TodoApiService} from './todo-api.service';
import {TodoStatusFilterPipe} from './todo-status-filter.pipe';
import {TodoService} from './todo.service';

@NgModule({
  declarations: [AppComponent, TodoStatusFilterPipe],
  imports: [BrowserModule, HttpModule],
  providers: [
    {provide: 'api', useValue: 'http://localhost:3000/api'}, TodoApiService,
    StorageApiService, TodoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
