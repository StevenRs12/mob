import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/interfaces/user-interface';
import { AuthService } from 'src/app/shared/services/auth.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.sass']
})
export class EditUserComponent implements OnInit {
  name: string = ''
  password: string = ''
  user: User = {}

  constructor(private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.getIdParams()
  }

  getIdParams() {
    this.route.params.subscribe(({ id }) => {
      this.user.id = Number(id);
      this.getUser(id)
    });
  }

  getUser(id: any) {
    this.authService.getUserById(id).subscribe(data => {
      this.user.name = data[0].name;
      this.user.password = data[0].password;
    })
  }

  editUser() {
    const req = { ...this.user }
    this.authService.editUser(req).subscribe(data => {
      Swal.fire({
        icon: 'success',
        title: 'Listo',
        text: `Usuario editado ${data.name}`,
      })
    })
  }

}
