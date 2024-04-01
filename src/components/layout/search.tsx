'use client'
import { useState } from "react";

const Search = () => {
    const [search, setSearch] = useState('');

    return (
        <div className="w-full">
            <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>
    );
}

export default Search;