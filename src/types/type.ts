export interface ITickets {
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
	price: number ,
}
export interface IFilter {
	value: any,
	name: string,
	checked: boolean,
}

export type TLocalData = 'string'