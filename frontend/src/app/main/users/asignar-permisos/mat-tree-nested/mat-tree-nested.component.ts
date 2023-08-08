import { SelectionModel } from '@angular/cdk/collections';
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';

@Component({
  selector: 'app-mat-tree-nested',
  templateUrl: './mat-tree-nested.component.html',
  styleUrls: ['./mat-tree-nested.component.scss']
})
export class MatTreeNestedComponent implements OnInit {
  @Input('datos') datos!: any;
  @Output('itemSelecteds') itemSelecteds = new EventEmitter<SelectionModel<any>>();

  dataSource = new MatTreeNestedDataSource<any>();
  treeControl = new NestedTreeControl<any>(node => node.children);

  checklistSelection = new SelectionModel<any>(true /* multiple */);


  constructor() {

           this.checklistSelection.changed.subscribe(change => {
              this.itemSelecteds.emit( this.checklistSelection );
           })

  }

  ngOnInit(): void {
       this.dataSource.data = this.datos;
       this.treeControl.dataNodes = this.datos;

       //
       this.dataSource.data.forEach(nodoModulo => {
        const descendientes = this.treeControl.getDescendants(nodoModulo);

        descendientes.forEach(item => {
           if (item.isChecked) {
            this.todoItemSelectionToggle(item);

          }

        })
       })
  }



  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

   /** Whether all the descendants of the node are selected */
   descendantsAllSelected(node: any,checked: boolean = false): boolean {

    const descendants = this.treeControl.getDescendants(node);
    return descendants.every(child => this.checklistSelection.isSelected(child));
  }


  /** Whether part of the descendants are selected */
  descendantsPartiallySelected(node: any): boolean {
    const descendants = this.treeControl.getDescendants(node);
    const result = descendants.some(child => this.checklistSelection.isSelected(child));
    return result && !this.descendantsAllSelected(node);
  }


  todoItemSelectionToggle(node: any): void {
    this.checklistSelection.toggle(node);
    const descendants = this.treeControl.getDescendants(node);
    this.checklistSelection.isSelected(node)
      ? this.checklistSelection.select(...descendants)
      : this.checklistSelection.deselect(...descendants);


      const partialSelection = this.treeControl.dataNodes?.filter(x =>
                      this.descendantsPartiallySelected(x));


  }



  getLevel = (node: any) => node.level;

  /* Get the parent node of a node */
  getParentNode(node: any): any | null {
    const currentLevel = this.getLevel(node);

    if (currentLevel < 1) {
      return null;
    }

    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];

      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }
}
