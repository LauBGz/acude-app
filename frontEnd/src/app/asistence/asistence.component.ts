import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-asistence',
  templateUrl: './asistence.component.html',
  styleUrls: ['./asistence.component.css']
})
export class AsistenceComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


//   geolocalizar(objeto){
//     //Función para obtener las coordenadas de la posición del usuario
//     function userLocation(position) {
//         nearestStation(position.coords.latitude, position.coords.longitude);
//         }

//     //Funciones matemáticas 
//     function Deg2Rad(deg) {
//         return deg * Math.PI / 180;
//     }

//     function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
//         lat1 = Deg2Rad(lat1);
//         lat2 = Deg2Rad(lat2);
//         lon1 = Deg2Rad(lon1);
//         lon2 = Deg2Rad(lon2);
//         let R = 6371; // km
//         let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
//         let y = (lat2 - lat1);
//         let d = Math.sqrt(x * x + y * y) * R;
//         return d;
//     }

//     //Si el navegador lo soporta que obtenga la posición del usuario
//     if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(userLocation);
//     } else {
//         alert("Geolocation is not supported by this browser.");
//     }

//     //Función para obtener la dirección más cercana según la latitud/longitud
//     function nearestStation(latitude, longitude) {
//         let minDif = 99999;
//         let closest;
        
//         for (this.index = 0; this.index < objeto.data.stations.length; ++this.index) {
//             let dif = PythagorasEquirectangular(latitude, longitude, objeto.data.stations[index]["lat"], objeto.data.stations[index]["lon"]);
//             if (dif < minDif) {
//                 closest = this.index;
//                 minDif = dif;
//             }
//         }
//     }   

//   }

}
