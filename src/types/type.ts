
export type TypeTicket = {
		origin: string,
		origin_name: string,
		destination: string,
		destination_name: string,
		departure_date: string,
		departure_time: string,
		arrival_date: string,
		arrival_time: string,
		carrier: string,
		stops: number,
		price: number,
		priceUsd: number,
		priceEur: number,
}

export interface ITickets {
   ticket: TypeTicket
	currentTypeCurrency: string,
}
export interface IFilter {
	value: string,
	name: string,
	checked: boolean,
}

export type TLocalData = 'string'