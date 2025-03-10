import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { dealersInitialize } from './dealers-list/dealers.resolvers';

export const appRoutes: Routes = [
	{
		path: '',
		component: LayoutComponent,
		
		resolve: [
			dealersInitialize,	
		],
		
		children: [
			{
				path: 'dealers',
				loadComponent: () => import('./dealers-list/dealers-list.component')
					.then(m => m.DealersListComponent)
			},
			
			{
				path: 'dealers/:dealerId',
				loadComponent: () => import('./dealer-view/dealer-view.component')
					.then(m => m.DealerViewComponent)
			},
			
			{
				path: '**', redirectTo: '/dealers', pathMatch: 'full'
			},
		],
	},
	
	{
		path: '**', redirectTo: '/dealers', pathMatch: 'full'
	},
];
