import { HttpClient, HttpContext, HttpErrorResponse, HttpHeaders, HttpParams, HttpStatusCode } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Rx from 'rxjs';
import { API_BASE_TOKEN } from './data.types';

export type RequestOptions = {
	query?: Record<string, any>;
	body?: any;
	headers?: HttpHeaders;
	responseType?: 'json' | 'blob' | 'text';
};

@Injectable()
export class DataService {
	constructor(
		protected http: HttpClient,

		@Inject(API_BASE_TOKEN) public apiBase: string,
	) {
		
	}

	// --------------------------------------------------
	
	protected static errorPipe = Rx.catchError(e => {
		return Rx.throwError(e);
	});

	// --------------------------------------------------

	public request<T>(
		method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE',
		url: string,

		param: RequestOptions = {},
	) {
		const fullUrl = `${this.apiBase}${url}`;
		//	+ Http.createQueryParams(param.query);

		const options: any = {
			body: param.body,
			headers: param.headers ?? new HttpHeaders(),
			responseType: param.responseType ?? 'json',
		};

		return this.http
			.request<T>(method, fullUrl, options)
			.pipe(DataService.errorPipe) as Observable<T>;
	}

	public get<T = void>(url: string, param?: RequestOptions) {
		return this.request<T>('GET', url, param);
	}
	public post<T = void>(url: string, param?: RequestOptions) {
		return this.request<T>('POST', url, param);
	}
	public put<T = void>(url: string, param?: RequestOptions) {
		return this.request<T>('PUT', url, param);
	}
	public patch<T = void>(url: string, param?: RequestOptions) {
		return this.request<T>('PATCH', url, param);
	}
	public delete<T = void>(url: string, param?: RequestOptions) {
		return this.request<T>('DELETE', url, param);
	}
}