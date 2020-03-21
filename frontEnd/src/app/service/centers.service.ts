import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentersService {

  constructor() { }


  centers: Object []  = [
    {
      name: 'CRF de Santa Cruz de Oleiros',
      address: 'Santa Cruz de Liáns, Oleiros, A Coruña',
      phone: '881 960 405,  686 597745',
      lat: 43.34355,
      lon: -8.341892
    },
    {
      name: 'CRF de Carballedo',
      address: 'Chan, s/n. Carballedo, Cotobade, Pontevedra',
      phone: '606 656 017',
      lat: 42.473155,
      lon: -8.481525
    },
    {
      name: 'CRF do Veral',
      address: 'Estrada de Friol s/n, Lugo',
      phone: '982 828 441 / 686 633 074 / 678 816 805',
      lat: 43.117037,
      lon: -7.638767
    },
    {
      name: 'CRF Alto do Rodicio',
      address: 'Alto do Rodicio, Maceda, Ourense',
      phone: '628 358 652',
      lat: 42.300231,
      lon: -7.594346
    },
    {
      name: 'CMATI - Xefatura Territorial de Lugo',
      address: 'Ronda da Muralla, 71, 27297 Lugo',
      phone: '981 900 643',
      lat: 43.015151,
      lon: -7.556153
    },
    {
      name: 'CMATI – Xefatura Territorial da Coruña',
      address: 'Rúa Vicente Ferrer, 2, 15008 A Coruña',
      phone: '981 182 289',
      lat: 43.350714,
      lon: -8.405525
    },
    {
      name: 'CMATI - Xefatura Territorial de Ourense',
      address: 'Rúa do Concello, 11, 32003 Ourense',
      phone: '988 386 660',
      lat: 42.342025,
      lon: -7.865586
    },
    {
      name: 'CMATI - Xefatura Territorial de Pontevedra',
      address: 'Av. de María Victoria Moreno, 43, 36003 Pontevedra',
      phone: '986 805 903',
      lat: 42.425326,
      lon: -8.643765
    }
  ]

}
