import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { padding } from '@mui/system';


const COL_ANCHO_1 = 10;
const COL_ANCHO_2 = 20;


const styles = StyleSheet.create({
	page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingLeft: 35,
    paddingRight: 35,
  },
  title: {
    fontSize: 10,
    marginBottom: 8,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    fontSize: 9,
    marginBottom: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  headertitles: {
    fontSize: 9,
    fontWeight: "bold",
    marginBottom: 4,
  },
  headertexts: {
    fontSize: 9,
    marginBottom: 4
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  section: {
    margin: 10,
    padding: 10,
  },
  tabla: {
    display: "table",
    width: "auto",
    marginTop: 32
  },
  tablaFila: {
    width: "100%",
    display: "flex",
    margin: "auto",
    flexDirection: "row",
  },
  tablaColumnaIndice: {
    width: "5%",
    flexWrap: "wrap",
    backgroundColor: "#1ABD9C"
  },
  tablaColumna: {
    width: "65%",
    flexWrap: "wrap",
    backgroundColor: "#1ABD9C"
  },
  tablaColumnaValor: {
    width: "30%",
    flexWrap: "wrap",
    backgroundColor: "#1ABD9C"
  },
  tablaCeldaHeader: {
    color: "white",
    margin: 5,
    fontSize: 10,
    fontWeight: 500,
  },
  anchoContenedor: {
    border: "1px solid gray",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  anchoColumna: {
    flexGrow: 1,
	  border: "1px solid gray",
    borderLeftWidth: 0,
    borderTopwidth: 0,
  },
  tablaCelda: {
    margin: 5,
    fontSize: 10,
  },

  
});

export const PDFFile = () => {
  return (
    <Document>
		<Page size="A4" style={styles.page} >

        <View>
          <Text style={styles.title}> FORMULARIO DE RENDICIÓN DE GASTOS </Text>
          <Text style={styles.subTitle}> Desde: 2022-11-08 - Hasta: 2022-11-08 </Text>
        </View>

        <View style={{flexDirection: 'row', gap: "32px"}}>
          <View >
            <Text style={styles.headertitles}>Numero Rendicion:</Text>
            <Text style={styles.headertitles}>NOMBRE RESPONSABLE:</Text>
            <Text style={styles.headertitles}>RUT:</Text>
            <Text style={styles.headertitles}>EMPRESA:</Text>
            <Text style={styles.headertitles}>AREA / DPTO:</Text>
            <Text style={styles.headertitles}>CTA. Pago:</Text>
          </View>
          <View >
            <Text style={styles.headertexts}>101</Text>
            <Text style={styles.headertexts}>Diego Eduardo Cortés Sánchez</Text>
            <Text style={styles.headertexts}>16.171.514-K</Text>
            <Text style={styles.headertexts}>APPZONE SPA</Text>
            <Text style={styles.headertexts}>Administracion</Text>
            <Text style={styles.headertexts}>Banco Santander, Nro.Cuenta: 81630069</Text>
          </View>
        </View>

      
        <View style={styles.tabla}>
          <View style={styles.tablaFila}>
            <View style={styles.tablaColumnaIndice}>
              <Text style={styles.tablaCeldaHeader}>#</Text>
            </View>
            <View style={styles.tablaColumna}>
              <Text style={styles.tablaCeldaHeader}>Item</Text>
            </View>
            <View style={styles.tablaColumnaValor}>
              <Text style={styles.tablaCeldaHeader}>Totales por item</Text>
            </View>
          </View>
        </View>
        
        {/*Aqui se recorre un arreglo y se muestran los datos*/}
        <View style={styles.anchoContenedor}>
          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>1</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Combustibles Con Factura </Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 68.597</Text>
            </View>
          </View>

          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>2</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Combustibles con boleta </Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 86</Text>
            </View>
          </View>

          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>3</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Mantención - Reparación</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 0</Text>
            </View>
          </View>

          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>4</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Viaje nacional</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 0</Text>
            </View>
          </View>

          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>5</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Estacionamientos</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 0</Text>
            </View>
          </View>

          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>6</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Colación personal</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 0</Text>
            </View>
          </View>
      </View>
    </Page>

    <Page size="A4" style={styles.page}>
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
            <View style={styles.tablaColumna}>
              <Text style={styles.tablaCeldaHeader}>Detalle</Text>
            </View>
            <View style={styles.tablaColumna}>
              <Text style={styles.tablaCeldaHeader}>Total</Text>
            </View>
          </View>
        </View>
        
        {/*Aqui se recorre un arreglo y se muestran los datos*/}
        <View style={styles.anchoContenedor}>
          <View style={styles.tablaFila}>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>1</Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>Combustibles Con Factura </Text>
            </View>
            <View style={styles.anchoColumna}>
              <Text style={styles.tablaCelda}>$ 68.597</Text>
            </View>
          </View>
      </View>
    </Page>




			{/* <View >
        <Text >Texto de prueba 1</Text>
        <Image src="https://via.placeholder.com/150" />
        <Text >Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minima est saepe obcaecati maxime, in suscipit aut aliquam. Eligendi, labore reprehenderit quae hic earum vel. Enim asperiores, veniam exercitationem illo, odit laboriosam tempora delectus corporis aut quae incidunt minus molestiae debitis dolores doloremque error nesciunt! Culpa dolorem eaque sit amet veritatis.</Text>
			</View>
			<View >
				<Text >Texto de prueba 2</Text>
			</View>
		</Page>
    <Page size="A4" >
			<View >
        <Text >Pagina 2</Text>
        <Text >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dignissimos excepturi obcaecati vel commodi fuga mollitia quia alias nemo. Atque nisi porro at assumenda nihil explicabo, autem id? Nam, nisi. Quas eveniet aliquid enim molestiae reiciendis dolor, asperiores distinctio pariatur nisi dolorum quaerat quisquam quos cum? Architecto corrupti nihil hic. Placeat nemo libero veritatis quae non mollitia quasi neque, ipsum hic corrupti, voluptatum quia temporibus harum sed! Dicta, cumque. Repellendus minus molestias ab. Necessitatibus quam magni, cum mollitia eos officiis in tempore facilis, ratione similique accusantium explicabo inventore commodi pariatur quas, iste rerum tempora libero ipsum dignissimos saepe quis. Quam, asperiores!</Text>
			</View> */}
		
	</Document>
  )
}

export default PDFFile;

