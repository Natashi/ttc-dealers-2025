import { HttpClient } from "@angular/common/http";
import { computed, inject, Inject, Injectable, signal } from "@angular/core";
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { DataService } from "./data.service";

export type DealerLang = 'th' | 'en' | 'zh' | 'vn';

export interface DealerInfo {
	dealerID: number;
	dealerPos: string;
	dealerName: string;
	dealerDetail: {
		[lang in DealerLang]: string;
	};
	isLove: boolean;
	loveCount: number;
	dealerIcon: string;
	dealerMenu: string;
}

export interface DealerListing {
	currentYear: number;
	dealerList: DealerInfo[];
}

@Injectable()
export class DealerService {
	private readonly dataService = inject(DataService);
	
	// --------------------------------------------------
	
	private _dealers = signal<DealerInfo[] | null>(null);
	
	readonly dealers = computed(() => this._dealers());
	
	// --------------------------------------------------
	
	loadDealers() {
		return this.dataService.get<DealerListing>("/public/v1/dealer")
			.pipe(
				Rx.map(x => x.dealerList),
				Rx.tap({
					next: x => {
						this._dealers.set(x);
						//console.log(x);
					},
					error: e => {
						console.error(e);
					}
				}),
			);
	}
	
	getImage$(url: string) {
		const option = {
			responseType: 'blob' as const,
		};

		return this.dataService.get<Blob>(url, option);
	}
}