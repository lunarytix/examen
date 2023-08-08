 import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { environment } from "src/environments/environment";

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

const crearPdf = (contenido:string = "",titulo:string="") => {
  // const informacion =
  pdfMake.createPdf({
    content:{
      text: contenido
    },
    info:{
      title: titulo,
    }
  }).print()
}

const generarTabla = (columnas:string[] = [],atributos:string[],datos:any[] = [],titulo: string = "",total:any = "",totalesCustom:number[] = []) => {
  const filas:any[] = [];
  //Cabecera tabla
  filas.push(columnas);
  //Cuerpo de la tabla tbody
  if (datos.length > 0) {
    datos.forEach((item:any) => {
      let objeto:any = [];
      Object.keys(item).forEach(elemento => {
         if (atributos.indexOf(elemento) !== -1) {
          objeto = [...objeto , item[elemento] ]
        }
      });
      filas.push(objeto)
    });
    //Si envian el total
    if (total !== "") {
      const espacios = columnas.map(e=> '').splice(2,columnas.length);
      filas.push([{text:'TOTAL',bold: true , colSpan: (columnas.length - 1),alignment: 'center'},...espacios,{text:total,bold:true,alignment:'center'}])
    }
    //Si envia columna de varios total
    if (totalesCustom.length > 0) {
      const totales:any[] = [];
      totalesCustom.forEach(element => {
        totales.push({text: element,bold: true ,alignment: 'center'});
      });
      filas.push(totales)
    }
  }else{
    //Si no hay registros
    const noHayRegistros = columnas.map(e=> '').splice(1,columnas.length);
    filas.push([{text:'NO HAY REGISTROS',bold: true , colSpan: columnas.length,alignment: 'center'},...noHayRegistros]);
  }
  //Objeto tabla
  let tabla:{} = {
    layout: 'lightHorizontalLines',
    table: {
      headerRows: 1,
      widths: columnas.length > 3 ? columnas.map(e => 'auto') : columnas.map(e => '*'),
      // widths: ...[Array(headers,length-2).fill('*'), 'auto']
      body: filas,
    },
    alignment: "center",
    margin:[0 , 10 ,0, 20]
  };

  //cabecera de tabla
  if (titulo !== "") {
    const cabecera = crearCabeceraTabla(` ${titulo}(TOTAL DE REGISTROS: ${datos.length})`);
    tabla = [cabecera,tabla];
  }

  return tabla;
}


const crearCabeceraTabla = (titulo:string) => {
  return {
        text: titulo,
        fontSize: 10,
        color: '#706D6A',
        alignment: "justify",
        bold: true,
        margin: [0,10,0,0]
      }
}

const crearCabeceraReporte = async (titulo: string,imagen:string = "") => {
    const url = environment.base_url;
    const contents:any = await getBase64ImageFromUrl(`${url}/images/logos/MDC_Horizontal_Compacto.png`) ;
    //Cabecera logo y leyenda
    return {
      columns:[
          {
            image: contents,
            fit: [100, 100],
          },
          {
            text: titulo,
            width: "100%",
            alignment: "justify",
            margin: [0 , 5 , 0 , 0],
            fontSize: 12,
            // bold: true,
            color: '#706D6A'
          }
        ]
      }
}

const generarFormatoPDF = async (contenido:any,titulo:string = "",nombreReporte:string = "") => {
  //  const filas = [];
  // filas.push([ 'NO. PERSONA', 'NOMBRE', 'FECHA','EMPRESA']);
  // datos.forEach((item:any) => {
  //   filas.push([item.numPersona,item.nombre,moment(item.fechaDictamen).format('DD-MM-YYYY'),'']);
  // });
  //TOTALES
  // if (filas.length > 0) {
  //   filas.push([ { text: `TOTAL DE DICTAMENES: ${datos.length}`, bold: true , colSpan: 4,alignment: 'center'} ,'', '', '' ]);
  // }
  //
  const cabecera:any = await crearCabeceraReporte(nombreReporte);

  pdfMake.createPdf({
  content: [cabecera,contenido],
    info:{
      title: titulo,
    },
    defaultStyle: {
      fontSize: 9,
      // noWrap: false

    }
  }).print()
}


 const getBase64ImageFromUrl = async (imageUrl:string)  => {
  const res = await fetch(imageUrl);
  const blob = await res.blob();

  return new Promise((resolve, reject) => {
    const reader  = new FileReader();
    reader.addEventListener("load", function () {
        resolve(reader.result);
    }, false);

    reader.onerror = () => {
      return reject('error al generar base64');
    };
    reader.readAsDataURL(blob);
  })
}



export {
  crearPdf,
  generarFormatoPDF,
  generarTabla
}
