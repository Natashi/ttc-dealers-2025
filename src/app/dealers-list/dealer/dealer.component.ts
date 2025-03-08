import { Component, inject, Inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../data.service';
import { DealerInfo, DealerService } from '../../dealers.service';
import { AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { API_BASE_TOKEN } from '../../data.types';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	selector: 'app-dealer',
	templateUrl: './dealer.component.html',
	styleUrl: './dealer.component.scss',
	standalone: true,
	imports: [
		RouterLink,
		MatButtonModule,
	],
})
export class DealerComponent {
	@Input() dealer!: DealerInfo;
	
	readonly domSanitizer = inject(DomSanitizer);
	
	readonly apiBaseUrl = inject(API_BASE_TOKEN);
	
	// --------------------------------------------------
	
	get imgUrl() {
		//const url = this.apiBase + this.dealer.dealerIcon;
		const url = this.dealer.dealerIcon;
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
}
