import {React, useEffect, useState } from 'react';
import RepoCard from './RepoCard';
import '../styles/RepoList.css';



export default function RepoList() {

    const [repos, setRepos, setError] = useState([]);

    useEffect( ( ) => {
        getRepos();
        return () => {}
    },[]);

    const getRepos = async () => {
        try{
            const gitResponse = await fetch('https://api.github.com/search/repositories?q=stars:>1&per_page=100&type=Repositories')
            const data = await gitResponse.json();
            const repos = data.items
            if (repos && repos.length > 0) {
                setRepos(repos);
                console.log("fetch success=======>", repos);
            }
        }catch(error){
            setError(repos.error);
            console.error(`fetch error: ${error}`)
        }
    };

    return (
        <div className="repoList">
            <div>
                    <header className="component-heading">Top 100 GitHub Repositories</header>
            </div>
                <br/>
            <div className="repolist-wrapper">
                    {repos.map((repo, index) => (
                        <RepoCard repo={repo} index={index} key={repo.id}/>
                    ))}
            </div>
        </div>
    );
}