import { Component, inject } from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { SideForm1 } from './side-form1/side-form1';
import { SideForm2 } from './side-form2/side-form2';

@Component({
  selector: 'app-sidebar',
  imports: [],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class Sidebar {
  private offcanvasService = inject(NgbOffcanvas);
  
  openSideBar1() {
		const offcanvasRef = this.offcanvasService.open(SideForm1);
		offcanvasRef.componentInstance.name = 'World';
	}

  openSideBar2() {
		const offcanvasRef = this.offcanvasService.open(SideForm2);
		offcanvasRef.componentInstance.name = 'Markos';
	}
}
