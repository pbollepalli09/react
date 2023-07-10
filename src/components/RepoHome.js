        import {React, useEffect, useState } from 'react';
        import '../styles/RepoHome.css';
        import CommitCard from './CommitCard';

        export default function  RepoHome(props) {

            const [commits] = useState([]);
            const {avatar, commitUrl, name, stars, htmlUrl} = props.location.state;
            useEffect( ( ) => {
                getRepoData();
                return () => {}
            },[]);

        const getRepoData = async () => {
            try{
                let date = new Date().getTime();
                let oneDay = 24*3600*1000;
                let yest =  date-oneDay;
                let yesterday = new Date(yest).toISOString();
                let url = `${commitUrl}?since=${yesterday}`;
                const gitResponse = await fetch(url)
                const commits = await gitResponse.data;
                console.log("commits repoHome success=======>", commits);
                /*if (commits && commits.length > 0){
                    setCommits(commits)
                    console.log("commits repoHome success=======>", commits);
                }*/
            }catch(error){
                //setError(repos.error);
                console.error(`fetch error: ${error}`)
            }
        };

        return(
            <div className="repository-home">
                <div>
                    <h1>Welcome to "{name}" repository home</h1>
                    <div className="profile-card">
                        <div className="repository-image">
                            <img src={avatar} alt={name} height="200" width="200"/>
                        </div>

                        <div className="profile-content">
                            <h2>Name: {name}</h2>
                            <h3>Url: {htmlUrl}</h3>
                            <h3>Stars: {stars}</h3>
                        </div>

                    </div>

                    <div className="commitlist-wrapper">
                        {commits.map((commit, index) =>
                            <CommitCard commit={commit} index={index} key={commit.sha} />,
                        )}
                    </div>
                </div>
            </div>
        )
        }