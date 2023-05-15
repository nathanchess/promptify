"use client";

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/Profile';

const MyProfile = () => {

    const { data:session } = useSession();
    const [allPosts, setAllPosts] = useState([]);
    const router = useRouter();

    const handleEdit = (post) => {
      console.log('edit called')
      router.push(`/update-prompt?id=${post._id}`)
    }

    const handleDelete = async (post) => {
      console.log('deleted called')
      const hasConfirmed = confirm(
        "Are you sure you want to delete this prompt?"
      );
      if (hasConfirmed) {
        try {
          await fetch(`/api/prompt/${post._id.toString()}`, {
            method: "DELETE",
          });
          const filteredPosts = allPosts.filter((item) => item._id !== post._id);
          setAllPosts(filteredPosts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    const fetchPosts = async () => {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();
        setAllPosts(data);
      };
    
      useEffect(() => {
        if (session?.user.id) fetchPosts();
      }, []);

    return (
        <Profile 
            name={"My"}
            desc="Welcome to your personalized profile page!"
            data={allPosts}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
        />
    )
}

export default MyProfile