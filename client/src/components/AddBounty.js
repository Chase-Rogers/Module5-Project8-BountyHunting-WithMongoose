import React, { useState } from 'react';

const AddBounty = (props) => {
    const initInputs = {
        firstName: props.firstName || '',
        lastName: props.lastName || '',
        status: props.status || '',
        reward: props.reward || '',
        faction: props.faction || '',
    };

    const [inputs, setInputs] = useState(initInputs);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs((prevInputs) => {
            return { ...prevInputs, [name]: value };
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (props._id) {
            props.handleToggle(e);
        }
        props.submit(inputs, props._id);
        setInputs(initInputs);
    };

    return (
        <form
            className="form"
            onSubmit={(e) => {
                e.preventDefault();
                return handleSubmit(e);
            }}
        >
            <input
                type="text"
                name="firstName"
                value={inputs.firstName}
                onChange={handleChange}
                placeholder="First Name"
            />
            <input
                type="text"
                name="lastName"
                value={inputs.lastName}
                onChange={handleChange}
                placeholder="Last Name"
            />
            <select value={inputs.status} name="status" onChange={handleChange}>
                <option value="Status">- Set Status -</option>
                <option value="Dead">Dead</option>
                <option value="Alive">Alive</option>
            </select>
            <input
                type="number"
                name="reward"
                value={inputs.reward}
                onChange={handleChange}
                placeholder="Reward"
            />
            <select
                value={inputs.faction}
                name="faction"
                onChange={handleChange}
            >
                <option value="Faction">- Select a Faction -</option>
                <option value="Empire">Empire</option>
                <option value="Republic">Republic</option>
            </select>
            <button>{props.btnText}</button>
        </form>
    );
};

export default AddBounty;
