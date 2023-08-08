import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/home/services/home.service';
import { showBasicAlert } from 'src/app/shared/tools/swal-alerts';
import { Modulo } from '../../objects/modulo';
import { SimpleResponse } from '../../objects/simple-response';
import { ModulesService } from '../../services/modules.service';

@Component({
  selector: 'app-show-modules',
  templateUrl: './show-modules.component.html',
  styleUrls: ['./show-modules.component.scss']
})
export class ShowModulesComponent implements OnInit {
  items:Modulo[] = [];
  constructor(
    private modulesService: ModulesService
  ) { }

  ngOnInit(): void {
    // this.homeService.asignarModuloActual({ id: 1 });

    this.getModulesByUser();
  }

  getModulesByUser = () => {
    this.modulesService.getModulesByUser().subscribe({
      next: (data) => {
        const response:SimpleResponse = data;
        this.items = response.payload;
      },
      error: (err) => {
        showBasicAlert('Ups!',err.message,'error')
      }
    })
  }

}
