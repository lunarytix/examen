import { Overlay } from "@angular/cdk/overlay";
import { Injectable } from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { MatDialog } from "@angular/material/dialog";
import { tap } from "rxjs";
import { SimpleResponse } from "src/app/main/objects/simple-response";
import { showBasicAlert } from "./swal-alerts";

@Injectable({
  providedIn: 'root'
})

export class ModalsCustom {
  width:string = '';


  constructor(
      private dialog: MatDialog,
      private media: MediaObserver
    ) {

      this.media.asObservable().subscribe((mediaChange:any) => {
        this.width = this.getMode(mediaChange);
      });

     }

  openFrmDialog = ( component: any , data:any = {} ) => {
    const dialogRef = this.dialog.open(component,{
      data,
      width: this.width,
      autoFocus: false,
      disableClose: true
      });

    return dialogRef.afterClosed().pipe(
      tap( (resp:any) => resp)
    );

  }

  openFrmDialogFullWidth = ( component: any , data:any = {} ) => {
    const dialogRef = this.dialog.open(component,{
      data,
      width: '100%',
      autoFocus: false,
      disableClose: true,
      maxWidth: '99vw',
      // maxHeight: '99vh',
      height: '95%',
      panelClass: 'full-screen-modal',
      // position: {
      //   top: '10px',
      //   right: '10px'
      // }

    });

    return dialogRef.afterClosed().pipe(
      tap( (resp:any) => resp)
    );

  }

  openFrmDialogSendWidth = ( width:number, component: any , data:any = {} ) => {
    const dialogRef = this.dialog.open(component,{
      data,
      width: `${width}%`,
      autoFocus: false,
      disableClose: true,
      maxWidth: '99vw',
      // maxHeight: '99vh',
      // height: '95%',
      panelClass: 'full-screen-modal',
      // position: {
      //   top: '10px',
      //   right: '10px'
      // }

    });

    return dialogRef.afterClosed().pipe(
      tap( (resp:any) => resp)
    );

  }


  private getMode(mediaChange: MediaChange): string {//cdk-overlay-pane remove max-width
    if (this.media.isActive('gt-sm')) {
      return '40%';
    } else {
      return '100%';
    }
  }
}




