'use server'

import {saveMeal} from "@/lib/meals";
import {redirect} from "next/navigation";
import {revalidatePath, revalidateTag} from "next/cache";

function isInvalidText(text){
    return !text || text.trim() === ''
}


export  async function shareMeal(prevState, formData) {
    'use server';

    const meal ={
        title: formData.get('title'),
        summary: formData.get('summary'),
        instructions: formData.get('instructions'),
        image: formData.get('image'),
        creator: formData.get('name'),
        creator_email: formData.get('email'),
    }
    if(
        isInvalidText(meal.title) ||
        isInvalidText(meal.summary) ||
        isInvalidText(meal.instructions) ||
        isInvalidText(meal.creator_email) ||
        !meal.creator_email.includes('@') ||
        isInvalidText(meal.creator) ||
        !meal.image || meal.image.size === 0){
        return {
            message: 'Invalid Input',
        }
    }
    await saveMeal(meal)
    revalidatePath('/meals', "layout")
    redirect('/meals')
}