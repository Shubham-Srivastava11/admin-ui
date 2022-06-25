import SpecificUserData from '../SpecificUserData/SpecificUserData';
import React, { useState } from 'react';
// import style from './UserData.module.css';
import './UserData.css';
// import { AiFillCaretLeft, AiFillCaretRight, AiFillFastBackward, AiFillFastForward } from "react-icons/ai";
import Pagination from '../Pagination/Pagination';


function UserData(props) {

    const [pages] = useState(Math.round(props.items.length / props.dataLimit));
    // const [fixedPagesCount] = useState(Math.round(props.items.length / props.dataLimit));
    // setFixedPagesCount(Math.round(props.items.length / props.dataLimit));
    // console.log(fixedPagesCount);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedId, setSelectedId] = useState([]);

    const insertIdData = (id) => {

        if (id in selectedId) {
            const val = selectedId.filter((item) =>
                item !== id
            );
            setSelectedId(val);
        } else {
            setSelectedId([...selectedId, id]);
        }
        // console.log(selectedId);


    }

    const onEditHandler = (edited) => {
        props.editedData(edited);
    }

    const onDeleteSelected = () => {
        props.selectedDeleteHandler(selectedId);
    }

    const goToNextPage = () => {
        setCurrentPage((page) => page >= Math.round(props.items.length / props.dataLimit) ? page : page + 1);
    }

    const goToPreviousPage = () => {

        setCurrentPage((page) => page >= 1 ? page - 1 : page = 1);
    }

    const changePage = (event) => {
        if (event.target.textContent === 'First') {
            const pageNumber = 1;
            setCurrentPage(pageNumber);
        } else if (event.target.textContent === 'Last') {
            const pageNumber = Math.round(props.items.length / props.dataLimit);
            setCurrentPage(pageNumber);
        } else {

            const pageNumber = Number(event.target.textContent);
            setCurrentPage(pageNumber);
        }
    }

    const getPaginatedData = () => {
        const startIndex = currentPage * props.dataLimit - props.dataLimit;
        const endIndex = startIndex + props.dataLimit;
        return props.items.slice(startIndex, endIndex);
    };



    const selectAll = () => {
        var val = [];

        const res = getPaginatedData();
        for (let data of res) {

            val = [...val, data.id];
            document.getElementById(data.id).click();
        }
        setSelectedId([...val]);

    }

    return (
        <React.Fragment>
            <table>
                <thead>
                    <tr>
                        <th><input
                            type='checkbox'
                            onClick={selectAll}
                            data-testid='selectAll' /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Actions</th>
                        {/* <th></th> */}

                    </tr>
                </thead>
                {getPaginatedData().map((user) => (
                    <SpecificUserData
                        key={user.id}
                        id={user.id}
                        name={user.name}
                        email={user.email}
                        role={user.role}
                        deleteSpecificUser={props.ondeleteHandler}
                        insertCheckedId={insertIdData}
                        onEdit={onEditHandler}
                    />

                ))}

            </table>
            <button
                className='deleteButton'
                onClick={onDeleteSelected}
                data-testid='deleteAllBtn'
            // disabled={selectedId.length === 0}
            >
                Delete Selected

            </button>

            <Pagination
                changePage={changePage}
                goToPreviousPage={goToPreviousPage}
                goToNextPage={goToNextPage}
                pages={pages}
                currentPage={currentPage}
                pageLimit={props.pageLimit}
            />

        </React.Fragment>
    );
}

export default UserData;