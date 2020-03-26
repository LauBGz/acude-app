import { Component, OnInit } from '@angular/core';
import {CentersService} from '../service/centers.service'


@Component({
  selector: 'app-assistance',
  templateUrl: './assistance.component.html',
  styleUrls: ['./assistance.component.css']
})
export class AssistanceComponent implements OnInit {

  constructor(public _centersService: CentersService) { }

  ngOnInit(): void {
  }

    asistanceCenters: any = this._centersService.centers;
    closestCenter: Object;

    geolocalizar(){

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.getUserPosition);
        } else { 
            alert("Geolocation is not supported by this browser.");
        }
   
    }

    getUserPosition = (position) => {
        let userLat = 42.596250;
        let userLon = -7.180810;
           
        let minDif = 99999;
        let closest;
        let index;
        let showAddress = false;
           
        for (index = 0; index < this.asistanceCenters.length; index++ ) {
            let dif = PythagorasEquirectangular(userLat, userLon, this.asistanceCenters[index]["lat"], this.asistanceCenters[index]["lon"]);
            if (dif < minDif) {
                closest = index;
                minDif = dif;
            }
        }

        this.closestCenter = this.asistanceCenters[closest];

        console.log(this.closestCenter) 

        function Deg2Rad(deg) {
            return deg * Math.PI / 180;
        }

        function PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
            lat1 = Deg2Rad(lat1);
            lat2 = Deg2Rad(lat2);
            lon1 = Deg2Rad(lon1);
            lon2 = Deg2Rad(lon2);
            let R = 6371; // km
            let x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
            let y = (lat2 - lat1);
            let d = Math.sqrt(x * x + y * y) * R;
            return d;
        }
       
    }

}
