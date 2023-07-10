        import {React, useEffect, useState } from 'react';
        import '../styles/RepoHome.css';
        import CommitCard from './CommitCard';

        export default function  RepoHome(props) {

            const [commits, avatar, name,commitUrl, stars, htmlUrl] = useState([]);
            useEffect( ( ) => {
                getRepoData();
                return () => {}
            },[]);

        const getRepoData = async () => {
            try{
                //const{avatar, commitUrl, name, stars, htmlUrl} = this.props.location.state;
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
                            <h1>Welcome to {props.location.state.name} Repository Home</h1>

                            <div className="profile-card">
                                <div className="repository-image">
                                    <img src={props.location.state.avatar} alt={props.location.state.name} height="200" width="200"/>
                                </div>

                                <div className="profile-content">
                                    <h2>Name: {props.location.state.name}</h2>
                                    <h3>Url: {props.location.state.htmlUrl}</h3>
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