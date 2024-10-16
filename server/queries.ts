"use server"

import { client } from "@/lib/prisma";
import { validateRequest } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function addTweet({
    username,
    handle,
    tweetContent,
    isVerified,
    userImage,
  }: {
    username: string;
    handle: string;
    tweetContent: string;
    isVerified: boolean;
    userImage: string;
  }) {
    const { user } = await validateRequest();
  
    if (!user) {
      console.error("Unauthorized");
    } else {
      // Create the TweetReview and return it to access its ID
      const newTweet = await client.tweetReview.create({
        data: {
          profile: userImage,
          username: username,
          handle: handle,
          tweetContent: tweetContent,
          verified: isVerified,
          userId: user?.id,
          id: JSON.stringify(Math.floor(Math.random() * 100000)),
          createdAt: new Date(),
        },
      });
  
      return newTweet; // Return the created TweetReview object
    }
  }
  


export async function getUserImages({
    mediaFiles,
    tweetId,
  }: {
    mediaFiles: string[];
    tweetId: string;
  }) {
    const { user } = await validateRequest();
  
    if (!user) {
      console.error("Unauthorized");
      return;
    }
  
    
    await Promise.all(
      mediaFiles.map(async (mediaFile) => {
        await client.images.create({
          data: {
            userId: user.id,
            id: JSON.stringify(Math.floor(Math.random() * 100000)),
            image: mediaFile,
            tweetName: tweetId, 
          },
        });
      })
    );
  
    redirect("/dashboard/reviews");
  }
  

export async function getReviews(userId : string | undefined){
    const { user } = await validateRequest();
    if(!user){
        console.error("Unauthoerized");

    }else{
       const tweetsText =  await client.tweetReview.findMany({
            where : {
                userId : userId
            }
        })
        const tweetMedia = await client.images.findMany({
            where : {
                userId : userId
            }
        })

        return {
            tweetMedia,
            tweetsText
        }
    }
}