import { AfterViewInit, Component, computed, effect, inject, Inject, input, Input, model, OnInit, Signal, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTabChangeEvent, MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';
import { API_BASE_TOKEN } from '../data.types';
import { DealerInfo, DealerService } from '../dealers.service';

const TAB_STORAGE = 'dealer-view-lang-tab';

@Component({
	selector: 'app-dealer-view',
	templateUrl: './dealer-view.component.html',
	styleUrl: './dealer-view.component.scss',
	standalone: true,
	imports: [
		RouterLink,
		MatButtonModule,
		MatTabsModule,
	],
})
export class DealerViewComponent implements OnInit {
	dealerId = input<number>(0);
	
	readonly domSanitizer = inject(DomSanitizer);
	
	readonly apiBaseUrl = inject(API_BASE_TOKEN);
	readonly dealerService = inject(DealerService);
	
	readonly dealer = computed(() => {
		const dealers = this.dealerService.dealers()!;
		return dealers.find(x => x.dealerID == this.dealerId())!;
	});
	
	tabIndex = model(0);
	
	constructor() {
		effect(() => {
			console.log(this.dealerId());
			console.log(this.dealer());
		});
		
		effect(() => {
			localStorage.setItem(TAB_STORAGE, this.tabIndex().toString());
		});
	}
	
	ngOnInit(): void {
		const tabLang = localStorage.getItem(TAB_STORAGE);
		const tabIndex = Number(tabLang);
		this.tabIndex.set(isNaN(tabIndex) ? 0 : tabIndex);
	}
	
	// --------------------------------------------------
	
	get imgUrl() {
		const url = this.dealer().dealerMenu;
		return this.domSanitizer.bypassSecurityTrustResourceUrl(url);
	}
	
	get tabs() {
		const tabs = this.dealer().dealerDetail;
		
		return [
			{
				label: "English",
				text: tabs.en,
			},
			{
				label: "Thai",
				text: tabs.th,
			},
			{
				label: "Chinese",
				text: tabs.zh,
			},
			{
				label: "Vietnamese",
				text: tabs.vn,
			},
		];
	}
}
