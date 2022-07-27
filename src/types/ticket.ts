interface IFetchTickets {
  tickets: Ticket[];
  stop: boolean;
}

interface Ticket {
  // Цена в рублях
  price: number;
  // Код авиакомпании (data)
  carrier: string;
  // Массив перелётов.
  // В тестовом задании это всегда поиск "туда-обратно" значит состоит из двух элементов
  segments: [
    {
      // Код города (data)
      origin: string;
      // Код города (data)
      destination: string;
      // Дата и время вылета туда
      date: string;
      // Массив кодов (data) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    },
    {
      // Код города (data)
      origin: string;
      // Код города (data)
      destination: string;
      // Дата и время вылета обратно
      date: string;
      // Массив кодов (data) городов с пересадками
      stops: string[];
      // Общее время перелёта в минутах
      duration: number;
    }
  ];
}

type SearchIdType = { searchId: string };

interface ITicketSliceState {
  searchId: string;
  tickets: Ticket[];
  sortTickets: Ticket[];
  stop: boolean;
  ticketError: boolean;
}

interface IFilterSliceState {
  checkboxFilter: boolean[];
  sort: "самый дешевый" | "самый быстрый" | "оптимальный";
}

export type {
  IFetchTickets,
  Ticket,
  ITicketSliceState,
  SearchIdType,
  IFilterSliceState,
};
