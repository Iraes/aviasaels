import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";

import logo from "../assets/logo.svg";
import { Filter, MyTabs, Card } from "../index";
import {
  fetchSearchId,
  fetchTickets,
  setFilterTickets,
  setSortTickets,
} from "../../redux/slices/ticketSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { Ticket } from "../../types/ticket";
import { selectCheckbox, selectSort } from "../../redux/slices/filterSlice";
import MyLoader from "../UI/MyLoader";

import s from "./App.module.scss";

const filterList: Array<string> = [
  "Все",
  "Без пересадок",
  "1 пересадка",
  "2 пересадки",
  "3 пересадки",
];

const tabsList: Array<string> = ["самый дешевый", "самый быстрый"];
// "оптимальный",
function App() {
  const dispatch = useAppDispatch();
  const ticketsState = useSelector((state: RootState) => state.ticket);
  const checked = useSelector(selectCheckbox);
  const sort = useSelector(selectSort);
  const isFirstLoad = useRef(true);
  const isLoading = useRef(true);
  const getSearchId = useCallback(() => {
    dispatch(fetchSearchId());
  }, []);

  useEffect(() => {
    getSearchId();
  }, []);

  useEffect(() => {
    if (
      (!ticketsState.stop || !ticketsState.ticketError) &&
      !isFirstLoad.current
    ) {
      dispatch(fetchTickets(ticketsState.searchId));
    }

    isLoading.current = !(ticketsState.stop && ticketsState.ticketError);

    if (ticketsState.searchId && isFirstLoad.current) {
      dispatch(fetchTickets(ticketsState.searchId));
      dispatch(setSortTickets(checked));
      isFirstLoad.current = false;
    }
    dispatch(setFilterTickets(checked));
    dispatch(setSortTickets(sort));
  }, [
    ticketsState.searchId,
    ticketsState.stop,
    ticketsState.ticketError,
    checked,
    sort,
  ]);

  const sortedTicketList = ticketsState.sortTickets
    .map((ticket: Ticket, index: number) => {
      return (
        <Card
          ticket={ticket}
          key={`${ticket.price}${ticket.carrier}${ticket.segments[0].duration}${index}`}
        />
      );
    })
    .slice(0, 5);

  return (
    <div className={s.App}>
      <img src={logo} alt="Логотип компании" className={s.logo} />
      <Filter title="количество пересадок" itemName={filterList} />
      <div className={s["info__wrapper"]}>
        <MyTabs itemName={tabsList} />
        {isLoading.current && <MyLoader />}
        <>
          {ticketsState.sortTickets.length
            ? sortedTicketList
            : "Рейсов, подходящих под заданные фильтры, не найдено"}
        </>
      </div>
    </div>
  );
}

export default App;
