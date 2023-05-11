import React, { memo } from "react";
import SvgX from "../assets/x.svg";
import Check from "../assets/check.svg";

const BtnToggleCompleted = ({ taskCompleted, checkFunc  }) => {

    return (
        <button
            title={taskCompleted ? "completed" : "uncompleted"}
            className={`${taskCompleted
                    ? "bg-emerald-200 text-emerald-800 "
                    : "bg-amber-200 text-amber-800 "
                }"mr-4 order-0" rounded-full font-medium`}
            onClick={checkFunc}
        >
            <span className="block py-1 px-3 absolute invisible sm:static sm:visible">
                {taskCompleted ? "completed" : "uncompleted"}
            </span>
            <span className=" sm:hidden w-6 h-6 grid place-items-center">
                {taskCompleted ? (
                    <img src={Check} className="w-3 h-3" />
                ) : (
                    <img src={SvgX} className="w-3 h-3" />
                )}
            </span>
        </button>
    );
};

export default memo(BtnToggleCompleted);