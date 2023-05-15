"use client";

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'; 

import Profile from '@components/Profile';

const MyProfile = ({ params }) => {

    const searchParams = useSearchParams();
    const username = searchParams.get('name');
    const [allPosts, setAllPosts] = useState([]);

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();
        setAllPosts(data);
      };
    
    useEffect(() => {
        if (params?.id) fetchPosts();
    }, [params?.id]);

    return (
        <Profile 
            name={`${username}'s`}
            desc={`Welcome to ${username}'s personalized profile page!`}
            data={allPosts}
        />
    )
}

export default MyProfile