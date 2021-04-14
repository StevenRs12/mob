import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass']
})
export class NavbarComponent {

  constructor(private router: Router) { }

  get nameUser() {
    return sessionStorage.getItem('usuarioSesion')
  }

  logout() {
    sessionStorage.removeItem('usuarioSesion')
    this.router.navigateByUrl('/login')
  }

  editUser() {
    const idUser = sessionStorage.getItem('idUsuarioSesion')
    this.router.navigateByUrl(`/user/${idUser}`)
  }
}
