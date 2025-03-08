import { HttpClient } from "@angular/common/http";
import { computed, inject, Inject, Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class ScrollPositionService {
	private _pos: number[] = [];
	
	// --------------------------------------------------
	
	pushScroll() {
		this._pos.push(window.scrollY);
	}
	
	popScroll() {
		const scrollTo = this._pos.pop();
		if (scrollTo == null)
			return;
		
		setTimeout(() => window.scrollTo(0, scrollTo), 0);
	}
}