import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { tools } from './config/tools';
import { ToolListComponent } from './components';

const routes: Routes = [
  {
    path: '',
    component: ToolListComponent
  }
];

tools.forEach(tool => {
  routes.push({
    path: tool.route,
    component: tool.component
  });
});

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
