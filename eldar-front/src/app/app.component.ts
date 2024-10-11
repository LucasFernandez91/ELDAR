import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { NavbarComponent } from "./pages/navbar/navbar.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ButtonModule, NavbarComponent,ToastModule],
  providers: [MessageService],
  templateUrl:'./app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit   {
  title = 'eldar-front';
  constructor(private router: Router) {}

  ngOnInit() {
    window.history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', () => {
      window.history.pushState(null, '', window.location.href);
    });
  }


}
