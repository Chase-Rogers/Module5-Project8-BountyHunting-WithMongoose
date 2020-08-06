import React, { useState, useEffect } from "react";
import axios from "axios";
import Bounty from "./components/Bounty";
import AddBounty from "./components/AddBounty";
import "./App.css";

const App = () => {
    const [bounties, setBounties] = useState([]);

    const getBounties = () => {
        axios
            .get("/bounties")
            .then((res) => setBounties(res.data))
            .catch((err) => console.log(err.response.data.err));
    };

    const addBounty = (newBounty) => {
        axios
            .post("/bounties", newBounty)
            .then((res) => {
                setBounties((prevBounties) => [...prevBounties, res.data]);
            })
            .catch((err) => console.log(err));
    };

    const handleDelete = (bountyId) => {
        axios
            .delete(`/bounties/${bountyId}`)
            .then((res) => {
                return setBounties((prevBounties) =>
                    prevBounties.filter((bounty) => bounty._id !== bountyId)
                );
            })
            .catch((err) => console.log(err));
    };

    const handleEdit = (updates, bountyId) => {
        axios
            .put(`/bounties/${bountyId}`, updates)
            .then((res) => {
                return setBounties((prevBounties) =>
                    prevBounties.map((bounty) =>
                        bounty._id !== bountyId ? bounty : res.data
                    )
                );
            })
            .catch((err) => console.log(err));
    };

    const handleFilter = (e) => {
        const value = e.target.value;
        value === "reset"
            ? getBounties()
            : axios
                  .get(`/bounties/search/faction?faction=${e.target.value}`)
                  .then((res) => setBounties(res.data))
                  .catch((err) => console.log(err));
    };

    useEffect(() => {
        getBounties();
    }, []);

    return (
        <div>
            <AddBounty submit={addBounty} btnText="Add Bounty" />
            <div className="faction">
                <h4>Filter by Faction</h4>
                <select onChange={handleFilter}>
                    <option value="reset">All Factions</option>
                    <option value="Sith">Sith</option>
                    <option value="Jedi">Jedi</option>
                </select>
            </div>

            {bounties.map((bounty) => (
                <Bounty
                    {...bounty}
                    key={bounty._id}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                />
            ))}
        </div>
    );
};

export default App;
