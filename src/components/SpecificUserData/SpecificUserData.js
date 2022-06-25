// import './SpecificUSerData.css';
import { AiOutlineDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { AiFillCheckCircle } from "react-icons/ai";

// import style from './SpecificUserData.module.css';
import './SpecificUserData.css';
import React, { useState, useRef } from 'react';
import { toBeEmpty } from "@testing-library/jest-dom/dist/matchers";

function SpecificUserData(props) {

    const [isEdit, setIsEdit] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isChecked, setIsChecked] = useState([]);

    const nameRef = useRef();
    const emailRef = useRef();
    const roleRef = useRef();

    const deleteUser = () => {
        props.deleteSpecificUser(props.id);
    }
    const checkBox = () => {
        if (props.id in isChecked) {
            const val = isChecked?.filter((item) =>
                item !== props.id
            );
            setIsChecked([...val]);
        } else {
            setIsChecked([...isChecked, props.id]);
        }
        props.insertCheckedId(props.id);
        // setIsChecked();
        // console.log(isChecked);

    }

    const handleKeyPress = (event) => {
        // console.log(event);
        if (event.key === 'Enter' || event === 'save') {
            // console.log(nameRef.current.value);
            // console.log(emailRef.current.value);
            // console.log(roleRef.current.value);

            if (nameRef.current.value.length !== 0 && emailRef.current.value.length !== 0 && roleRef.current.value.length !== 0) {
                props.onEdit([props.id, nameRef.current.value, emailRef.current.value, roleRef.current.value]);
                setIsEdit(false);
                setIsSaved(true);
            } else {
                alert(`Field Can't be empty.`);
            }

        }


    }

    const onEdit = () => {
        setIsEdit(true);
        setIsSaved(false);
    }
    // console.log(isEdit);

    return (
        <React.Fragment>
            <tbody className='tableBody'>

                <tr>
                    <td><input
                        id={props.id}
                        type='checkbox'
                        onClick={checkBox} />
                    </td>
                    <td><input
                        type='text'
                        defaultValue={props.name}
                        className={`input ${isEdit && !isSaved ? 'postInputStyle' : 'preInputStyle'}`}
                        disabled={`${isEdit && !isSaved ? '' : 'disabled'}`}
                        ref={nameRef}
                        onKeyPress={(e) => handleKeyPress(e)}
                        data-testid={`nameInput${props.id}`} />
                    </td>
                    <td><input
                        type='text'
                        defaultValue={props.email}
                        className={`input ${isEdit && !isSaved ? 'postInputStyle' : 'preInputStyle'}`}
                        disabled={`${isEdit && !isSaved ? '' : 'disabled'}`}
                        ref={emailRef}
                        onKeyPress={(e) => handleKeyPress(e)}
                        data-testid='emailInput' />
                    </td>
                    <td><input
                        type='text'
                        defaultValue={props.role}
                        className={`input ${isEdit && !isSaved ? 'postInputStyle' : 'preInputStyle'}`}
                        disabled={`${isEdit && !isSaved ? '' : 'disabled'}`}
                        ref={roleRef}
                        onKeyPress={(e) => handleKeyPress(e)}
                        data-testid='roleInput' />
                    </td>
                    <td>
                        {isEdit ?
                            <AiFillCheckCircle
                                className="saveBtn"
                                onClick={(e) => handleKeyPress('save')}
                            ></AiFillCheckCircle> :
                            <div>
                                <AiOutlineDelete
                                    className="deleteBtn"
                                    onClick={deleteUser}
                                    data-testid={`deleteButton${props.id}`} />
                                <BiEdit
                                    className="editBtn"
                                    onClick={onEdit} />
                            </div>
                        }
                    </td>
                    {/* <td><BiEdit
                    onClick={onEdit} />
                </td> */}
                </tr>
            </tbody>
        </React.Fragment>
    );
}

export default SpecificUserData;