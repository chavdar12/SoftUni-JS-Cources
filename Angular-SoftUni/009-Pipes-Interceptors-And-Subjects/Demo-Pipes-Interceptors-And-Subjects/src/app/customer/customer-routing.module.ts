import {RouterModule} from "@angular/router";
import {CustomerListComponent} from "./customer-list/customer-list.component";

import {CustomerProfileAlbumsComponent} from "./customer-profile-albums/customer-profile-albums.component";
import {CustomerProfilePostsComponent} from "./customer-profile-posts/customer-profile-posts.component";
import {CustomerProfileComponent} from "./customer-profile/customer-profile.component";

//  customer/
export const CustomerRoutingModule = RouterModule.forChild([
  {
    path: '',
    pathMatch: 'full',
    component: CustomerListComponent,
  },
  {
    path: ':id',
    // canActivate: [ProfileGuard],
    // resolve: { posts: CustomerPostsResolver },

    component: CustomerProfileComponent,
    children: [
      {
        path: 'posts',
        // resolve: { posts: CustomerPostsResolver },
        component: CustomerProfilePostsComponent
      },
      {
        path: 'albums',
        component: CustomerProfileAlbumsComponent,
      }
    ]
  },

])
