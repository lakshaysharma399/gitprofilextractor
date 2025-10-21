import { useEffect, useState } from "react";

function Home() {

    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({});
    const [username, setUsername] = useState("");
    const [error, setError] = useState(false);
    function addusername(e) {

        setUsername(e.target.value);

    }

    async function search() {

            setData({});


        setLoading(true);

        const res = await fetch(`https://api.github.com/users/${username}`);

        const json = await res.json();

        if (json.message === "Not Found") {

            setLoading(false)

            setError(true);

        } else {

            setLoading(false)
            setError(false)

            setData(json);


        }
    }


    return <>

        <div>
            <label htmlFor="">Username</label>
            <input type="text" onChange={addusername} />
            <button onClick={search}>Search</button>
        </div>


        <div>

            {loading &&  <p>loading...</p>}

            {error && <p>User not found</p>}
            {data && (<div>  <p>{data.name}</p> <p>{data.bio}</p> <p><img src={data.avatar_url} alt="User Avatar" width={100} /></p>  </div>)}
        </div>



    </>
}

export default Home;