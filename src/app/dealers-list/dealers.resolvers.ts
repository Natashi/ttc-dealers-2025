import { inject } from "@angular/core";
import { ResolveFn, Router } from "@angular/router";
import { DealerService } from "../dealers.service";

export const dealersInitialize: ResolveFn<any> = (route, state) => {
	const router = inject(Router);

	const dealerService = inject(DealerService);

	return dealerService.loadDealers();
};