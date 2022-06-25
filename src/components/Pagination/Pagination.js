import './Pagination.css';
// import React, { useEffect, useState } from 'react';
// import SpecificUSerData from '../SpecificUserData/SpecificUserData';

const Pagination = (props) => {
    // const [pages] = useState(Math.round(props.items.length / props.dataLimit));
    // const [currentPage, setCurrentPage] = useState(1);
    // const [selectedId, setSelectedId] = useState([]);
    const getPaginationGroup = () => {
        if (props.currentPage + 4 >= 5) {
            let start = Math.floor((props.currentPage - 1) / props.pageLimit) * props.pageLimit;
            return new Array(props.pageLimit).fill().map((_, idx) => start + idx + 1);
        }
        return new Array(props.pageLimit).fill().map((_, idx) => 1 + idx + 1);
    };

    return (
        <div>
            <div className='pagination'>
                {/* --------------------- First button --------------------- */}
                <button
                    onClick={props.changePage}
                    className={`prev ${props.currentPage === 1 ? 'disabled' : ''}`}
                >
                    First
                </button>
                {/* --------------------- previous button --------------------- */}
                <button

                    onClick={props.goToPreviousPage}
                    className={`prev ${props.currentPage === 1 ? 'disabled' : ''}`}
                >
                    Prev
                </button>

                {/* --------------------- show page numbers --------------------- */}
                {getPaginationGroup().map((item, index) => (
                    <button
                        key={index}
                        onClick={props.changePage}
                        className={`paginationItem ${props.currentPage === item ? 'active' : null}`}
                    >
                        <span>{item}</span>
                    </button>
                ))}

                {/* --------------------- next button --------------------- */}
                <button

                    onClick={props.goToNextPage}
                    className={`next ${props.currentPage === props.pages ? 'disabled' : ''}`}
                    data-testid='nextClick'
                >
                    Next
                </button>
                {/* --------------------- Last button --------------------- */}
                <button
                    onClick={props.changePage}
                    className={`prev ${props.currentPage === props.pages ? 'disabled' : ''}`}
                >
                    Last
                </button>
            </div>
        </div>
    );
}

export default Pagination;