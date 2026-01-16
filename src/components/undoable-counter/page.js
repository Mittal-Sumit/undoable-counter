"use client";

import { useState } from "react";

const UndoableCounter = () => {
  const [number, setNumber] = useState(0);
  const [history, setHistory] = useState([]);
  const [redoList, setRedoList] = useState([]);
  const [undoCount, setUndoCount] = useState(0);

  const arr1 = [-100, -10, -1];
  const arr2 = [100, 10, 1];

  const maintainHistory = (key, prev, curr) => {
    const obj = {
      action: key,
      prev,
      curr,
    };

    const copyHistory = [...history];
    copyHistory.unshift(obj);
    setHistory(copyHistory);
  };

  const handleClick = (key) => {
    const val = parseInt(key);
    const newValue = val + number;
    maintainHistory(key, number, newValue);
    setNumber(newValue);
  };

  const handleUndo = () => {
    if (history.length) {
      if (undoCount > 5) {
        alert("You can't undo");
        return;
      }
      const copyHist = [...history];
      const firstItem = copyHist.shift();
      setHistory(copyHist);

      setNumber(firstItem.prev);

      const copyRedoList = [...redoList];
      copyRedoList.push(firstItem);
      setRedoList(copyRedoList);
      if (undoCount >= 0) {
        setUndoCount(undoCount + 1);
      }
    }
  };

  const handleRedo = () => {
    if (redoList.length) {
      const copyRedoList = [...redoList];
      const poppedValue = copyRedoList.pop();
      setRedoList(copyRedoList);
      const { action, prev, curr } = poppedValue;
      setNumber(curr);
      maintainHistory(action, prev, curr);
      if (undoCount > 0) {
        setUndoCount(undoCount - 1);
      }
    }
  };

  return (
    <div className=" text-center">
      <div className=" text-8xl">Undoable Counter</div>
      <div>
        <button
          onClick={handleUndo}
          className="px-2 py-1 border-r border-gray-400 bg-gray-400 hover:bg-gray-100 cursor-pointer m-1"
        >
          Undo
        </button>
        <button
          onClick={handleRedo}
          className="px-2 py-1 border-r border-gray-400 bg-gray-400 hover:bg-gray-100 cursor-pointer m-1"
        >
          Redo
        </button>
      </div>

      <div className=" flex justify-center text-center">
        <div>
          {arr1.map((btn) => {
            return (
              <button
                onClick={() => handleClick(btn)}
                className="border-r border-gray-400 bg-gray-400 hover:bg-gray-100 cursor-pointer m-1 w-25 h-10"
                key={btn}
              >
                {btn}
              </button>
            );
          })}
        </div>
        <div className="text-center">{number}</div>
        <div>
          {arr2.map((btn) => {
            return (
              <button
                onClick={() => handleClick(btn)}
                className="border-r border-gray-400 bg-gray-400 hover:bg-gray-100 cursor-pointer m-1 w-25 h-10"
                key={btn}
              >
                {btn}
              </button>
            );
          })}
        </div>
      </div>
      <div className=" w-75 h-75 m-25 border border-black text-center">
        History
        <div>
          {history.map((item, index) => {
            return (
              <div className=" flex justify-between " key={index}>
                <div className=" ml-4">{item.action}</div>
                <div className=" mr-4">{`${item.prev} -> ${item.curr}`}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UndoableCounter;
