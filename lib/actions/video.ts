"use server";

import { headers } from "next/headers";
import { apiFetch, getEnv, withErrorHandling } from "../utils";
import { auth } from "../auth";
import { BUNNY } from "@/constants";
import prisma from "../prisma";
import { revalidatePath } from "next/cache";


const VIDEO_STREAM_BASE_URL = BUNNY.STREAM_BASE_URL;
const THUMBNAIL_STORAGE_BASE_URL = BUNNY.STORAGE_BASE_URL;
const THUMBNAIL_CDN_URL = BUNNY.CDN_URL;
const BUNNY_LIB_ID = getEnv("BUNNY_LIB_ID");

const accessKeys = {

    "BUNNY_STREAM_ACCESS_KEY": getEnv("BUNNY_STREAM_ACCESS_KEY"),
    "BUNNY_STORAGE_ACCESS_KEY":getEnv("BUNNY_STORAGE_ACCESS_KEY")
}


const revalidatePaths = (paths:string[])=>{
    paths.forEach((path)=>revalidatePath(path));
}
const getSessionUserId = async (): Promise<string> => {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Unauthenticated");

  return session.user.id;
};

export const getVideoUploadUrl = withErrorHandling(async () => {

    await getSessionUserId();

    const videoResponse = await apiFetch<BunnyVideoResponse>(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIB_ID}/videos`,
        {
            method:'POST',
            bunnyType:'stream',
            body:{  title:'temp title',collectionId:''}
            
        }
    )

    console.log(videoResponse)

    const uploadUrl = `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIB_ID}/videos/${videoResponse.guid}`;
    console.log(uploadUrl);

    return {
        uploadUrl,
        videoId:videoResponse.guid,
        accessKey:accessKeys.BUNNY_STREAM_ACCESS_KEY
    }
});

export const getThumbnailUploadUrl = withErrorHandling(async(videoId:string)=>{

    const fileName = `${Date.now()}-${videoId}-thumbnail`;
    const uploadUrl = `${THUMBNAIL_STORAGE_BASE_URL}/thumbnails/${fileName}`;
    const cdnUrl = `${THUMBNAIL_CDN_URL}/thumbnails/${fileName}`;

    return {
        uploadUrl,
        cdnUrl,
        accessKey : accessKeys.BUNNY_STORAGE_ACCESS_KEY
    }
})

export const saveVideoDetails = withErrorHandling(async(videoDetails:VideoDetails)=>{

    const userId = await getSessionUserId();

    await apiFetch(
        `${VIDEO_STREAM_BASE_URL}/${BUNNY_LIB_ID}/videoes/${videoDetails.videoId}`,
        {
            method:'POST',
            bunnyType:'stream',
            body:{
                title:videoDetails.title,
                description:videoDetails.description
            }
        }
    )

    await prisma.video.create({
        data:{
            ...videoDetails,
            videoUrl:`${BUNNY.EMBED_URL}/${BUNNY_LIB_ID}/${videoDetails.videoId}`,
            userId,
            createdAt:new Date(),
            updatedAt:new Date()
        }
    })

    revalidatePaths(["/"])
    
    return {
        videoId:videoDetails.videoId
    };
})