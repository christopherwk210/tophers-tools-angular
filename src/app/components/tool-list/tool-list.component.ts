import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { tools, Tool, Category } from '../../config/tools';

@Component({
  selector: 'app-tool-list',
  templateUrl: './tool-list.component.html',
  styleUrls: ['./tool-list.component.scss']
})
export class ToolListComponent implements OnInit {
  organizedTools: { [key in Category]?: Tool[] } = {};

  constructor(private router: Router) {}

  ngOnInit() {
    // Organize tools into separate categories
    tools.forEach(tool => {
      this.organizedTools[tool.category] = this.organizedTools[tool.category] || [];
      this.organizedTools[tool.category].push(tool);
    });

    // Sort alphabetically
    Object.keys(this.organizedTools).forEach(key => {
      this.organizedTools[key].sort((a: Tool, b: Tool) => {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
      });
    });
  }

  get toolCategories() {
    return Object.keys(this.organizedTools);
  }
}
