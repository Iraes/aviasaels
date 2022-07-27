import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectSort, setSortType } from "../../../redux/slices/filterSlice";

import s from "./MyTabs.module.scss";

const MyTabs: FC<{ itemName: Array<string> }> = ({ itemName }) => {
  const selectedSort = useSelector(selectSort);
  const dispatch = useDispatch();
  const onClickSortItem: (item: string) => void = (sortType) => {
    dispatch(setSortType(sortType));
  };

  return (
    <ul className={s.list}>
      {itemName.map((item, index) => {
        return (
          <li
            key={item}
            className={`${s.item} ${item === selectedSort && s["item-active"]}`}
            onClick={() => onClickSortItem(item)}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

export default MyTabs;
