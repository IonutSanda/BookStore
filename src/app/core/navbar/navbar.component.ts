import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/feature-models/auth/services/auth.service';
import { WishlistService } from 'src/app/feature-models/books/services/popover-services/services/wishlist.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isActivatedAccountMenu = false;
  isAuthenticated = false;

  constructor(private wishlistSerivce: WishlistService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  toggleAccountMenu(){
    this.isActivatedAccountMenu = !this.isActivatedAccountMenu;
  }

  onLogout(){
    this.wishlistSerivce.clearWishlist();
    this.authService.logout();
  }

}
