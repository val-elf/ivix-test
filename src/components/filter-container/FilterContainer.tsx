import React from "react";
import './FilterContainer.css';

interface IFilterContainerProps {
    display?: boolean;
}

export const FilterContainer = (props: IFilterContainerProps) => {
    const { display } = props;
    return <div className={`filter-container ${display ? 'visible' : ''}`}></div>;
};