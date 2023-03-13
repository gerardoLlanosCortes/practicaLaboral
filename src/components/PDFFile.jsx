import React, { useState, useEffect } from 'react'

import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import RobotoRegular from "../assets/fonts/Roboto-Regular.ttf"
import RobotoBold from "../assets/fonts/Roboto-Bold.ttf"
import RobotoLight from "../assets/fonts/Roboto-Light.ttf"
import RobotoThin from "../assets/fonts/Roboto-Thin.ttf"
import { fontFamily } from '@mui/system';
import {formatNumbers} from '../utils/utils'

Font.register({
  family: 'Roboto-regular',
  format: "truetype",
  src: RobotoRegular,
}
);

Font.register({
  family: 'Roboto-bold',
  format: "truetype",
  src: RobotoBold,
}
);

Font.register({
  family: 'Roboto-light',
  format: "truetype",
  src: RobotoLight,
}
);

Font.register({
  family: 'Roboto-thin',
  format: "truetype",
  src: RobotoThin,
}
);


const styles = StyleSheet.create({
	page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingLeft: 35,
    paddingRight: 35,
    fontFamily: "Roboto-regular"
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    fontFamily: "Roboto-bold",
    textAlign: "center"
  },
  subTitle: {
    fontSize: 9,
    marginBottom: 20,
    fontFamily: "Roboto-bold",
    textAlign: "center",
  },
  tableTitles: {
    fontSize: 9,
    marginBottom: 8,
    fontFamily: "Roboto-bold",
    textAlign: "center",
  },
  headertitles: {
    fontSize: 9,
    marginBottom: 4,
    fontFamily: "Roboto-bold",
  },
  headertexts: {
    fontSize: 9,
    marginBottom: 4,
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  tablaCeldaHeader: {
    color: "white",
    margin: 5,
    fontSize: 10,
    fontFamily: "Roboto-bold",
  },
  tabla: {
    // display: "table",
    width: "auto",
    minWidth: 0,
  },
  tablaFila: {
    width: "100%",
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
  tablaColumnaIndice: {
    width: "5%",
    backgroundColor: "#7eb8e7"
  },
  tablaColumnaItem: {
    width: "65%",
    backgroundColor: "#7eb8e7"
  },
  tablaColumnaValor: {
    width: "30%",
    backgroundColor: "#7eb8e7"
  },
  anchoContenedor: {
    display: "flex",
    width: "100%",
    border: "1px solid gray",
    borderRightWidth: 0,
    borderBottomWidth: 0
  },
  anchoColumnaIndice: {
    width: "5%",
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
    fontFamily: "Roboto-bold"
  },
  anchoColumnaItem: {
    width: "65%",
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
  },
  anchoColumnaValor: {
    width: "30%",
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
  },
  tablaCeldaTotal: {
    margin: 5,
    fontSize: 10,
    textAlign: "right",
    fontFamily: "Roboto-bold",
  },
  tablaCeldaFecha: {
    margin: 5,
    fontSize: 10,
    fontFamily: "Roboto-bold",
  },
  tablaCeldaIndice: {
    margin: 5,
    fontSize: 10,
    fontFamily: "Roboto-bold",
  },
  contenedorTabla: {
    marginBottom: 16
  },
  tablaColumna: {
    flex: 1,
    backgroundColor: "#7eb8e7"
  },
  tablaColumnaDetalle: {
    flex: 3,
    backgroundColor: "#7eb8e7"
  },
  anchoColumna: {
    flex: 1,
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
  },
  anchoColumnaDetalle: {
    flex: 3,
    height: "auto",
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
    display: "flex",
    flexDirection: "row",
  },
  tablaCelda: {
    flex: 1,
    margin: 5,
    fontSize: 10,
    fontFamily: "Roboto-light"
  },

  
});

const API_URL = import.meta.env.VITE_API_URL

export const PDFFile = ({rendicionesEncOne, rendicionDet, resumenes, items, tipos}) => {

  const total = () => {
    let suma = 0
    rendicionDet.map(detalle => {
      suma += detalle.MontoTotal
    })
    return formatNumbers(suma)
  }

  const funcion = (itemId) => {
    let res = 0
    resumenes.map((resumen, i) => {
      if(itemId === resumen.IdItem){
        res = resumen.MontoTotal
      }
    })
    return formatNumbers(res)
  }

  const totalDetalles= (tipo) => {
    let suma = 0
    rendicionDet.map(detalle => {
      if(detalle.Tipo === tipo){
        suma += detalle.MontoTotal
      }
    })
    return formatNumbers(suma)
  }

  const getImagen = (nombreImagen) =>{
    if(nombreImagen == ""){
      return `${API_URL}/public/no-image.png`
    }
    
    else{
        return `${API_URL}/public/${nombreImagen}`
    }
  }

  // const fechaDesde = () => {
  //   return 
  // }

  return (
    <Document>
		<Page size="A4" style={styles.page} >

        <View>
          <Text style={styles.title}> FORMULARIO DE RENDICIÓN DE GASTOS </Text>
          <Text style={styles.subTitle}> Desde: {rendicionDet[0].FechaDoc} - Hasta: {rendicionDet[rendicionDet.length-1].FechaDoc} </Text>
        </View>

        <View style={{flexDirection: 'row', gap: "32px", marginBottom: "12px"}}>
          <View >
            <Text style={styles.headertitles}>NUMERO RENDICIÓN:</Text>
            <Text style={styles.headertitles}>NOMBRE RESPONSABLE:</Text>
            <Text style={styles.headertitles}>RUT:</Text>
            <Text style={styles.headertitles}>EMPRESA:</Text>
            <Text style={styles.headertitles}>AREA / DPTO:</Text>
            <Text style={styles.headertitles}>CTA. Pago:</Text>
          </View>
          <View >
            <Text style={styles.headertexts}>{rendicionesEncOne.Numero}</Text>
            <Text style={styles.headertexts}>{rendicionesEncOne.Empleado}</Text>
            <Text style={styles.headertexts}>{rendicionesEncOne.Rut}</Text>
            <Text style={styles.headertexts}>{rendicionesEncOne.Empresa}</Text>
            <Text style={styles.headertexts}>Administración</Text>
            <Text style={styles.headertexts}>Banco {rendicionesEncOne.Banco}, Nro.Cuenta: {rendicionesEncOne.Cuenta}</Text>
          </View>
        </View>

        <Text style={{display: "inline-block",width: "100%",borderTop: "0.5px solid gray",marginBottom: "16px"}} ></Text>
        
      <View style={styles.conetendorFirstTable}>
        <View style={styles.tabla}>
          <View style={styles.tablaFila}>
            <View style={styles.tablaColumnaIndice}>
              <Text style={styles.tablaCeldaHeader}>#</Text>
            </View>
            <View style={styles.tablaColumnaItem}>
              <Text style={styles.tablaCeldaHeader}>Item</Text>
            </View>
            <View style={styles.tablaColumnaValor}>
              <Text style={styles.tablaCeldaHeader}>Totales por item</Text>
            </View>
          </View>
        </View>
      

        <View style={styles.anchoContenedor}>
          {items.map((item, indice) => {
            return(
              <View style={styles.tablaFila} key={indice}>
                <View style={styles.anchoColumnaIndice}>
                  <Text style={styles.tablaCeldaIndice}>{indice + 1}</Text>
                </View>
                <View style={styles.anchoColumnaItem}>
                  <Text style={styles.tablaCelda}>{item.Item}</Text>
                </View>
                <View style={styles.anchoColumnaValor}>
                  <Text style={styles.tablaCeldaTotal}>$ {funcion(item.IdItem)} </Text>
                </View>
              </View>
            )
          })}
          <View style={styles.tablaFila}>
            <View style={styles.anchoColumnaIndice}>
              <Text style={styles.tablaCelda}></Text>
            </View>
            <View style={styles.anchoColumnaItem}>
              <Text style={styles.tablaCelda}>TOTAL</Text>
            </View>
            <View style={styles.anchoColumnaValor}>
              <Text style={styles.tablaCeldaTotal}>$ {total()}</Text>
            </View>
          </View>
        </View>
      </View>
    </Page>


    <Page size="A4" style={styles.page}>
      {tipos.map((tipo, index) => {
        return(
          <View style={styles.contenedorTabla} key={index}>
            <Text style={styles.tableTitles}>DETALLE DE GASTOS EN {tipo.Tipo.toUpperCase()}</Text>
            <View style={styles.tabla}>
              <View style={styles.tablaFila}>
                <View style={styles.tablaColumna}>
                  <Text style={styles.tablaCeldaHeader}>Fecha</Text>
                </View>
                <View style={styles.tablaColumna}>
                  <Text style={styles.tablaCeldaHeader}>Boleta</Text>
                </View>
                <View style={styles.tablaColumna}>
                  <Text style={styles.tablaCeldaHeader}>Factura</Text>
                </View>
                <View style={styles.tablaColumnaDetalle}>
                  <Text style={styles.tablaCeldaHeader}>Detalle</Text>
                </View>
                <View style={styles.tablaColumna}>
                  <Text style={styles.tablaCeldaHeader}>Total</Text>
                </View>
              </View>
            </View>
          

            <View style={styles.anchoContenedor}>
              {rendicionDet.map((detalle, indice) => {
                if(detalle.Tipo === tipo.Tipo){
                  return (
                    <View style={styles.tablaFila}  key={indice}>
                      <View style={styles.anchoColumna}>
                        <Text style={styles.tablaCeldaFecha}>{detalle.FechaDoc}</Text>
                      </View>
                      <View style={styles.anchoColumna}>
                        <Text style={styles.tablaCelda}>{(detalle.TipoDoc === "BOLETA")? detalle.NumeroDoc : undefined}</Text>
                      </View>
                      <View style={styles.anchoColumna}>
                        <Text style={styles.tablaCelda}>{(detalle.TipoDoc === "FACTURA")? detalle.NumeroDoc : undefined}</Text>
                      </View>
                      <View style={styles.anchoColumnaDetalle}>
                        <Text style={styles.tablaCelda}>{detalle.Obs}</Text>
                      </View>
                      <View style={styles.anchoColumna}>
                        <Text style={styles.tablaCeldaTotal}>$ {formatNumbers(detalle.MontoTotal)}</Text>
                      </View>
                    </View>
                  )
                }
              }              
              )}
              <View style={styles.tablaFila}>
                <View style={styles.anchoColumna}>
                  <Text style={styles.tablaCelda}></Text>
                </View>
                <View style={styles.anchoColumna}>
                  <Text style={styles.tablaCelda}></Text>
                </View>
                <View style={styles.anchoColumna}>
                  <Text style={styles.tablaCelda}></Text>
                </View>
                <View style={styles.anchoColumnaDetalle}>
                  <Text style={styles.tablaCelda}>TOTAL</Text>
                </View>
                <View style={styles.anchoColumna}>
                  <Text style={styles.tablaCeldaTotal}>$ {totalDetalles(tipo.Tipo)}</Text>
                </View>
              </View>
            </View>
          </View>
          
        )
      })}

      
    </Page>
      
    
    {rendicionDet.map((detalle, index) => {
      return(
        <Page size="A4" style={styles.page} key={index}>
          <View>
            <Text style={styles.tableTitles}>IMAGENES {detalle.TipoDoc.toUpperCase()}</Text>
            <View style={{flexDirection: 'row', gap: "32px", margin: "20px 0", justifyContent: "center"}}>
            <View >
              <Text style={styles.headertitles}>FECHA DOCUMENTO:</Text>
              <Text style={styles.headertitles}>NUMERO DOCUMENTO:</Text>
              <Text style={styles.headertitles}>MONTO TOTAL:</Text>
            </View>
            <View >
              <Text style={styles.headertexts}>{detalle.FechaDoc}</Text>
              <Text style={styles.headertexts}>{detalle.NumeroDoc}</Text>
              <Text style={styles.headertexts}>$ {formatNumbers(detalle.MontoTotal)}</Text>
            </View>
          </View>
          <Image src={getImagen(detalle.NombreImagen)} style={{width: 400,marginVertical: 15, marginHorizontal: "auto",}}></Image>
          </View>
        </Page>
      )
    })}
	</Document>
  )
}

export default PDFFile;

