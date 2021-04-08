import React, { useState } from "react";
import AddBounty from "./AddBounty";

const Bounty = (props) => {
    const { firstName, lastName, status, reward, faction, _id } = props;
    const [editToggle, setEditToggle] = useState(false);

    const handleToggle = (e) => {
        e.preventDefault();
        return setEditToggle((prevToggle) => !prevToggle);
    };

    return (
        <div className={faction}>
            {!editToggle ? (
                <>
                    <h1>Name: {firstName} {lastName} </h1>
                    <h3>Alive: {status} </h3>
                    <h3>Reward: {reward} Credits</h3>
                    <h3>Faction: {faction} </h3>
                    <button onClick={() => props.handleDelete(_id)}>
                        Delete
                    </button>
                    <button onClick={handleToggle}>Edit</button>
                </>
            ) : (
                <>
                    <AddBounty
                        firstName={firstName}
                        lastName={lastName}
                        status={status}
                        reward={reward}
                        faction={faction}
                        _id={_id}
                        btnText="Submit Edit"
                        handleToggle={handleToggle}
                        submit={props.handleEdit}
                    />
                    <button onClick={handleToggle}>Close</button>
                </>
            )}
        </div>
    );
};

export default Bounty;
