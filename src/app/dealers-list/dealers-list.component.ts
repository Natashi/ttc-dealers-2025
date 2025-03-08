import { Component, computed, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { DataService } from '../data.service';
import { DealerInfo, DealerListing, DealerService } from '../dealers.service';
import { AsyncPipe } from '@angular/common';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { DealerComponent } from './dealer/dealer.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Collection } from '../../util';
import { ScrollPositionService } from '../scroll.service';

@Component({
	selector: 'app-dealers-list',
	templateUrl: './dealers-list.component.html',
	styleUrl: './dealers-list.component.scss',
	standalone: true,
	imports: [
		MatProgressSpinner,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		MatCheckboxModule,
		FormsModule,
		ReactiveFormsModule,
		DealerComponent,
	],
})
export class DealersListComponent implements OnInit, OnDestroy {
	private readonly formBuilder = inject(FormBuilder);
	
	private readonly dataService = inject(DataService);
	private readonly scrollPositionService = inject(ScrollPositionService);
	private readonly dealerService = inject(DealerService);
	
	form!: FormGroup;
	
	filters = signal({
		query: '',
		grouped: false,
	});
	dealers = computed(() => {
		const dealers = this.dealerService.dealers();
		if (dealers == null)
			return null;
		
		const filters = this.filters();
		
		const filtered = dealers.filter(
			d =>
				d.dealerName.includes(filters.query) ||
				d.dealerPos.includes(filters.query)
		);
		
		return filtered;
	});

	constructor() {
		this.form = this.formBuilder.group({
			query: [
				'',
			],
			grouped: [
				false,
			],
		});
	
		this.form.get("query")!.valueChanges
			.subscribe({
				next: (x: string) => {
					this.filters.update((f) => ({ ...f, query: x }))
				},
			});
		
		this.form.get("grouped")!.valueChanges
			.subscribe({
				next: (x: boolean) =>
					this.filters.update((f) => ({ ...f, grouped: x }))
			});
	}
	
	ngOnInit(): void {
		this.scrollPositionService.popScroll();
	}
	
	ngOnDestroy(): void {
		this.scrollPositionService.pushScroll();
	}
	
	// --------------------------------------------------
	
	createGrouped(dealers: DealerInfo[]) {
		const grouped = Collection.groupBy(dealers, d => d.dealerPos[0]);
		return Object.entries(grouped);
	}
}
