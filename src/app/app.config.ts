import { ApplicationConfig, provideAppInitializer, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';

import { appRoutes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { DataService } from './data.service';
import { DealerService } from './dealers.service';
import { API_BASE_TOKEN } from './data.types';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection({ eventCoalescing: true }),
		
		provideAnimations(),
		provideHttpClient(),
		provideRouter(
			appRoutes,
			withInMemoryScrolling({ scrollPositionRestoration: 'enabled' }),
			withComponentInputBinding(),
		),
		
		provideAppInitializer(() => {
			
		}),
		
		DataService,
		DealerService,
		
		{
			provide: API_BASE_TOKEN,
			useValue: "https://ttc.events.prod.uwu.co.th"
		},
	]
};
