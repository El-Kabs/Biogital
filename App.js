import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ToolbarAndroid,
  StatusBar,
  TouchableOpacity,
  Button,
  ScrollView,
  Picker,
  AsyncStorage
} from 'react-native';
import {Font, MapView} from 'expo';
import Expo from 'expo';
import {Card} from 'react-native-elements';
import {StackNavigator, TabNavigator, TabBarBottom} from 'react-navigation';
import {Col, Row, Grid} from "react-native-easy-grid";

import * as firebase from 'firebase'; // 4.10.1

var {
  height
} = Dimensions.get('window');
var {
  width
} = Dimensions.get('window');

var box_count = 3;
var box_height = height / box_count;

const firebaseConfig = {
  apiKey: 'AIzaSyDFqRX0nmp4PyXXcl9r_cPQso6ie6ffN5w',
  authDomain: 'biogital-14e89.firebaseapp.com',
  databaseURL: 'https://biogital-14e89.firebaseio.com',
  projectId: 'biogital-14e89',
  storageBucket: 'biogital-14e89.appspot.com',
  messagingSenderId: '485023064752'
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

class CasaScreen extends Component {
  static navigationOptions = {
    header: null
  }

  render() {
    return (<View>
      <View style={styles.container3}>
        <ToolbarAndroid style={{
            height: StatusBar.currentHeight,
            backgroundColor: '#00701a',
            elevation: 4
          }}/>
        <Text>Hola gonorrea pantalla peridomicilio.</Text>
      </View>
    </View>)
  }
}

class IntraScreen extends Component {

  finalizar = async () => {

    // Zona Social
    let intrazonaninfas = this.state.zonaT[0];
    let intrazonaadultos = this.state.zonaT[1];
    let intrazonahuevos = this.state.zonaT[2];
    // Dormitorio
    let intradormininfas = this.state.dormitorioT[0];
    let intradormiadultos = this.state.dormitorioT[1];
    let intradormihuevos = this.state.dormitorioT[2];
    // Cocina
    let intracocinaninfas = this.state.cocinaT[0];
    let intracocinaadultos = this.state.cocinaT[1];
    let intracocinahuevos = this.state.cocinaT[2];

    try {
      //Zona Social
      await AsyncStorage.setItem('@MySuperStore:intrazonaninfas', ''+intrazonaninfas);
      await AsyncStorage.setItem('@MySuperStore:intrazonaadultos', ''+intrazonaadultos);
      await AsyncStorage.setItem('@MySuperStore:intrazonahuevos', ''+intrazonahuevos);
      //Dormitorio
      await AsyncStorage.setItem('@MySuperStore:intradormininfas', ''+intradormininfas);
      await AsyncStorage.setItem('@MySuperStore:intradormiadultos', ''+intradormiadultos);
      await AsyncStorage.setItem('@MySuperStore:intradormihuevos', ''+intradormihuevos);
      //Cocina
      await AsyncStorage.setItem('@MySuperStore:intracocinaninfas', ''+intracocinaninfas);
      await AsyncStorage.setItem('@MySuperStore:intracocinaadultos', ''+intracocinaadultos);
      await AsyncStorage.setItem('@MySuperStore:intracocinahuevos', ''+intracocinahuevos);

      Alert.alert('Se guardaron los datos satisfactoriamente.');

    } catch (error) {
      Alert.alert('No fue posible guardar.');
    }
  }

  agregarZona = () => {
    let variableLista = this.state.listaP;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.zona);
      let cantidadTotal = parseInt(this.state.zonaT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.zonaT[1], this.state.zonaT[2]
      ];
      this.setState({zonaT: nuevoArreglo});
      this._nZona.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en zona social.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.zona);
      let cantidadTotal = parseInt(this.state.zonaT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.zonaT[0], cantidadTotal, this.state.zonaT[2]
      ];
      this.setState({zonaT: nuevoArreglo});
      this._aZona.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en zona social.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.zona);
      let cantidadTotal = parseInt(this.state.zonaT[2]) + cantidad;
      let nuevoArreglo = [this.state.zonaT[0], this.state.zonaT[1], cantidadTotal];
      this.setState({zonaT: nuevoArreglo});
      this._hZona.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en zona social.'
      });
    }
  }

  agregarDormitoio = () => {
    let variableLista = this.state.listaS;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.dormitorio);
      let cantidadTotal = parseInt(this.state.dormitorioT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.dormitorioT[1], this.state.dormitorioT[2]
      ];
      this.setState({dormitorioT: nuevoArreglo});
      this._nDormitoio.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en dormitorio.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.dormitorio);
      let cantidadTotal = parseInt(this.state.dormitorioT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.dormitorioT[0], cantidadTotal, this.state.dormitorioT[2]
      ];
      this.setState({dormitorioT: nuevoArreglo});
      this._aDormitoio.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en dormitorio.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.dormitorio);
      let cantidadTotal = parseInt(this.state.dormitorioT[2]) + cantidad;
      let nuevoArreglo = [this.state.dormitorioT[0], this.state.dormitorioT[1], cantidadTotal];
      this.setState({dormitorioT: nuevoArreglo});
      this._hDormitoio.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en dormitorio.'
      });
    }
  }

  agregarCocina = () => {
    let variableLista = this.state.listaT;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.cocina);
      let cantidadTotal = parseInt(this.state.cocinaT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.cocinaT[1], this.state.cocinaT[2]
      ];
      this.setState({cocinaT: nuevoArreglo});
      this._nCocina.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en cocina.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.cocina);
      let cantidadTotal = parseInt(this.state.cocinaT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.cocinaT[0], cantidadTotal, this.state.cocinaT[2]
      ];
      this.setState({cocinaT: nuevoArreglo});
      this._aCocina.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en cocina.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.cocina);
      let cantidadTotal = parseInt(this.state.cocinaT[2]) + cantidad;
      let nuevoArreglo = [this.state.cocinaT[0], this.state.cocinaT[1], cantidadTotal];
      this.setState({cocinaT: nuevoArreglo});
      this._hCocina.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en cocina.'
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      listaP: 'ninfas',
      listaS: 'ninfas',
      listaT: 'ninfas',
      dormitorio: 0,
      zona: 0,
      cocina: 0,
      dormitorioT: [
        0, 0, 0
      ],
      zonaT: [
        0, 0, 0
      ],
      cocinaT: [
        0, 0, 0
      ],
      zonaNCreado: false,
      zonaACreado: false,
      zonaHCreado: false,
      dormitorioNCreado: false,
      dormitorioACreado: false,
      dormitorioHCreado: false,
      cocinaNCreado: false,
      cocinaACreado: false,
      cocinaHCreado: false
    };
    this.agregarZona = this.agregarZona.bind(this);
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this._nZona.setNativeProps({text: '0 ninfas en zona social.'});
    this._aZona.setNativeProps({text: '0 adultos en zona social.'});
    this._hZona.setNativeProps({text: '0 huevos en zona social.'});
    this._nDormitoio.setNativeProps({text: '0 ninfas en dormitorio.'});
    this._aDormitoio.setNativeProps({text: '0 adultos en dormitorio.'});
    this._hDormitoio.setNativeProps({text: '0 huevos en dormitorio.'});
    this._nCocina.setNativeProps({text: '0 ninfas en cocina.'});
    this._aCocina.setNativeProps({text: '0 adultos en cocina.'});
    this._hCocina.setNativeProps({text: '0 huevos en cocina.'});
  }

  render() {
    return (<View>
      <View style={styles.container3}>
        <ToolbarAndroid style={{
            height: StatusBar.currentHeight,
            backgroundColor: '#00701a',
            elevation: 4
          }}/>
      </View>
      <ScrollView contentContainerStyle={{
          alignItems: 'center'
        }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>Formato Intradomicilio</Text>
        <Grid>
          <Col>
            <Row>
              <TextInput placeholder=" Zona" style={(styles.input3)} onChangeText={text => this.setState({zona: text})} keyboardType='numeric'/>
            </Row>
            <Row>
              <TextInput placeholder=" Dormitoio" style={(styles.input3)} onChangeText={text => this.setState({dormitorio: text})} keyboardType='numeric'/>
            </Row>
            <Row>
              <TextInput placeholder=" Cocina" style={(styles.input3)} onChangeText={text => this.setState({cocina: text})} keyboardType='numeric'/>
            </Row>
          </Col>
          <Col>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaP) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaP: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaS) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaS: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaT) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaT: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
          </Col>
          <Col>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarZona} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarDormitoio} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarCocina} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
          </Col>
        </Grid>
        <Button title='Siguiente' color='#28b424' style={{
            marginTop: 25
          }} onPress={this.finalizar}/>
        <View style={{
            width: '80%',
            marginTop: 25,
            alignItems: 'center'
          }}>
          <TextInput text="0 ninfas en zona social." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nZona = component}/>
          <TextInput text="0 adultos en zona social." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aZona = component}/>
          <TextInput text="0 huevos en zona social." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hZona = component}/>
          <TextInput text="0 ninfas en dormitorio." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nDormitoio = component}/>
          <TextInput text="0 adultos en dormitorio." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aDormitoio = component}/>
          <TextInput text="0 huevos en dormitorio." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hDormitoio = component}/>
          <TextInput text="0 ninfas en cocina." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nCocina = component}/>
          <TextInput text="0 adultos en cocina." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aCocina = component}/>
          <TextInput text="0 huevos en cocina." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hCocina = component}/>
        </View>
      </ScrollView>
    </View>)
  }

}

class PeriScreen extends Component {

  guardar = async (body) => {
    console.log(body);
    fetch('https://biogital.000webhostapp.com/Rest/REST.php', {
      method: 'POST',
      body: body
    });
  }

  pedir = async () => {
    try{
      // Familia
      const nombrefamilia = await AsyncStorage.getItem('@MySuperStore:nombre');
      const lat = await AsyncStorage.getItem('@MySuperStore:lat');
      const lng = await AsyncStorage.getItem('@MySuperStore:lng');
      //  Peridomicilio gallinero
      const perigallininfas = await AsyncStorage.getItem('@MySuperStore:perigallininfas');
      const perigallinadultos = await AsyncStorage.getItem('@MySuperStore:perigallinadultos');
      const perigallinhuevos = await AsyncStorage.getItem('@MySuperStore:perigallinhuevos');
      // Peridomiclio corral
      const pericorralninfas = await AsyncStorage.getItem('@MySuperStore:pericorralninfas');
      const pericorraladultos = await AsyncStorage.getItem('@MySuperStore:pericorraladultos');
      const pericorralhuevos = await AsyncStorage.getItem('@MySuperStore:pericorralhuevos');
      // Peridomicilio deposito
      const peridepositoninfas = await AsyncStorage.getItem('@MySuperStore:peridepositoninfas');
      const peridepositoadultos = await AsyncStorage.getItem('@MySuperStore:peridepositoadultos');
      const peridepositohuevos = await AsyncStorage.getItem('@MySuperStore:peridepositohuevos');
      // Intradomicilio Zona Social
      const intrazonaninfas = await AsyncStorage.getItem('@MySuperStore:intrazonaninfas');
      const intrazonaadultos = await AsyncStorage.getItem('@MySuperStore:intrazonaadultos');
      const intrazonahuevos = await AsyncStorage.getItem('@MySuperStore:intrazonahuevos');
      // Intradomicilio Domicilio
      const intradormininfas = await AsyncStorage.getItem('@MySuperStore:intradormininfas');
      const intradormiadultos = await AsyncStorage.getItem('@MySuperStore:intradormiadultos');
      const intradormihuevos = await AsyncStorage.getItem('@MySuperStore:intradormihuevos');
      // Intradomicilio Cocina
      const intracocinaninfas = await AsyncStorage.getItem('@MySuperStore:intracocinaninfas');
      const intracocinaadultos = await AsyncStorage.getItem('@MySuperStore:intracocinaadultos');
      const intracocinahuevos = await AsyncStorage.getItem('@MySuperStore:intracocinahuevos');

      // Armar body
      let body = JSON.stringify({
        nombreFamilia: nombrefamilia,
        lat: lat,
        lng: lng,
        perigallininfas: perigallininfas,
        perigallinadultos: perigallinadultos,
        perigallinhuevos: perigallinhuevos,
        pericorralninfas: pericorralninfas,
        pericorraladultos: pericorraladultos,
        pericorralhuevos: pericorralhuevos,
        peridepositoninfas: peridepositoninfas,
        peridepositoadultos: peridepositoadultos,
        peridepositohuevos: peridepositohuevos,
        intrazonaninfas: intrazonaninfas,
        intrazonaadultos: intrazonaadultos,
        intrazonahuevos: intrazonahuevos,
        intradormininfas: intradormininfas,
        intradormiadultos: intradormiadultos,
        intradormihuevos: intradormihuevos,
        intracocinaninfas: intracocinaninfas,
        intracocinaadultos: intracocinaadultos,
        intracocinahuevos: intracocinahuevos,
        fecha: new Date()
      });
      this.guardar(body);
    }catch(error){
      console.log(error);
    }
  }

  finalizar = async () => {

    // Gallinero
    let perigallininfas = this.state.gallineroT[0];
    let perigallinadultos = this.state.gallineroT[1];
    let perigallinhuevos = this.state.gallineroT[2];
    // Corral
    let pericorralninfas = this.state.corralT[0];
    let pericorraladultos = this.state.corralT[1];
    let pericorralhuevos = this.state.corralT[2];
    // Deposito
    let peridepositoninfas = this.state.depositoT[0];
    let peridepositoadultos = this.state.depositoT[1];
    let peridepositohuevos = this.state.depositoT[2];

    try {
      //Gallinero
      await AsyncStorage.setItem('@MySuperStore:perigallininfas', ''+perigallininfas);
      await AsyncStorage.setItem('@MySuperStore:perigallinadultos', ''+perigallinadultos);
      await AsyncStorage.setItem('@MySuperStore:perigallinhuevos', ''+perigallinhuevos);
      //Corral
      await AsyncStorage.setItem('@MySuperStore:pericorralninfas', ''+pericorralninfas);
      await AsyncStorage.setItem('@MySuperStore:pericorraladultos', ''+pericorraladultos);
      await AsyncStorage.setItem('@MySuperStore:pericorralhuevos', ''+pericorralhuevos);
      //Deposito
      await AsyncStorage.setItem('@MySuperStore:peridepositoninfas', ''+peridepositoninfas);
      await AsyncStorage.setItem('@MySuperStore:peridepositoadultos', ''+peridepositoadultos);
      await AsyncStorage.setItem('@MySuperStore:peridepositohuevos', ''+peridepositohuevos);

      this.pedir();

      Alert.alert('Se guardaron los datos satisfactoriamente en la base de datos.');
    } catch (error) {
      Alert.alert('No fue posible guardar.');
      console.log(error);
    }
  }

  agregarGallinero = () => {
    let variableLista = this.state.listaP;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.gallinero);
      let cantidadTotal = parseInt(this.state.gallineroT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.gallineroT[1], this.state.gallineroT[2]
      ];
      this.setState({gallineroT: nuevoArreglo});
      this._nGallinero.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en gallinero.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.gallinero);
      let cantidadTotal = parseInt(this.state.gallineroT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.gallineroT[0], cantidadTotal, this.state.gallineroT[2]
      ];
      this.setState({gallineroT: nuevoArreglo});
      this._aGallinero.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en gallinero.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.gallinero);
      let cantidadTotal = parseInt(this.state.gallineroT[2]) + cantidad;
      let nuevoArreglo = [this.state.gallineroT[0], this.state.gallineroT[1], cantidadTotal];
      this.setState({gallineroT: nuevoArreglo});
      this._hGallinero.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en gallinero.'
      });
    }
  }

  agregarDeposito = () => {
    let variableLista = this.state.listaS;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.deposito);
      let cantidadTotal = parseInt(this.state.depositoT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.depositoT[1], this.state.depositoT[2]
      ];
      this.setState({depositoT: nuevoArreglo});
      this._nDeposito.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en deposito.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.deposito);
      let cantidadTotal = parseInt(this.state.depositoT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.depositoT[0], cantidadTotal, this.state.depositoT[2]
      ];
      this.setState({depositoT: nuevoArreglo});
      this._aDeposito.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en deposito.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.deposito);
      let cantidadTotal = parseInt(this.state.depositoT[2]) + cantidad;
      let nuevoArreglo = [this.state.depositoT[0], this.state.depositoT[1], cantidadTotal];
      this.setState({depositoT: nuevoArreglo});
      this._hDeposito.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en deposito.'
      });
    }
  }

  agregarCorral = () => {
    let variableLista = this.state.listaT;
    if (variableLista === 'ninfas') {
      let cantidad = parseInt(this.state.corral);
      let cantidadTotal = parseInt(this.state.corralT[0]) + cantidad;
      let nuevoArreglo = [
        cantidadTotal, this.state.corralT[1], this.state.corralT[2]
      ];
      this.setState({corralT: nuevoArreglo});
      this._nCorral.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en corral.'
      });
    } else if (variableLista === 'adultos') {
      let cantidad = parseInt(this.state.corral);
      let cantidadTotal = parseInt(this.state.corralT[1]) + cantidad;
      let nuevoArreglo = [
        this.state.corralT[0], cantidadTotal, this.state.corralT[2]
      ];
      this.setState({corralT: nuevoArreglo});
      this._aCorral.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en corral.'
      });
    } else if (variableLista === 'huevos') {
      let cantidad = parseInt(this.state.corral);
      let cantidadTotal = parseInt(this.state.corralT[2]) + cantidad;
      let nuevoArreglo = [this.state.corralT[0], this.state.corralT[1], cantidadTotal];
      this.setState({corralT: nuevoArreglo});
      this._hCorral.setNativeProps({
        text: cantidadTotal + ' ' + variableLista + ' en corral.'
      });
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      listaP: 'ninfas',
      listaS: 'ninfas',
      listaT: 'ninfas',
      deposito: 0,
      gallinero: 0,
      corral: 0,
      depositoT: [
        0, 0, 0
      ],
      gallineroT: [
        0, 0, 0
      ],
      corralT: [
        0, 0, 0
      ],
      gallineroNCreado: false,
      gallineroACreado: false,
      gallineroHCreado: false,
      depositoNCreado: false,
      depositoACreado: false,
      depositoHCreado: false,
      corralNCreado: false,
      corralACreado: false,
      corralHCreado: false
    };
    this.agregarGallinero = this.agregarGallinero.bind(this);
  }

  static navigationOptions = {
    header: null
  }

  componentDidMount() {
    this._nGallinero.setNativeProps({text: '0 ninfas en gallinero.'});
    this._aGallinero.setNativeProps({text: '0 adultos en gallinero.'});
    this._hGallinero.setNativeProps({text: '0 huevos en gallinero.'});
    this._nDeposito.setNativeProps({text: '0 ninfas en deposito.'});
    this._aDeposito.setNativeProps({text: '0 adultos en deposito.'});
    this._hDeposito.setNativeProps({text: '0 huevos en deposito.'});
    this._nCorral.setNativeProps({text: '0 ninfas en corral.'});
    this._aCorral.setNativeProps({text: '0 adultos en corral.'});
    this._hCorral.setNativeProps({text: '0 huevos en corral.'});
  }

  render() {
    return (<View>
      <View style={styles.container3}>
        <ToolbarAndroid style={{
            height: StatusBar.currentHeight,
            backgroundColor: '#00701a',
            elevation: 4
          }}/>
      </View>
      <ScrollView contentContainerStyle={{
          alignItems: 'center'
        }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>Formato Peridomicilio</Text>
        <Grid>
          <Col>
            <Row>
              <TextInput placeholder=" Gallinero" style={(styles.input3)} onChangeText={text => this.setState({gallinero: text})} keyboardType='numeric'/>
            </Row>
            <Row>
              <TextInput placeholder=" Deposito" style={(styles.input3)} onChangeText={text => this.setState({deposito: text})} keyboardType='numeric'/>
            </Row>
            <Row>
              <TextInput placeholder=" Corral" style={(styles.input3)} onChangeText={text => this.setState({corral: text})} keyboardType='numeric'/>
            </Row>
          </Col>
          <Col>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaP) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaP: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaS) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaS: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
            <Row>
              <Picker selectedValue={(this.state && this.state.listaT) || 'ninfas'} style={{
                  height: 38,
                  width: 100,
                  marginTop: 10,
                  marginLeft: 25
                }} onValueChange={(value) => {
                  this.setState({listaT: value})
                }}>
                <Picker.Item key='1' label={"Ninfas"} value={"ninfas"}/>
                <Picker.Item key='2' label={"Adultos"} value={"adultos"}/>
                <Picker.Item key='3' label={"Huevos"} value={"huevos"}/>
              </Picker>
            </Row>
          </Col>
          <Col>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarGallinero} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarDeposito} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
            <Row style={{
                height: 30,
                marginTop: 25,
                marginLeft: 15
              }}>
              <Button title='Agregar' color='#28b424' onPress={this.agregarCorral} style={{
                  width: '50%',
                  marginLeft: 25,
                  marginTop: 20
                }}/>
            </Row>
          </Col>
        </Grid>
        <Button title='Finalizar' color='#28b424' style={{
            marginTop: 25
          }} onPress={this.finalizar}/>
        <View style={{
            width: '80%',
            marginTop: 25,
            alignItems: 'center'
          }}>
          <TextInput text="0 ninfas en gallinero." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nGallinero = component}/>
          <TextInput text="0 adultos en gallinero." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aGallinero = component}/>
          <TextInput text="0 huevos en gallinero." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hGallinero = component}/>
          <TextInput text="0 ninfas en deposito." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nDeposito = component}/>
          <TextInput text="0 adultos en deposito." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aDeposito = component}/>
          <TextInput text="0 huevos en deposito." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hDeposito = component}/>
          <TextInput text="0 ninfas en corral." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._nCorral = component}/>
          <TextInput text="0 adultos en corral." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._aCorral = component}/>
          <TextInput text="0 huevos en corral." style={{
              fontSize: 16,
              fontWeight: 'bold'
            }} editable={false} ref={component => this._hCorral = component}/>
        </View>
      </ScrollView>
    </View>)
  }

}

class HogarScreen extends Component {

  success = (pos) => {
    var crd = pos.coords;
    this.setState({latitud: crd.latitude});
    this._latitud.setNativeProps({
      text: '  Latitud: ' + crd.latitude
    });
    this.setState({longitud: crd.longitude});
    this._longitud.setNativeProps({
      text: '  Longitud: ' + crd.longitude
    });
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
  }

  finalizar = async () => {
    let nombreFamilia = this.state.nombreFamilia;
    let lat = this.state.latitud;
    let lng = this.state.longitud;
    try {
      await AsyncStorage.setItem('@MySuperStore:nombre', nombreFamilia);
      await AsyncStorage.setItem('@MySuperStore:lat', ''+lat);
      await AsyncStorage.setItem('@MySuperStore:lng', ''+lng);
      Alert.alert('Se guardaron los datos satisfactoriamente.');
    } catch (error) {
      console.log(error);
      Alert.alert('No fue posible guardar.');
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      latitud: '',
      longitud: '',
      nombreFamilia: '',
      ninfasD: '',
      adultosD: '',
      ninfasG: '',
      adultosG: '',
      ninfasCo: '',
      adultosCo: ''
    };
  }

  static navigationOptions = {
    header: null
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(this.success);
  }

  render() {
    return (<View>
      <View style={styles.container3}>
        <ToolbarAndroid style={{
            height: StatusBar.currentHeight,
            backgroundColor: '#00701a',
            elevation: 4
          }}/>
      </View>
      <ScrollView contentContainerStyle={{
          alignItems: 'center'
        }}>
        <Text style={{
            fontSize: 16,
            fontWeight: 'bold'
          }}>Formato Hogar</Text>
        <TextInput style={{
            fontSize: 16,
            fontWeight: 'bold'
          }} editable={false} ref={component => this._latitud = component}/>
        <TextInput style={{
            fontSize: 16,
            fontWeight: 'bold'
          }} editable={false} ref={component => this._longitud = component}/>
        <TextInput placeholder=" Nombre Familia" style={(styles.input3)} onChangeText={text => this.setState({nombreFamilia: text})}/>
        <Button title='Guardar' color='#28b424' onPress={this.finalizar}/>
      </ScrollView>
    </View>)
  }
}

class InicioScreen extends Component {

  irFormato = () => {
    this.props.navigation.navigate('Formato');
  }

  state = {
    mapRegion: {
      latitude: 4.3345763,
      longitude: -74.2991458,
      latitudeDelta: 18,
      longitudeDelta: 18
    }
  };

  static navigationOptions = {
    header: null
  }
  render() {
    return (<View style={styles.container}>
      <ToolbarAndroid style={{
          height: StatusBar.currentHeight,
          backgroundColor: '#00701a',
          elevation: 4
        }}/>
      <View style={[styles.box, styles.box2]}>
        <MapView style={{
            alignSelf: 'stretch',
            height: '100%'
          }} region={this.state.mapRegion}/>
      </View>
      <View style={[styles.box, styles.box4]}>
        <ScrollView>
          <Grid>
            <Row>
              <Card title="Vigilancia Chagas #1" style={styles.cajitas} containerStyle={{
                  width: Dimensions.get('window').width - 50
                }}>
                <Text>Formato vigilancia chagas #1</Text>
                <TouchableOpacity style={{
                    alignItems: 'center'
                  }} onPress={this.irFormato}>
                  <Text style={{
                      color: '#28b425',
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>
                    Seleccionar
                  </Text>
                </TouchableOpacity>
              </Card>
            </Row>
            <Row>
              <Card title="Vigilancia Chagas #2" style={styles.cajitas} containerStyle={{
                  width: Dimensions.get('window').width - 50
                }}>
                <Text>Formato vigilancia chagas #2</Text>
                <TouchableOpacity style={{
                    alignItems: 'center'
                  }} onPress={this.irFormato}>
                  <Text style={{
                      color: '#28b425',
                      fontWeight: 'bold',
                      fontSize: 16
                    }}>
                    Seleccionar
                  </Text>
                </TouchableOpacity>
              </Card>
            </Row>
          </Grid>
        </ScrollView>
      </View>
    </View>);
  }
}

class LoginScreen extends Component {
  static navigationOptions = {
    header: null
  }
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
  }

  inicio = () => {
    firebase.auth().signInWithEmailAndPassword(this.state.username, this.state.password).then(() => {
      Alert.alert('Login correcto.');
      this.props.navigation.navigate('Inicio');
    }).catch(function(error) {
      var errorCode = error.code;
      if (errorCode === 'auth/wrong-password') {
        Alert.alert('Error:' + errorCode);
      } else {
        Alert.alert('Error:' + errorCode);
      }
    });
  };

  componentDidMount() {}

  render() {
    return (<View style={styles.container}>
      <ToolbarAndroid style={{
          height: StatusBar.currentHeight,
          backgroundColor: '#00701a',
          elevation: 4
        }}/>
      <View style={[styles.box, styles.box2]}>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={-45}>
          <Text style={styles.titles}>BIOGITAL</Text>
          <View style={styles.inputs}>
            <TextInput placeholder=" Correo Electronico" style={(styles.inputs, styles.input1)} onChangeText={text => this.setState({username: text})}/>
            <TextInput placeholder=" Contraseña" style={(styles.inputs, styles.input2)} secureTextEntry={true} onChangeText={text => this.setState({password: text})}/>
            <TouchableOpacity onPress={this.inicio}>
              <Text>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
            <Text style={{
                marginTop: 10
              }}>¿Olvidaste tu contraseña?</Text>
          </View>
        </KeyboardAvoidingView>
      </View>
      <View style={[styles.box, styles.box3]}>
        <Text style={{
            paddingTop: 15
          }}>¿No tienes cuenta? Registrate</Text>
      </View>
    </View>);
  }
}

const Pantallas = StackNavigator({
  Login: {
    screen: LoginScreen
  },
  Inicio: {
    screen: InicioScreen
  },
  Formato: {
    screen: TabNavigator({
      Casa: {
        screen: HogarScreen,
        activeTintColor: '#e91e63'
      },
      Intra: {
        screen: IntraScreen,
        activeTintColor: '#e91e63'
      },
      Peri: {
        screen: PeriScreen,
        activeTintColor: '#e91e63'
      }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        activeTintColor: '#10f43b',
        backgroundColor: '#058222',
        style: {
          backgroundColor: '#058222'
        }
      }
    },)
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  container3: {},
  container2: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  box: {
    height: box_height
  },
  box2: {
    flex: 3.5,
    backgroundColor: '#E1E2E1',
    alignItems: 'center'
  },
  box3: {
    flex: 0.4,
    backgroundColor: '#E1E2E1',
    alignItems: 'center'
  },
  box4: {
    flex: 2,
    backgroundColor: '#E1E2E1',
    alignItems: 'center'
  },
  titles: {
    fontSize: 72,
    textAlign: 'center',
    marginTop: (box_height / 2) + 35,
    marginBottom: 5
  },
  inputs: {
    width: width,
    marginTop: box_height / 2 - 70,
    marginBottom: 30,
    alignItems: 'center'
  },
  input1: {
    backgroundColor: 'rgba(214,214,214,0.5)',
    borderWidth: 0.4,
    height: '15%',
    marginTop: box_height / 2 - 55,
    width: '80%'
  },
  input2: {
    backgroundColor: 'rgba(214,214,214,0.5)',
    borderWidth: 0.4,
    height: '15%',
    marginTop: 25,
    width: '80%',
    marginBottom: 20
  },
  input3: {
    backgroundColor: 'rgba(214,214,214,0.5)',
    width: width,
    alignItems: 'center',
    borderWidth: 0.4,
    height: 38,
    marginBottom: 5,
    marginTop: 10,
    marginLeft: 25,
    width: '80%'
  },
  cajitas: {
    alignItems: 'center',
    width: '85%',
    height: '85%'
  }
});

export default Pantallas;
